const express = require("express");
const { authMiddleware } = require("../middleware");
const { Accounts } = require("../db");
const { default: mongoose } = require("mongoose");
const accountRouter = express.Router();

accountRouter.get("/balance",authMiddleware,async(req,res)=>{
    const userId = req.userId;

    const data =await Accounts.findOne({
        userId : userId
    })

    res.json({
        balance : data.balance
    })
})

accountRouter.post("/transfer",authMiddleware,async(req,res)=>{
    const session =await mongoose.startSession();

    session.startTransaction();

    const to =req.body.to;
    const amount = req.body.amount;

    const sender =await Accounts.findOne({
        userId : req.userId
    }).session(session);

    if(amount > sender.balance){
        return res.status(411).json({
            message : "insufficient funds"
        })
    }

    const receiver = await Accounts.findOne({
        userId : to
    }).session(session)

    if(!receiver){
        return res.status(411).json({
            messgage : "invalid user"
        })
    }

    await Accounts.updateOne({
        userId : req.userId
    },{
        $inc : {
            balance : -amount
        }
    }).session(session);

    await Accounts.updateOne({
        userId : to
    },{
        $inc : {
            balance : amount
        }
    }).session(session);

    await session.commitTransaction();

    res.json({
        message : "transfer Successful"
    })
})


module.exports = {
    accountRouter
}
