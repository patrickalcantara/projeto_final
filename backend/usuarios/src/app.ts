//app.ts
import app from "sc-commons/api/app";
import usuariosRouter from "./routes/usuarios";

export default app(usuariosRouter);
