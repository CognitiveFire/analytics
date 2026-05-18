"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, CircleDashed, ShieldCheck, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";
import { connectorWizardSources, connectorWizardSteps, ConnectorWizardSource, googleAdsWizardAccounts, googleAnalyticsWizardAccounts } from "@/lib/connectors/wizard";
import { usePlatformStore } from "@/hooks/use-platform-store";
import { DataSource } from "@/types";

type SourceKey = ConnectorWizardSource["source"];

interface WizardStateItem {
  enabled: boolean;
  accessMode?: string;
  accessDetail: string;
  selectedAccounts: string[];
}

type WizardState = Record<SourceKey, WizardStateItem>;

const sourceToRouteLabel: Record<SourceKey, string> = connectorWizardSources.reduce((acc, source) => {
  acc[source.source] = source.label;
  return acc;
}, {} as Record<SourceKey, string>);

const DEFAULT_STORAGE_PREFIX = "signal-room:connector-wizard";

interface PersistedWizardState {
  step: number;
  completed: boolean;
  state: WizardState;
}

function getStorageKey(clientId: string) {
  return `${DEFAULT_STORAGE_PREFIX}:${clientId}`;
}

function createInitialState() {
  return connectorWizardSources.reduce<WizardState>((acc, source) => {
    acc[source.source] = {
      enabled: false,
      accessMode: source.accessModes[0],
      accessDetail: "",
      selectedAccounts: [],
    };

    return acc;
  }, {} as WizardState);
}

function safeLoad(clientId: string): PersistedWizardState | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(getStorageKey(clientId));
    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as PersistedWizardState;
  } catch {
    return null;
  }
}

function formatKey(source: DataSource | "screamingFrog") {
  return source === "screamingFrog" ? "SEO / Screaming Frog" : sourceToRouteLabel[source];
}

export function ConnectorWizard() {
  const clientId = usePlatformStore((store) => store.clientId);
  const [step, setStep] = useState(0);
  const [state, setState] = useState<WizardState>(() => createInitialState());
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const saved = safeLoad(clientId);
    if (!saved) {
      setStep(0);
      setCompleted(false);
      setState(createInitialState());
      return;
    }

    setStep(saved.step);
    setCompleted(saved.completed);
    setState(saved.state);
  }, [clientId]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const payload: PersistedWizardState = {
      step,
      completed,
      state,
    };

    window.localStorage.setItem(getStorageKey(clientId), JSON.stringify(payload));
  }, [clientId, completed, state, step]);

  const selectedSources = useMemo(
    () => connectorWizardSources.filter((source) => state[source.source].enabled),
    [state]
  );

  const enabledCount = selectedSources.length;

  const toggleSource = (source: SourceKey) => {
    setState((current) => ({
      ...current,
      [source]: {
        ...current[source],
        enabled: !current[source].enabled,
      },
    }));
  };

  const setAccessMode = (source: SourceKey, accessMode: string) => {
    setState((current) => ({
      ...current,
      [source]: {
        ...current[source],
        accessMode,
      },
    }));
  };

  const setAccessDetail = (source: SourceKey, accessDetail: string) => {
    setState((current) => ({
      ...current,
      [source]: {
        ...current[source],
        accessDetail,
      },
    }));
  };

  const toggleGoogleAdsAccount = (customerId: string) => {
    setState((current) => {
      const sourceState = current.googleAds;
      const selectedAccounts = sourceState.selectedAccounts.includes(customerId)
        ? sourceState.selectedAccounts.filter((accountId) => accountId !== customerId)
        : [...sourceState.selectedAccounts, customerId];

      return {
        ...current,
        googleAds: {
          ...sourceState,
          enabled: selectedAccounts.length > 0,
          selectedAccounts,
          accessDetail: selectedAccounts.join(", "),
        },
      };
    });
  };

  const toggleGoogleAnalyticsProperty = (propertyId: string) => {
    setState((current) => {
      const sourceState = current.ga4;
      const selectedAccounts = sourceState.selectedAccounts.includes(propertyId)
        ? sourceState.selectedAccounts.filter((id) => id !== propertyId)
        : [...sourceState.selectedAccounts, propertyId];

      return {
        ...current,
        ga4: {
          ...sourceState,
          enabled: selectedAccounts.length > 0,
          selectedAccounts,
          accessDetail: selectedAccounts.join(", "),
        },
      };
    });
  };

  const canContinue =
    step === 0
      ? enabledCount > 0
      : step === 1
        ? selectedSources.every((source) =>
            source.source === "googleAds" || source.source === "ga4"
              ? state[source.source].selectedAccounts.length > 0
              : state[source.source].accessDetail.trim().length > 0
          )
        : true;

  const nextStep = () => setStep((current) => Math.min(current + 1, connectorWizardSteps.length - 1));
  const previousStep = () => setStep((current) => Math.max(current - 1, 0));
  const finishWizard = () => setCompleted(true);

  return (
    <div className="space-y-6">
      <Card className="border-zinc-200/80 bg-white/95 dark:border-zinc-800 dark:bg-zinc-900/90">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Connector wizard</p>
            <CardTitle className="mt-2 text-3xl">Guide each account through the sources it actually has</CardTitle>
            <CardDescription className="mt-3 max-w-3xl">
              Not every client has every platform. This wizard lets you choose the exact sources available for the account,
              then configures only those connectors.
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="neutral">{enabledCount} selected</Badge>
            <Badge variant={enabledCount > 0 ? "success" : "warning"}>{connectorWizardSteps[step].title}</Badge>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <Card className="h-fit">
          <CardTitle className="text-lg">Setup flow</CardTitle>
          <div className="mt-4 space-y-3">
            {connectorWizardSteps.map((item, index) => {
              const active = index === step;
              const complete = index < step;

              return (
                <div
                  className={cn(
                    "rounded-2xl border px-4 py-3 transition-colors",
                    active
                      ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                      : complete
                        ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900/60 dark:bg-emerald-950/20"
                        : "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/40"
                  )}
                  key={item.title}
                >
                  <p className="text-xs uppercase tracking-[0.2em] opacity-70">Step {index + 1}</p>
                  <p className="mt-1 font-medium">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed opacity-80">{item.description}</p>
                </div>
              );
            })}
          </div>
        </Card>

        <div className="space-y-4">
          {step === 0 ? (
            <Card>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-xl">1. Select accessible sources</CardTitle>
                  <CardDescription className="mt-2">Choose the data sources available for this client. Google Ads can be set to specific manager/client accounts only.</CardDescription>
                </div>
                <Sparkles className="h-5 w-5 text-zinc-400" />
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {connectorWizardSources.map((source) => {
                  const enabled = state[source.source].enabled;
                  return (
                    <button
                      className={cn(
                        "group rounded-[1.5rem] border p-4 text-left transition-all duration-300 hover:-translate-y-0.5",
                        enabled
                          ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                          : "border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/60"
                      )}
                      key={source.source}
                      onClick={() => toggleSource(source.source)}
                      type="button"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium">{formatKey(source.source)}</p>
                          <p className={cn("mt-2 text-sm leading-relaxed", enabled ? "text-white/80" : "text-zinc-500 dark:text-zinc-400")}>
                            {source.description}
                          </p>
                        </div>
                        {enabled ? <Check className="h-5 w-5" /> : <CircleDashed className="h-5 w-5 text-zinc-400" />}
                      </div>
                      <p className={cn("mt-4 text-xs uppercase tracking-[0.18em]", enabled ? "text-white/70" : "text-zinc-500")}>Access modes: {source.accessModes.join(" / ")}</p>
                    </button>
                  );
                })}
              </div>
            </Card>
          ) : null}

          {step === 1 ? (
            <Card>
              <CardTitle className="text-xl">2. Configure access details</CardTitle>
              <CardDescription className="mt-2">
                Each selected source can have different auth methods and different identifiers.
              </CardDescription>

              <div className="mt-5 space-y-4">
                {selectedSources.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-zinc-300 p-6 text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                    Select at least one source in step 1 to configure access.
                  </div>
                ) : null}

                {selectedSources.map((source) => {
                  const current = state[source.source];
                  return (
                    <div className="rounded-[1.5rem] border border-zinc-200 p-5 dark:border-zinc-800" key={source.source}>
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="font-medium text-zinc-900 dark:text-zinc-100">{formatKey(source.source)}</p>
                          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{source.helperText}</p>
                        </div>
                        <Badge variant="neutral">{source.accessModes.join(" / ")}</Badge>
                      </div>

                      {source.source === "googleAds" ? (
                        <div className="mt-4 space-y-4">
                          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
                            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Manager accounts</p>
                            <div className="mt-3 space-y-3">
                              {googleAdsWizardAccounts.managers.map((account) => {
                                const selected = current.selectedAccounts.includes(account.customerId);
                                return (
                                  <button
                                    className={cn(
                                      "w-full rounded-2xl border px-4 py-3 text-left transition-all",
                                      selected
                                        ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                                        : "border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950"
                                    )}
                                    key={`${account.customerId}-${account.label}`}
                                    onClick={() => toggleGoogleAdsAccount(account.customerId)}
                                    type="button"
                                  >
                                    <div className="flex items-start justify-between gap-3">
                                      <div>
                                        <p className="font-medium">{account.label}</p>
                                        <p className={cn("mt-1 text-sm", selected ? "text-white/75" : "text-zinc-500 dark:text-zinc-400")}>
                                          {account.customerId} · {account.accessNotes}
                                        </p>
                                      </div>
                                      {selected ? <Check className="h-5 w-5" /> : <CircleDashed className="h-5 w-5 text-zinc-400" />}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
                            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Client accounts</p>
                            <div className="mt-3 space-y-3">
                              {googleAdsWizardAccounts.clients.map((account) => {
                                const selected = current.selectedAccounts.includes(account.customerId);
                                return (
                                  <button
                                    className={cn(
                                      "w-full rounded-2xl border px-4 py-3 text-left transition-all",
                                      selected
                                        ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                                        : "border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950"
                                    )}
                                    key={`${account.customerId}-${account.label}`}
                                    onClick={() => toggleGoogleAdsAccount(account.customerId)}
                                    type="button"
                                  >
                                    <div className="flex items-start justify-between gap-3">
                                      <div>
                                        <p className="font-medium">{account.label}</p>
                                        <p className={cn("mt-1 text-sm", selected ? "text-white/75" : "text-zinc-500 dark:text-zinc-400")}>
                                          {account.customerId}
                                          {account.managerId ? ` · manager ${account.managerId}` : ""} · {account.accessNotes}
                                        </p>
                                      </div>
                                      {selected ? <Check className="h-5 w-5" /> : <CircleDashed className="h-5 w-5 text-zinc-400" />}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {source.source === "ga4" ? (
                        <div className="mt-4 space-y-4">
                          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
                            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">GA4 properties</p>
                            <div className="mt-3 space-y-3">
                              {googleAnalyticsWizardAccounts.map((account) => {
                                const selected = current.selectedAccounts.includes(account.propertyId);
                                return (
                                  <button
                                    className={cn(
                                      "w-full rounded-2xl border px-4 py-3 text-left transition-all",
                                      selected
                                        ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                                        : "border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950"
                                    )}
                                    key={account.propertyId}
                                    onClick={() => toggleGoogleAnalyticsProperty(account.propertyId)}
                                    type="button"
                                  >
                                    <div className="flex items-start justify-between gap-3">
                                      <div>
                                        <p className="font-medium">{account.label}</p>
                                        <p className={cn("mt-1 text-sm", selected ? "text-white/75" : "text-zinc-500 dark:text-zinc-400")}>
                                          {account.propertyId} · {account.accessNotes}
                                        </p>
                                      </div>
                                      {selected ? <Check className="h-5 w-5" /> : <CircleDashed className="h-5 w-5 text-zinc-400" />}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      ) : null}

                      <div className="mt-4 grid gap-3 md:grid-cols-2">
                        <label className="space-y-2 text-sm">
                          <span className="text-zinc-500 dark:text-zinc-400">Access mode</span>
                          <select
                            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-950"
                            onChange={(event) => setAccessMode(source.source, event.target.value)}
                            value={current.accessMode}
                          >
                            {source.accessModes.map((mode) => (
                              <option key={mode} value={mode}>
                                {mode}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className="space-y-2 text-sm">
                          <span className="text-zinc-500 dark:text-zinc-400">Access detail</span>
                          <input
                            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-950"
                            onChange={(event) => setAccessDetail(source.source, event.target.value)}
                            placeholder={source.requiredFields.join(", ")}
                            value={current.accessDetail}
                          />
                        </label>
                      </div>

                      {source.source === "googleAds" || source.source === "ga4" ? (
                        <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
                          Selected accounts: {current.selectedAccounts.length > 0 ? current.selectedAccounts.join(", ") : "none"}
                        </p>
                      ) : null}

                      <div className="mt-4 flex flex-wrap gap-2">
                        {source.requiredFields.map((field) => (
                          <Badge key={field} variant="neutral">
                            {field}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          ) : null}

          {step === 2 ? (
            <Card>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-xl">3. Review and activate</CardTitle>
                  <CardDescription className="mt-2">Only the selected connectors will be activated for this account.</CardDescription>
                </div>
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
              </div>

              <div className="mt-5 grid gap-4 xl:grid-cols-[1fr_320px]">
                <div className="space-y-3">
                  {selectedSources.map((source) => (
                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-800/50" key={source.source}>
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-medium text-zinc-900 dark:text-zinc-100">{formatKey(source.source)}</p>
                          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                            {state[source.source].accessMode} · {state[source.source].accessDetail}
                          </p>
                        </div>
                        <Badge variant="success">Included</Badge>
                      </div>
                    </div>
                  ))}

                  {selectedSources.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-zinc-300 px-4 py-6 text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                      No sources selected yet.
                    </div>
                  ) : null}
                </div>

                <div className="rounded-[1.5rem] border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-800/40">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Activation summary</p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight">{enabledCount} connectors</p>
                  <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                    Accounts can be partial. Signal Room only activates the sources selected in this wizard.
                  </p>
                </div>
              </div>
            </Card>
          ) : null}

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1.5rem] border border-zinc-200 bg-white/80 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900/70">
            <Button disabled={step === 0 || completed} onClick={previousStep} type="button" variant="outline">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <div className="text-sm text-zinc-500 dark:text-zinc-400">
              Step {step + 1} of {connectorWizardSteps.length}
            </div>

            <Button
              disabled={!canContinue || completed}
              onClick={step === connectorWizardSteps.length - 1 ? finishWizard : nextStep}
              type="button"
            >
              {step === connectorWizardSteps.length - 1 ? (completed ? "Setup activated" : "Activate connectors") : "Continue"}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {completed ? (
            <Card className="border-emerald-200 bg-emerald-50/70 dark:border-emerald-900/70 dark:bg-emerald-950/30">
              <div className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 text-emerald-600" />
                <div>
                  <CardTitle className="text-lg text-emerald-950 dark:text-emerald-100">Connectors activated</CardTitle>
                  <CardDescription className="mt-2 text-emerald-800 dark:text-emerald-200">
                    Signal Room has saved the selected connector set. Accounts without a given source remain excluded,
                    so each client can carry only the integrations it actually has access to.
                  </CardDescription>
                </div>
              </div>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}
