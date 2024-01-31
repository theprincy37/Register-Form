const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const { long } = require("webidl-conversions");
const bodyParser = require("body-parser");


const app = express();
dotenv.config();

const port = process.env.PORT || 5500;

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${username}:<${password}@cluster0.vkhwwyn.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser : true,
    useUnifiedTopology: true
});

//Registratinf Schema 
const registrationSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String, 
});

//Model of Registration Schema 
const Registration = mongoose.model("Registration", registrationSchema);

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/Pages/page.html");
});

app.post("/register", async(req,res)=>{
    try {
        const{name,email,password} = req.body;
        const existingUser = await reg.findOne({email:email});
        //check for existing user
        if(!existingUser){
            const RegistrationData = new Registration({
                name,
                email,
                password
            });
            await RegistrationData.save();
            res.redirect("/success");
        }
        else{
            console.log("User already exist.");
            res.redirect("/error");
        }
       
        } catch(error) {
        console.log(error);
        res.redirect("/error");
        }
});

app.get("/success", (req, res)=>{
    res.sendFile(__dirname+"/Pages/success.html");
});
app.get("/error", (req, res)=>{
    res.sendFile(__dirname+"/Pages/error.html");
});


app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
});