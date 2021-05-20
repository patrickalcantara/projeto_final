import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import authCommons, { Token } from "sc-commons/api/auth";
import path from "path";

const privateKey = fs.readFileSync(
  path.join(authCommons.findKeysPath(__dirname), "private.key"),
  "utf-8"
);
const jwtExpires = parseInt(`${process.env.JWT_EXPIRES}`);
const algoritmo = "RS256";

function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

function comparePassword(password: string, hashPassword: string) {
  return bcrypt.compareSync(password, hashPassword);
}

function sign(usuarioId: number) {
  const token: Token = { usuarioId };
  return jwt.sign(token, privateKey, {
    expiresIn: jwtExpires,
    algorithm: algoritmo,
  });
}

async function verify(token: string) {
  return authCommons.verify(token);
}

export default { hashPassword, comparePassword, sign, verify };
