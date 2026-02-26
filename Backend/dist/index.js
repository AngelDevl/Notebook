"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const prisma_1 = require("./utils/prisma");
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const trycatch_1 = __importDefault(require("./utils/trycatch"));
const app_route_1 = __importDefault(require("./routes/app.route"));
const config_1 = require("./config");
if (process.env.NODE_ENV != "production") {
    (0, dotenv_1.config)({ path: "../.env" });
}
const app = (0, express_1.default)();
const PORT = process.env.EXPRESS_API_PORT || 4000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: config_1.allowedOrigins,
    credentials: true,
}));
app.get("/health", (0, trycatch_1.default)(async (req, res) => {
    await prisma_1.prisma.$queryRaw `SELECT 1`;
    res.json({ success: true, status: "ok" });
}));
app.use("/app", app_route_1.default);
app.use(errorHandler_1.default);
app.use("*path", (req, res) => {
    res.sendStatus(404);
});
app.listen(PORT, () => console.log(`Server is listening to port: ${PORT}`));
