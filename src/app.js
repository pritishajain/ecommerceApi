import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js"
import productRoutes from "./routes/product.routes.js"
import categoryRoutes from "./routes/category.routes.js"
import subCategoryRoutes from "./routes/subCategory.routes.js"

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
app.use("/api/v1/product" , productRoutes);
app.use("/api/v1/category" , categoryRoutes);
app.use("/api/v1/sub-category" , subCategoryRoutes);


export default app;
