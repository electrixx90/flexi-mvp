import { isValidIotaAddress, normalizeIotaAddress } from "@iota/iota-sdk/utils";
import { z } from "zod";

import { ApiError } from "../errors.js";
import { SUPPORTED_ACTION_TYPE } from "./constants.js";

const moveArgumentSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("object"),
    value: z.string().trim().min(1, "Object argument value is required."),
  }),
  z.object({
    kind: z.literal("pure"),
    valueType: z.string().trim().min(1, "Pure argument valueType is required."),
    value: z.any(),
  }),
]);

const sponsorTransactionRequestSchema = z.object({
  userAddress: z
    .string({ required_error: "userAddress is required." })
    .trim()
    .min(1, "userAddress is required."),
  actionType: z
    .string({ required_error: "actionType is required." })
    .trim()
    .min(1, "actionType is required."),
  payload: z
    .object({
      arguments: z.array(moveArgumentSchema).default([]),
    })
    .default({ arguments: [] }),
});

export function parseSponsorTransactionRequest(input) {
  const normalizedInput = {
    userAddress: input?.userAddress,
    actionType: input?.actionType,
    payload: input?.payload ?? input?.actionPayload ?? input?.parameters ?? {},
  };

  const result = sponsorTransactionRequestSchema.safeParse(normalizedInput);
  if (!result.success) {
    throw new ApiError(400, formatZodError(result.error), result.error.flatten());
  }

  const userAddress = normalizeIotaAddress(result.data.userAddress);
  if (!isValidIotaAddress(userAddress)) {
    throw new ApiError(400, "userAddress must be a valid IOTA address.");
  }

  if (result.data.actionType !== SUPPORTED_ACTION_TYPE) {
    throw new ApiError(
      400,
      `Unsupported actionType "${result.data.actionType}". Supported actionType: ${SUPPORTED_ACTION_TYPE}.`,
    );
  }

  return {
    userAddress,
    actionType: result.data.actionType,
    payload: result.data.payload,
  };
}

function formatZodError(error) {
  return error.issues.map((issue) => issue.message).join(" ");
}
