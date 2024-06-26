const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const { Schema } = mongoose;
const Stripe = require("stripe")
dotenv.config();


const app = express();
const cloudinary = require('cloudinary');
//Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.Cloud_name,
  api_key: process.env.Cloud_ApiKey,
  api_secret: process.env.Cloud_ApiSecret,
  secure: true
});

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
const mongouri= process.env.MONGODB_URL;
const PORT = process.env.PORT || 8080;
const FRONTEND_URL = process.env.FRONTEND_URL;

//MONGODB CONNECTION
mongoose.connect(mongouri).then(() => console.log("Connected Successfully")).catch((e) => console.log(e))
//schema
const userSchema = new Schema({
  firstName: {
    type:String
    // required: true
  },
  lastName: {
    type:String,
    // required:true
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type:String,
    // required:true
  },
  confirmpassword: {
    type: String,
    // required:true
  },
  image: {
    type:String
    // required :true
  },
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;

//api
app.get("/", (req, res) => {
  res.send("Server is running");
});

//signup api
app.post("/Signup",  async(req, res) => {
  const { email } = req.body;
  const datauser = await userModel.findOne({ email: email });
  if (datauser) {
    res.json({ message: "Email id is already registered", alert: false });
  } else {
    const data = await userModel(req.body);
    await data.save();
    res.json({ message: "Signed up successfully", alert: true, data: data });
  }
});

//login api
app.post("/login", async(req, res) => {
  const { email } = req.body;
  const datauser = await userModel.find({ email: email });
  if (!datauser) {
    return res.json({message: "Email id is not registered ,please signup",alert: false});
  }
  console.log(datauser);
  res.json({ message: "Logged in successfully",datauser,alert: true });
});

//product section

const schemaProduct = new Schema({
  name: {
    type:String,
    required:true
  },
  category: {
    type:String,
    required:true
  },
  image: {
    type:String,
    required:true
  },
  price: {
    type:String,
    required:true
  },
  description: {
    type:String,
    required:true
  },
});

const productModel = mongoose.model("product", schemaProduct);
module.exports = productModel

//save product data in api
app.post("/product", async (req, res) => {
  const {name,category,image,price,description} = req.body;
  const result = await cloudinary.uploader.upload(image);
  const data = await productModel.create({
    name,category,image: result.url,price,description
  });
  await data.save();
  res.json({message: "uploaded successfully",data:data});
});

// api for getting products
app.get("/product", async (req, res) => {
  const data = await productModel.find();
  res.json(data);
});

// **** payment gateway***//
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
app.post("/create-checkout-session" , async(req,res) => {
  
   try {
    const params = {
      submit_type : "pay",
      mode: "payment",
      payment_method_types : ["card"],
      billing_address_collection : "auto",
      shipping_options : [{shipping_rate : "shr_1Ot5o0BPGENJsf2RuBwDeH8J"}],

      line_items : req.body.map((item) => {
        return {
          price_data : {
            currency : "INR",
            product_data :{
              name:item.name,
              //images : [item.image]
            },
            unit_amount : item.price *100 
          },
          adjustable_quantity  : {
            enabled : true,
            minimum : 1,
          },

          quantity: item.qty
        }
      }),

      success_url :`${FRONTEND_URL}/success`,
      cancel_url : `${FRONTEND_URL}/cancel`,
    }
    const session = await stripe.checkout.sessions.create(params);   
    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error.message);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
  
})

app.listen(PORT, () => console.log("Server is running at port :" + PORT));
