import Joi from "joi";

const uuid = Joi.string().uuid();

export const uuidSchema = Joi.object({
  uuid: uuid.required(),
});

export const createNoteSchema = Joi.object({
  title: Joi.string().min(1).max(50),
  content: Joi.string(),
}).required();

export const updateNoteSchema = Joi.object({
  title: Joi.string().min(1).max(50),
  content: Joi.string(),
  uuid: uuid.required(),
}).required();
