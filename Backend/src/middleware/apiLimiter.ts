import rateLimit from "express-rate-limit";
import { ServerConfig } from "../config";
import { ReasonPhrases } from "http-status-codes";

const apiLimiter = rateLimit({
  windowMs: ServerConfig.rateLimitConfig.windowMs,
  max: ServerConfig.rateLimitConfig.maxRequests,
  message: ReasonPhrases.TOO_MANY_REQUESTS,
});

export default apiLimiter;
