import { config } from "dotenv";
import { exit } from "node:process";
import fs from "fs"
import Joi from "joi";

const nodeEnvSchema = Joi.string().valid(
  "production",
  "development",
  "test",
);

const loadEnv = (callerPath: string) => {
  const env = process.env.NODE_ENV ?? "development";
  const envFilePath = callerPath + "/" + ".env" + "." + env;
  const { value, error } = nodeEnvSchema.validate(process.env.NODE_ENV);
  if (error || !fs.existsSync(envFilePath)) {
    console.log("Cannot load env file")
    exit(0)
  }

  config({ path: envFilePath });
};

export default loadEnv;
