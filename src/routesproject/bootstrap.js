import authRouter from "../routes/auth.routes.js";
import categoryRouter from "../routes/category.routes.js";
import subcategoryRouter from "../routes/subcategory.routes.js";
import productRouter from "../routes/product.routes.js";
import vehicleRouter from "../routes/Vehicle.routes.js";
import animalRouter from "../routes/animal.routes.js";


export default (app) => {
    app.use("/api/auth", authRouter);
    app.use("/api/categories", categoryRouter);
    app.use("/api/subcategories", subcategoryRouter);
    app.use("/api/products", productRouter);
    app.use("/api/vehicles", vehicleRouter);
    app.use("/api/animals", animalRouter);
}

