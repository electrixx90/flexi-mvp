import express from "express";

import { createSponsorTransactionServiceFromEnv } from "../iota/sponsor-service.js";
import { parseSponsorTransactionRequest } from "../iota/schemas.js";

export function createIotaRouter({
  sponsorService,
  sponsorServiceFactory = () => createSponsorTransactionServiceFromEnv(),
} = {}) {
  const router = express.Router();
  let cachedSponsorService = sponsorService ?? null;

  function getSponsorService() {
    if (!cachedSponsorService) {
      cachedSponsorService = sponsorServiceFactory();
    }

    return cachedSponsorService;
  }

  router.post("/sponsor-transaction", async (req, res, next) => {
    try {
      const request = parseSponsorTransactionRequest(req.body);
      const response = await getSponsorService().sponsorTransaction(request);
      res.json(response);
    } catch (error) {
      console.error("Failed to sponsor transaction", {
        userAddress: req.body?.userAddress,
        actionType: req.body?.actionType,
        error: error.message,
      });
      next(error);
    }
  });

  return router;
}
