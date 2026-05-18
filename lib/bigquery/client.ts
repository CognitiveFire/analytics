import "server-only";

import { BigQuery } from "@google-cloud/bigquery";

import { getRuntimeEnv } from "@/lib/config/env";

let instance: BigQuery | null = null;

export function getBigQueryClient(): BigQuery {
  if (instance) {
    return instance;
  }

  const env = getRuntimeEnv();

  instance = new BigQuery({
    projectId: env.bigQueryProjectId ?? undefined,
    location: env.bigQueryLocation,
    credentials:
      env.bigQueryClientEmail && env.bigQueryPrivateKey
        ? {
            client_email: env.bigQueryClientEmail,
            private_key: env.bigQueryPrivateKey,
          }
        : undefined,
  });

  return instance;
}
