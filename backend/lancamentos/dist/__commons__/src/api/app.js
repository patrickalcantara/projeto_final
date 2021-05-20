"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//app.ts
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
function getCorsOrigin() {
    const origin = process.env.CORS_ORIGIN;
    if (!origin)
        throw new Error("CORS_ORIGIN is a required env var.");
    if (origin === "*")
        return origin;
    return new RegExp(origin);
}
exports.default = (router) => {
    const app = express_1.default();
    app.use(morgan_1.default("dev"));
    app.use(helmet_1.default());
    const corsOptions = {
        origin: getCorsOrigin(),
        optionsSuccessStatus: 200,
    };
    app.use(cors_1.default(corsOptions));
    app.use(express_1.default.json());
    app.use(router);
    return app;
};
