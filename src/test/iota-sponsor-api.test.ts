/**
 * @vitest-environment node
 */

import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import { ApiError } from "../../server/errors.js";
import { createApp } from "../../server/app.js";
import { SUPPORTED_ACTION_TYPE } from "../../server/iota/constants.js";

describe("POST /api/iota/sponsor-transaction", () => {
  let baseUrl = "";
  let server;
  const sponsorService = {
    sponsorTransaction: vi.fn(),
  };

  beforeAll(async () => {
    const app = createApp({ sponsorService, enableStatic: false });

    await new Promise((resolve) => {
      server = app.listen(0, "127.0.0.1", resolve);
    });

    const address = server.address();
    baseUrl = `http://127.0.0.1:${address.port}`;
  });

  afterAll(async () => {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  });

  beforeEach(() => {
    sponsorService.sponsorTransaction.mockReset();
  });

  it("rejects a missing userAddress", async () => {
    const response = await fetch(`${baseUrl}/api/iota/sponsor-transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        actionType: SUPPORTED_ACTION_TYPE,
        payload: { arguments: [] },
      }),
    });

    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload.error).toContain("userAddress");
    expect(sponsorService.sponsorTransaction).not.toHaveBeenCalled();
  });

  it("rejects an unsupported actionType", async () => {
    const response = await fetch(`${baseUrl}/api/iota/sponsor-transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userAddress:
          "0x4d4fb0e2cb1b573b8bc40d96fdc81de0cdd50f4f1dc5af149048393ca5c7d100",
        actionType: "not_supported",
        payload: { arguments: [] },
      }),
    });

    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload.error).toContain("Unsupported actionType");
    expect(sponsorService.sponsorTransaction).not.toHaveBeenCalled();
  });

  it("surfaces sponsor gas exhaustion from the backend service", async () => {
    sponsorService.sponsorTransaction.mockRejectedValueOnce(
      new ApiError(503, "Sponsor wallet has no usable gas objects."),
    );

    const response = await fetch(`${baseUrl}/api/iota/sponsor-transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userAddress:
          "0x4d4fb0e2cb1b573b8bc40d96fdc81de0cdd50f4f1dc5af149048393ca5c7d100",
        actionType: SUPPORTED_ACTION_TYPE,
        payload: { arguments: [] },
      }),
    });

    const payload = await response.json();

    expect(response.status).toBe(503);
    expect(payload.error).toContain("Sponsor wallet has no usable gas objects");
  });

  it("returns the sponsor payload required by the client flow", async () => {
    sponsorService.sponsorTransaction.mockResolvedValueOnce({
      ok: true,
      actionType: SUPPORTED_ACTION_TYPE,
      sender:
        "0x4d4fb0e2cb1b573b8bc40d96fdc81de0cdd50f4f1dc5af149048393ca5c7d100",
      gasOwner:
        "0x99f4fbc4f17a1425dd8b50d7c403039bec2d1bdccf3d4f42d5cd0484391d4ed1",
      rpcUrl: "https://api.testnet.iota.cafe",
      network: "testnet",
      target: "0xabc::memberships::mint",
      typeArguments: [],
      transactionKindBytes: "kind-bytes",
      sponsoredTransactionBytes: "tx-bytes",
      sponsorSignature: "sponsor-signature",
      digest: "digest",
      gasBudget: "1000",
      gasPrice: "100",
      gasPayment: [
        {
          objectId:
            "0x8e88e1c23d9c34b15b175b47c80f0a853717fd0975027ce890d90c6bde2b0a5b",
          version: "7",
          digest: "coin-digest",
          balance: "2000000",
        },
      ],
    });

    const response = await fetch(`${baseUrl}/api/iota/sponsor-transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userAddress:
          "0x4d4fb0e2cb1b573b8bc40d96fdc81de0cdd50f4f1dc5af149048393ca5c7d100",
        actionType: SUPPORTED_ACTION_TYPE,
        payload: {
          arguments: [
            {
              kind: "pure",
              valueType: "u64",
              value: "1",
            },
          ],
        },
      }),
    });

    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.sponsoredTransactionBytes).toBe("tx-bytes");
    expect(payload.sponsorSignature).toBe("sponsor-signature");
    expect(sponsorService.sponsorTransaction).toHaveBeenCalledWith({
      userAddress:
        "0x4d4fb0e2cb1b573b8bc40d96fdc81de0cdd50f4f1dc5af149048393ca5c7d100",
      actionType: SUPPORTED_ACTION_TYPE,
      payload: {
        arguments: [
          {
            kind: "pure",
            valueType: "u64",
            value: "1",
          },
        ],
      },
    });
  });
});
