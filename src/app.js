import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js"

const app = express();

app.use(cors(
    {
        origin: '*',
        credentials: true
    }
))

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));
app.use(cookieParser());


app.use("/api/v1/auth", authRoutes);



export default app;
