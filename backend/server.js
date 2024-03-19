const dotenv=require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const cors=require("cors");
const userRoute=require("./routes/userRoute");
const productRoute=require("./routes/productRoute");
const contactRoute=require("./routes/contactRoute");
const errorHandler=require("./middleWare/errorMiddleware");
const cookieParser=require("cookie-parser");
const path = require('path');
const app=express()

//middleware(axios,cors)
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors({
    origin: 'https://deploy-maha-dhanush.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    credentials: true
  }));

app.use("/uploads",express.static(path.join(__dirname,"uploads")));


//routing function-route-middleware
app.use("/api/users",userRoute);
app.use("/api/products",productRoute);
app.use("/api/contactus",contactRoute);


app.get("/",(req,res)=>{
res.send("home page");
});
//error handler-middleware
app.use(errorHandler);

const PORT=process.env.PORT || 5001;

//connection to mongodb database
const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    app.listen(PORT,()=>{
            console.log(`Server running on port ${PORT}`);
        });
    } catch(error) {
        console.error(error);
    }
}

connectDatabase();
