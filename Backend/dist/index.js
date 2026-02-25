"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const prisma_1 = require("./utils/prisma");
const errorHandler_1 = __importDefault(require("./utils/errorHandler"));
(0, dotenv_1.config)({ path: "../.env" });
const app = (0, express_1.default)();
const PORT = process.env.EXPRESS_API_PORT || 4000;
app.use(express_1.default.json());
app.get("/health", async (req, res) => {
    try {
        await prisma_1.prisma.$queryRaw `SELECT 1`;
        res.send("ok");
    }
    catch (error) {
        res.send("not ok");
    }
});
app.use(errorHandler_1.default);
app.listen(PORT, () => console.log(`Server is listening to port: ${PORT}`));
