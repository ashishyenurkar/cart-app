import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoute.js';
import userRoute from './routes/userRoute.js'
import orderRoute from './routes/orderRoute.js'
import paymentRoute from './routes/paymentRoute.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();
dotenv.config();
connectDB();

// Configure CORS middleware
// Allow requests from a specific origin (http://localhost:5173)
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true // Allow credentials (cookies)
  };
  
  app.use(cors(corsOptions));
  

const PORT = 8080 || process.env.PORT;

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api', productRoutes); // Use productRoutes
app.use('/api', userRoute);
app.use('/api', orderRoute);
app.use('/api', paymentRoute);

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

app.listen(PORT, () => {
    console.log(`Server started successfully on PORT ${PORT}`);
});
