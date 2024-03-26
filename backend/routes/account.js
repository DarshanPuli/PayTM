const express = require("express");
const {Accounts,Users} = require("../db");
const authMiddleware = require("./middleware");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/balance",authMiddleware,async (req,res)=>{
    const userId = req.userId;
    const user = await Accounts.findOne({userId:userId});
    const userData = await Users.findOne({_id : userId});
    const balance = user.balance;
    const firstName = userData.firstname;
    const id = userData._id;
    return res.json(
        {
            balance,
            firstname : firstName,
            id
        }
    )
})

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Accounts.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Accounts.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await Accounts.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Accounts.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});
module.exports = router; 