"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notes_route_1 = __importDefault(require("./notes.route"));
const apiRouter = express_1.default.Router();
apiRouter.use("/notes", notes_route_1.default);
exports.default = apiRouter;
