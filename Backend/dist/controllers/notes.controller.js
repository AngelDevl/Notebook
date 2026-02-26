"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.createNote = exports.getNote = exports.getNotes = void 0;
const ApiError_1 = require("../errors/ApiError");
const ErrorCodes_1 = require("../errors/ErrorCodes");
const prisma_1 = require("../utils/prisma");
const trycatch_1 = __importDefault(require("../utils/trycatch"));
const joi_schema_note_1 = require("../joi/joi.schema.note");
exports.getNotes = (0, trycatch_1.default)(async (req, res) => {
    const notes = await prisma_1.prisma.note.findMany();
    res.status(200).json(notes);
});
exports.getNote = (0, trycatch_1.default)(async (req, res) => {
    const noteId = req.params.id;
    const note = await prisma_1.prisma.note.findUnique({
        where: { id: String(noteId) },
    });
    if (!note) {
        throw new ApiError_1.ApiError(ErrorCodes_1.API_ERROR_CODES.NOTE_NOT_EXISTS, `Note not found`, 404);
    }
    res.json({ note: note });
});
exports.createNote = (0, trycatch_1.default)(async (req, res) => {
    const { value, error } = joi_schema_note_1.createNoteSchema.validate(req.body);
    if (error) {
        throw new ApiError_1.ApiError(ErrorCodes_1.API_ERROR_CODES.BAD_REQUEST_BODY, error.details.map((err) => err.message).join(", "), 400);
    }
    const { title, content } = value;
    const newNote = await prisma_1.prisma.note.create({
        data: {
            title,
            content,
        },
    });
    res.status(201).json({ note: newNote });
});
exports.updateNote = (0, trycatch_1.default)(async (req, res) => {
    const data = {
        uuid: req.params.id,
        ...req.body,
    };
    const { value, error } = joi_schema_note_1.updateNoteSchema.validate(data);
    if (error) {
        throw new ApiError_1.ApiError(ErrorCodes_1.API_ERROR_CODES.BAD_PARAMS, error.details.map((err) => err.message).join(", "), 400);
    }
    const { uuid: noteId, title, content } = value;
    const existing = await prisma_1.prisma.note.findUnique({
        where: { id: String(noteId) },
    });
    if (!existing) {
        throw new ApiError_1.ApiError(ErrorCodes_1.API_ERROR_CODES.BAD_REQUEST, `Note not found`, 404);
    }
    const updatedNote = await prisma_1.prisma.note.update({
        where: { id: String(noteId) },
        data: {
            ...(title && { title }),
            ...(content && { content }),
        },
    });
    res.json({ note: updatedNote });
});
exports.deleteNote = (0, trycatch_1.default)(async (req, res) => {
    const noteId = req.params.id;
    await prisma_1.prisma.note.delete({
        where: { id: String(noteId) },
    });
    res.status(202).json({ deleted: true });
});
