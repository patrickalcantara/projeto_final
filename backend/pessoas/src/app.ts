//app.ts
import app from "sc-commons/api/app";
import pessoasRouter from "./routes/pessoas";

export default app(pessoasRouter);
