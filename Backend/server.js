import express from 'express'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cors from 'cors';

const app=express();
app.use(cors());
const port=5000;
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.get('/',(req,res)=>
   {res.send('hi')
   }
);
const runserver=()=>{
 app.listen(port,()=>{
    console.log('server was listening in port 5000')
 })
}
runserver()