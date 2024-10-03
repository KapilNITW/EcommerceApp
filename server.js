import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRouter from "./routes/productRoutes.js";

dotenv.config();
//database config
connectDB();

const app = express();


// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRouter);


app.get('/', (req, res) => {
    res.send("<h1>Hi i m kapil</h1>");
});

app.listen(process.env.PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${process.env.PORT}`.bgYellow.blue);
})