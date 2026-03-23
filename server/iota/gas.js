import { IOTA_TYPE_ARG } from "@iota/iota-sdk/utils";

import { ApiError } from "../errors.js";

export async function selectSponsorGasPayment({
  client,
  sponsorAddress,
  excludeObjectIds = [],
  minTotalBalance = 0n,
  maxCoins,
}) {
  const availableCoins = await fetchSponsorGasCoins({
    client,
    sponsorAddress,
    excludeObjectIds,
  });

  if (!availableCoins.length) {
    throw new ApiError(503, "Sponsor wallet has no usable gas objects.");
  }

  const selectedCoins = [];
  let totalBalance = 0n;
  const balanceTarget = minTotalBalance > 0n ? minTotalBalance : null;

  for (const coin of availableCoins) {
    selectedCoins.push(coin);
    totalBalance += BigInt(coin.balance);

    if (!balanceTarget) {
      break;
    }

    if (totalBalance >= balanceTarget) {
      break;
    }

    if (selectedCoins.length >= maxCoins) {
      break;
    }
  }

  if (balanceTarget && totalBalance < balanceTarget) {
    throw new ApiError(
      503,
      `Sponsor wallet does not have enough gas balance. Needed at least ${balanceTarget.toString()}, found ${totalBalance.toString()}.`,
    );
  }

  return {
    totalBalance,
    selectedCoins,
    gasObjects: selectedCoins.map((coin) => ({
      objectId: coin.coinObjectId,
      version: coin.version,
      digest: coin.digest,
    })),
  };
}

async function fetchSponsorGasCoins({ client, sponsorAddress, excludeObjectIds }) {
  const excluded = new Set(excludeObjectIds);
  const collectedCoins = [];
  let cursor = null;

  do {
    const page = await client.getCoins({
      owner: sponsorAddress,
      coinType: IOTA_TYPE_ARG,
      cursor,
    });

    collectedCoins.push(...page.data);
    cursor = page.nextCursor;

    if (!page.hasNextPage) {
      break;
    }
  } while (cursor);

  return collectedCoins
    .filter((coin) => !excluded.has(coin.coinObjectId))
    .filter((coin) => BigInt(coin.balance) > 0n)
    .sort((left, right) =>
      BigInt(right.balance) > BigInt(left.balance) ? 1 : -1,
    );
}
