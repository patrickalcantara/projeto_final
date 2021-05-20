import jwt, { VerifyOptions } from "jsonwebtoken";
import fs from "fs";
import path from "path";

const publicKey = fs.readFileSync(
  path.join(findKeysPath(__dirname), "public.key"),
  "utf-8"
);
const algoritmo = "RS256";

function findKeysPath(currentPath: string): string {
  const keysPath = path.join(currentPath, "keys");
  if (fs.existsSync(keysPath)) return keysPath;
  else return findKeysPath(path.join(currentPath, ".."));
}

export type Token = { usuarioId: number };

async function verify(token: string) {
  try {
    const tokendecodificado: Token = (await jwt.verify(token, publicKey, {
      algorithms: [algoritmo],
    } as VerifyOptions)) as Token;
    return { usuarioId: tokendecodificado.usuarioId };
  } catch (error) {
    console.log(`verify: ${error}`);
  }
}

export default { verify, findKeysPath };
