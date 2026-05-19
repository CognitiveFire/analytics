const ALLOWED_OPERATION_KEYS = [
  "adGroupCriterionOperation",
  "campaignBudgetOperation",
  "campaignOperation",
  "campaignCriterionOperation",
] as const;

type AllowedOperationKey = (typeof ALLOWED_OPERATION_KEYS)[number];

function getPresentOperationKeys(operation: Record<string, unknown>): AllowedOperationKey[] {
  return ALLOWED_OPERATION_KEYS.filter((key) => key in operation);
}

export function validateGoogleAdsMutatePayload(payload: Record<string, unknown>) {
  const operations = payload.mutateOperations;
  if (!Array.isArray(operations) || operations.length === 0) {
    throw new Error("Invalid mutate payload: mutateOperations must be a non-empty array.");
  }

  operations.forEach((operation, index) => {
    if (typeof operation !== "object" || operation === null) {
      throw new Error(`Invalid mutate operation at index ${index}: must be object.`);
    }

    const opRecord = operation as Record<string, unknown>;
    const keys = getPresentOperationKeys(opRecord);
    if (keys.length !== 1) {
      throw new Error(`Invalid mutate operation at index ${index}: expected exactly one operation type key.`);
    }

    const opValue = opRecord[keys[0]];
    if (typeof opValue !== "object" || opValue === null) {
      throw new Error(`Invalid mutate operation at index ${index}: operation payload must be object.`);
    }
  });
}
