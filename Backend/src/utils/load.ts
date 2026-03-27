import loadEnv from "./loadEnv.js";
import path from "node:path";

loadEnv(path.join(process.cwd(), ".."));