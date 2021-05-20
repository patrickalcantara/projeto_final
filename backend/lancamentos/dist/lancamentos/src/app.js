"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//app.ts
const app_1 = __importDefault(require("sc-commons/api/app"));
const lancamentos_1 = __importDefault(require("./routes/lancamentos"));
exports.default = app_1.default(lancamentos_1.default);
