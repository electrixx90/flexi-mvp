import { Transaction } from "@iota/iota-sdk/transactions";
import { isValidIotaAddress, normalizeIotaAddress } from "@iota/iota-sdk/utils";

import { ApiError } from "../errors.js";
import { SUPPORTED_ACTION_TYPE } from "./constants.js";

export function buildActionTransaction({ actionType, payload, config }) {
  if (actionType !== SUPPORTED_ACTION_TYPE) {
    throw new ApiError(400, `Unsupported actionType "${actionType}".`);
  }

  const tx = new Transaction();
  buildConfiguredMoveCall({ tx, payload, config });
  return tx;
}

export function collectReferencedObjectIds(payload) {
  return (payload?.arguments ?? [])
    .filter((argument) => argument.kind === "object")
    .map((argument, index) =>
      normalizeAddress(argument.value, `payload.arguments[${index}].value`),
    );
}

function buildConfiguredMoveCall({ tx, payload, config }) {
  const argumentsForMoveCall = (payload.arguments ?? []).map((argument, index) =>
    serializeMoveArgument(tx, argument, index),
  );

  tx.moveCall({
    target: config.actionTarget,
    typeArguments: config.actionTypeArguments,
    arguments: argumentsForMoveCall,
  });
}

function serializeMoveArgument(tx, argument, index) {
  if (argument.kind === "object") {
    return tx.object(
      normalizeAddress(argument.value, `payload.arguments[${index}].value`),
    );
  }

  return tx.pure(
    argument.valueType,
    coercePureValue(argument.valueType, argument.value, index),
  );
}

function coercePureValue(valueType, value, index) {
  const vectorType = unwrapGeneric(valueType, "vector");
  if (vectorType) {
    if (!Array.isArray(value)) {
      throw new ApiError(
        400,
        `payload.arguments[${index}] must provide an array for ${valueType}.`,
      );
    }

    return value.map((entry) => coercePureValue(vectorType, entry, index));
  }

  const optionType = unwrapGeneric(valueType, "option");
  if (optionType) {
    if (value == null) {
      return null;
    }

    return coercePureValue(optionType, value, index);
  }

  switch (valueType) {
    case "u8":
    case "u16":
    case "u32":
    case "u64":
    case "u128":
    case "u256":
      if (
        typeof value === "number" ||
        typeof value === "string" ||
        typeof value === "bigint"
      ) {
        return value;
      }

      throw new ApiError(
        400,
        `payload.arguments[${index}] must provide a numeric value for ${valueType}.`,
      );
    case "bool":
      if (typeof value === "boolean") {
        return value;
      }

      if (value === "true" || value === "false") {
        return value === "true";
      }

      throw new ApiError(
        400,
        `payload.arguments[${index}] must provide true or false for bool.`,
      );
    case "string":
      if (typeof value !== "string") {
        throw new ApiError(
          400,
          `payload.arguments[${index}] must provide a string for string.`,
        );
      }

      return value;
    case "address":
    case "id":
      if (typeof value !== "string") {
        throw new ApiError(
          400,
          `payload.arguments[${index}] must provide a string for ${valueType}.`,
        );
      }

      return normalizeAddress(value, `payload.arguments[${index}]`);
    default:
      throw new ApiError(
        400,
        `Unsupported pure valueType "${valueType}" at payload.arguments[${index}].`,
      );
  }
}

function unwrapGeneric(valueType, genericName) {
  const prefix = `${genericName}<`;
  if (!valueType.startsWith(prefix) || !valueType.endsWith(">")) {
    return null;
  }

  return valueType.slice(prefix.length, -1).trim();
}

function normalizeAddress(value, fieldName) {
  try {
    const normalizedAddress = normalizeIotaAddress(value);
    if (!isValidIotaAddress(normalizedAddress)) {
      throw new Error("invalid address");
    }

    return normalizedAddress;
  } catch {
    throw new ApiError(400, `${fieldName} must be a valid IOTA address or object ID.`);
  }
}
