import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import connectDB from "./config/db.js";
import userRoutes from  "./routes/userRoutes.js";
import enterpriseRoutes from "./routes/enterpriseRoutes.js";
import tagRoutes from "./routes/tagRoutes.js";
import storeRoutes from "./routes/storeRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
app.use(express.json());
dotenv.config();

connectDB();

const corsOptions = {
    origin: function(origin, callback){
        if(!origin){
            return callback(null, true);
        }
        else{
            callback(null, true);
        }
    },
};

app.use(cors(corsOptions));

// Routing
app.use("/api/users", userRoutes);
app.use("/api/enterprise", enterpriseRoutes);
app.use("/api/tag", tagRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/product", productRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})