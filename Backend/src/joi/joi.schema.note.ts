import Joi from "joi";
import { noteContentSettings, noteTitleSettings } from "../config";

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
