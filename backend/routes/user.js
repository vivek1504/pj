const express = require("express");
const userRouter = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const {User, accounts, Accounts} = require("../db");
const { authMiddleware } = require("../middleware");

const userValidation = zod.object({
    username : zod.string().email(),
    password : zod.string(),
    firstName : zod.string(),
    lastName : zod.string()
})

const signInValidation = zod.object({
    username : zod.string().email(),
    password : zod.string()
})

const updateBody = zod.object({
    password : zod.string(),
    firstName : zod.string(),
    lastName : zod.string()
})

userRouter.post("/signUp",async(req,res)=>{
    const userData = {
         username : req.body.username,
         password : req.body.password,
         firstName : req.body.firstName,
         lastName : req.body.lastName
    }
    
    const isValid = userValidation.safeParse(userData)

    if(!isValid.success){        
        return res.status(411).json({
            message : "incorrect inputs"
        })
    }

    const existingUser =await User.findOne({
        username : userData.username
    });

    if(existingUser){
        return res.status(411).json({
            message : "email already used"
        })
    }

    const user =await User.create(userData);
    const userId = user._id;

    await Accounts.create({
        userId,
        balance : 1 + Math.floor(Math.random()*10000)
    })

    const token = jwt.sign({userId}, JWT_SECRET);
    res.status(200).json({
        message : "user Created Successfully",
        token : token
    })

})

userRouter.post("/signIn",async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const isValid = signInValidation.safeParse({
        username : username,
        password : password
    })

    if(!isValid.success){
        return res.status(411).json({
            message : "invalid inputs"
        })
    }

    const isUser =await User.findOne({
        username : username,
        password : password
    })

    if(!isUser){
        return res.status(411).json({
            message : "user does not exist"
        })
    }

    const userId = isUser._id;
    const token = jwt.sign({userId}, JWT_SECRET);

    res.status(200).json({
        token : token
    })
})

userRouter.put("/",authMiddleware,async(req,res)=>{
    const isValid = updateBody.safeParse(req.body);

    if(!isValid.success){
        return res.status(411).json({message : "invalid inputs"})
    }

    await User.updateOne({_id : req.userId},req.body);

    res.status(200).json({
        message : "information updated"
    })
})

userRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


module.exports = userRouter;
