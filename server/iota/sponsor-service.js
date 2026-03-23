import { toBase64 } from "@iota/iota-sdk/utils";
import { Transaction } from "@iota/iota-sdk/transactions";

import { buildActionTransaction, collectReferencedObjectIds } from "./action-builders.js";
import { createIotaSponsorDependencies } from "./config.js";
import { selectSponsorGasPayment } from "./gas.js";

export function createSponsorTransactionService({
  client,
  sponsorKeypair,
  config,
}) {
  return {
    async sponsorTransaction({ userAddress, actionType, payload }) {
      const transactionKindBytes = await buildTransactionKind({
        client,
        actionType,
        payload,
        config,
      });

      const excludedObjectIds = collectReferencedObjectIds(payload);
      let gasSelection = await selectSponsorGasPayment({
        client,
        sponsorAddress: config.sponsorAddress,
        excludeObjectIds,
        minTotalBalance: config.minTotalGasBalance,
        maxCoins: config.maxGasCoins,
      });

      let sponsoredTransaction = await prepareSponsoredTransaction({
        client,
        transactionKindBytes,
        sender: userAddress,
        sponsorAddress: config.sponsorAddress,
        gasPayment: gasSelection.gasObjects,
      });

      const resolvedGasBudget = BigInt(
        sponsoredTransaction.transaction.getData().gasData.budget ?? 0,
      );

      if (resolvedGasBudget > gasSelection.totalBalance) {
        gasSelection = await selectSponsorGasPayment({
          client,
          sponsorAddress: config.sponsorAddress,
          excludeObjectIds,
          minTotalBalance: resolvedGasBudget,
          maxCoins: config.maxGasCoins,
        });

        sponsoredTransaction = await prepareSponsoredTransaction({
          client,
          transactionKindBytes,
          sender: userAddress,
          sponsorAddress: config.sponsorAddress,
          gasPayment: gasSelection.gasObjects,
        });
      }

      const sponsorSignedTransaction = await signSponsoredTransaction({
        sponsorKeypair,
        transactionBytes: sponsoredTransaction.bytes,
      });

      const gasData = sponsoredTransaction.transaction.getData().gasData;

      return {
        ok: true,
        actionType,
        sender: userAddress,
        gasOwner: config.sponsorAddress,
        rpcUrl: config.rpcUrl,
        network: config.network,
        target: config.actionTarget,
        typeArguments: config.actionTypeArguments,
        transactionKindBytes: toBase64(transactionKindBytes),
        sponsoredTransactionBytes: sponsorSignedTransaction.bytes,
        sponsorSignature: sponsorSignedTransaction.signature,
        digest: await sponsoredTransaction.transaction.getDigest({ client }),
        gasBudget: gasData.budget,
        gasPrice: gasData.price,
        gasPayment: gasSelection.selectedCoins.map((coin) => ({
          objectId: coin.coinObjectId,
          version: coin.version,
          digest: coin.digest,
          balance: coin.balance,
        })),
      };
    },
  };
}

export function createSponsorTransactionServiceFromEnv(env = process.env) {
  return createSponsorTransactionService(createIotaSponsorDependencies(env));
}

export async function buildTransactionKind({
  client,
  actionType,
  payload,
  config,
}) {
  const transaction = buildActionTransaction({ actionType, payload, config });
  return transaction.build({ client, onlyTransactionKind: true });
}

export async function prepareSponsoredTransaction({
  client,
  transactionKindBytes,
  sender,
  sponsorAddress,
  gasPayment,
}) {
  const transaction = Transaction.fromKind(transactionKindBytes);
  transaction.setSender(sender);
  transaction.setGasOwner(sponsorAddress);
  transaction.setGasPayment(gasPayment);

  return {
    transaction,
    bytes: await transaction.build({ client }),
  };
}

export function signSponsoredTransaction({ sponsorKeypair, transactionBytes }) {
  return sponsorKeypair.signTransaction(transactionBytes);
}
