const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const { Schema } = mongoose;
const Stripe = require("stripe")
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;
//MONGODB CONNECTION

mongoose
  .connect(
    "mongodb+srv://anjali:KmmgHp2eLd9sBiXk@anjalistore.wvl4gql.mongodb.net/anjalistore?retryWrites=true&w=majority"
  )

  .then(() => {
    console.log("Connected Successfully");
  })
  .catch((e) => console.log(e));

//schema

const userSchema = mongoose.Schema({
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
  
 // console.log(req.body);
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
  //console.log(req.body);
  const { email } = req.body;

  const datauser = await userModel.find({ email: email });
  if (!datauser) {
    return res.json({
      message: "Email id is not registered ,please signup",
      alert: false,
    });
  }
    console.log(datauser);
    res.json({ message: "Logged in successfully",datauser,alert: true });
});

//product section

const schemaProduct = mongoose.Schema({
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

  const {name,category,image,price,description}=req.body;
  console.log(req.body);
//   const responce = JSON.stringify(req.body);
//   res.json(responce);
//   const newproduct = await productModel(req.body)
//   res.json(newproduct);
  const data = await productModel.create(req.body);
  await data.save();
  res.send ({message: "uploaded successfully",data:data});
});

// api for getting products

app.get("/product", async (req, res) => {
  const data = await productModel.find({})
  //res.json(data);
   res.send(JSON.stringify(data))
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

      success_url :"http://localhost:3000/success",
      cancel_url : "http://localhost:3000/cancel",
    }


   
      const session = await stripe.checkout.sessions.create(params);

     
      res.status(200).json({ sessionId: session.id });
  } catch (error) {
      console.error("Error creating checkout session:", error.message);
      res.status(500).json({ error: "Failed to create checkout session" });
  }
  
})
app.listen(PORT, () => console.log("Server is running at port :" + PORT));
