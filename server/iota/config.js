import { IotaClient } from "@iota/iota-sdk/client";
import { Ed25519Keypair } from "@iota/iota-sdk/keypairs/ed25519";
import { normalizeIotaAddress } from "@iota/iota-sdk/utils";

import { ApiError } from "../errors.js";
import { DEFAULT_MAX_GAS_COINS, SUPPORTED_ACTION_TYPE } from "./constants.js";

export function createIotaSponsorDependencies(env = process.env) {
  const config = loadIotaSponsorConfig(env);
  const sponsorKeypair = loadSponsorKeypair(env);
  const derivedSponsorAddress = sponsorKeypair.toIotaAddress();

  if (
    config.sponsorAddress &&
    normalizeIotaAddress(config.sponsorAddress) !== derivedSponsorAddress
  ) {
    throw new ApiError(
      500,
      `IOTA_SPONSOR_ADDRESS does not match the configured sponsor secret. Derived address: ${derivedSponsorAddress}`,
    );
  }

  return {
    client: new IotaClient({ url: config.rpcUrl }),
    sponsorKeypair,
    config: {
      ...config,
      sponsorAddress: derivedSponsorAddress,
    },
  };
}

export function loadIotaSponsorConfig(env = process.env) {
  const rpcUrl = readRequiredEnv(env, "IOTA_RPC_URL");
  const actionTarget = resolveActionTarget(env);

  return {
    rpcUrl,
    network: env.IOTA_NETWORK?.trim() || "custom",
    sponsorAddress: env.IOTA_SPONSOR_ADDRESS?.trim() || null,
    actionType: SUPPORTED_ACTION_TYPE,
    actionTarget,
    actionTypeArguments: parseStringList(env.IOTA_SPONSORED_ACTION_TYPE_ARGUMENTS),
    maxGasCoins: parsePositiveIntegerEnv(
      env.IOTA_SPONSOR_MAX_GAS_COINS,
      "IOTA_SPONSOR_MAX_GAS_COINS",
      DEFAULT_MAX_GAS_COINS,
    ),
    minTotalGasBalance: parseBigIntEnv(
      env.IOTA_SPONSOR_MIN_TOTAL_GAS_BALANCE,
      "IOTA_SPONSOR_MIN_TOTAL_GAS_BALANCE",
      0n,
    ),
  };
}

function loadSponsorKeypair(env) {
  const secret =
    env.IOTA_SPONSOR_SECRET_KEY?.trim() || env.IOTA_SPONSOR_PRIVATE_KEY?.trim();
  const mnemonic = env.IOTA_SPONSOR_MNEMONIC?.trim();
  const derivationPath = env.IOTA_SPONSOR_DERIVATION_PATH?.trim();

  if (secret) {
    if (secret.startsWith("iotaprivkey")) {
      return Ed25519Keypair.fromSecretKey(secret);
    }

    return Ed25519Keypair.fromSecretKey(parseRawSecretKey(secret));
  }

  if (mnemonic) {
    return Ed25519Keypair.deriveKeypair(mnemonic, derivationPath);
  }

  throw new ApiError(
    500,
    "Missing sponsor credentials. Set IOTA_SPONSOR_SECRET_KEY, IOTA_SPONSOR_PRIVATE_KEY, or IOTA_SPONSOR_MNEMONIC.",
  );
}

function parseRawSecretKey(secret) {
  const normalizedSecret = secret.startsWith("0x") ? secret.slice(2) : secret;

  if (!/^[0-9a-fA-F]{64}$/.test(normalizedSecret)) {
    throw new ApiError(
      500,
      "IOTA_SPONSOR_PRIVATE_KEY must be a 32-byte hex string or an iotaprivkey bech32 secret.",
    );
  }

  return Uint8Array.from(Buffer.from(normalizedSecret, "hex"));
}

function resolveActionTarget(env) {
  const explicitTarget = env.IOTA_SPONSORED_ACTION_TARGET?.trim();
  if (explicitTarget) {
    return normalizeMoveTarget(explicitTarget);
  }

  const packageId = env.IOTA_PACKAGE_ID?.trim();
  const moduleName = env.IOTA_MODULE_NAME?.trim();
  const functionName = env.IOTA_FUNCTION_NAME?.trim();

  if (packageId && moduleName && functionName) {
    return normalizeMoveTarget(
      `${normalizeIotaAddress(packageId)}::${moduleName}::${functionName}`,
    );
  }

  throw new ApiError(
    500,
    "Missing configured sponsored action target. Set IOTA_SPONSORED_ACTION_TARGET or IOTA_PACKAGE_ID, IOTA_MODULE_NAME, and IOTA_FUNCTION_NAME.",
  );
}

function normalizeMoveTarget(target) {
  const parts = target.split("::");
  if (parts.length !== 3) {
    throw new ApiError(
      500,
      `Invalid Move target "${target}". Expected 0xPACKAGE::module::function.`,
    );
  }

  const [packageId, moduleName, functionName] = parts;

  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(moduleName)) {
    throw new ApiError(500, `Invalid Move module name "${moduleName}".`);
  }

  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(functionName)) {
    throw new ApiError(500, `Invalid Move function name "${functionName}".`);
  }

  return `${normalizeIotaAddress(packageId)}::${moduleName}::${functionName}`;
}

function parseStringList(value) {
  if (!value?.trim()) {
    return [];
  }

  const trimmedValue = value.trim();
  if (trimmedValue.startsWith("[")) {
    try {
      const parsed = JSON.parse(trimmedValue);
      if (!Array.isArray(parsed) || parsed.some((item) => typeof item !== "string")) {
        throw new Error("Expected an array of strings.");
      }

      return parsed.map((item) => item.trim()).filter(Boolean);
    } catch (error) {
      throw new ApiError(
        500,
        `IOTA_SPONSORED_ACTION_TYPE_ARGUMENTS is not valid JSON: ${error.message}`,
      );
    }
  }

  return trimmedValue
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parsePositiveIntegerEnv(value, envName, defaultValue) {
  if (!value?.trim()) {
    return defaultValue;
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new ApiError(500, `${envName} must be a positive integer.`);
  }

  return parsed;
}

function parseBigIntEnv(value, envName, defaultValue) {
  if (!value?.trim()) {
    return defaultValue;
  }

  try {
    const parsed = BigInt(value);
    if (parsed < 0n) {
      throw new Error("must not be negative");
    }

    return parsed;
  } catch {
    throw new ApiError(500, `${envName} must be a non-negative integer string.`);
  }
}

function readRequiredEnv(env, key) {
  const value = env[key]?.trim();
  if (!value) {
    throw new ApiError(500, `Missing required environment variable ${key}.`);
  }

  return value;
}
