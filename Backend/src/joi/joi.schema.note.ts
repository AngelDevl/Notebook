import Joi from "joi";
import { JoiValidationConfig, ServerConfig } from "../config.js";

const noteContentSettings = JoiValidationConfig.noteContentSettings;
const noteTitleSettings = JoiValidationConfig.noteTitleSettings;

const uuid = Joi.string().uuid();
const title = Joi.string()
  .min(noteTitleSettings.minLength)
  .max(noteTitleSettings.maxLength);
const content = Joi.string()
  .min(noteContentSettings.minLength)
  .max(noteContentSettings.maxLength);
export const uuidSchema = Joi.object({
  uuid: uuid.required(),
});

export const createNoteSchema = Joi.object({
  title: title,
  content: content,
}).required();

export const updateNoteSchema = Joi.object({
  title: title,
  content: content,
  uuid: uuid.required(),
}).required();

export const envVarsSchema = Joi.object().keys({
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),

  DATABASE_URL: Joi.string().required(),
  DATABASE_URL_PRODUCTION: Joi.string().required(),

  EXPRESS_API_PORT: Joi.number().default(ServerConfig.port),
  CLIENT_SIDE_PORT: Joi.number().required(),
  VITE_EXPRESS_API_PORT: Joi.number().default(ServerConfig.port),
});
