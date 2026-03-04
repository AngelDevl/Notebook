export const ServerConfig = {
  allowedOrigins: [`http://localhost:${process.env.CLIENT_SIDE_PORT}`],
  rateLimitConfig: {
    windowMs: 1 * 60 * 1000,
    maxRequests: 60,
  },
  port: 4000,
};

export const JoiValidationConfig = {
  noteContentSettings: {
    minLength: 0,
    maxLength: 50000,
  },

  noteTitleSettings: {
    minLength: 1,
    maxLength: 50,
  },
};
