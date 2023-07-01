const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
//skeleton structure of the data format angels,ff

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please add a name"]//compulsory
    },
    email:{
        type:String,
        require:[true,"please add a email"],//compulsory
        unique:true,//unique matching
        trim:true,//space ff
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email" 
        ]//use regex,

    },
    password:{
        type:String,
        required:[true,"please add a password"],
        minLength:[6,"Password must be atleast 6 characters "],
        //maxLength:[,"Password must not be more than 22 characters "]
    },
    photo:{
        type:String,
        required:[true,"Please add a photo"],
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fkids.nationalgeographic.com%2Fscience%2Farticle%2Fthe-truth-about-your-heart&psig=AOvVaw1rw-CduUqtjz1Emw7Lii9w&ust=1679315606605000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLjB0aWA6P0CFQAAAAAdAAAAABAE"
    },
    phone:{
        type:Number,
        default:"+91"
    },
    bio:{
        type:String,
        maxLength:[250,"bio must be not more than 250 characters"],
        default:"bio"
    }
    
},{
    timestamps:true
})
//encrypt password before pushin to mongodb
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();

    }

    //hash password
    const salt=await bcrypt.genSalt(10) //length of salt 10
    const hashedPassword=await bcrypt.hash(this.password,salt)
    this.password=hashedPassword;
    next()
});

const User=mongoose.model("User",userSchema)
module.exports=User