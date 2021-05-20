"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const publicKey = fs_1.default.readFileSync(path_1.default.join(findKeysPath(__dirname), "public.key"), "utf-8");
const algoritmo = "RS256";
function findKeysPath(currentPath) {
    const keysPath = path_1.default.join(currentPath, "keys");
    if (fs_1.default.existsSync(keysPath))
        return keysPath;
    else
        return findKeysPath(path_1.default.join(currentPath, ".."));
}
function verify(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tokendecodificado = (yield jsonwebtoken_1.default.verify(token, publicKey, {
                algorithms: [algoritmo],
            }));
            return { usuarioId: tokendecodificado.usuarioId };
        }
        catch (error) {
            console.log(`verify: ${error}`);
        }
    });
}
exports.default = { verify, findKeysPath };
