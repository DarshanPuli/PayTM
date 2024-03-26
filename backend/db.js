const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://darshan:darshanreddy123@cluster0.wqxotkn.mongodb.net/"
);

const schema = {
  username: {
    type: String,
    trim: true,
    minLength: 6,
    maxLength: 30,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 8,
    maxLength: 30,
    required: true,
  },
  firstname: {
    type: String,
    trim: true,
  },
  lastname: {
    type: String,
    trim: true,
  },
};

const userSchema = new mongoose.Schema(schema);
const Users = mongoose.model("Users", userSchema);

const accountSchema = new mongoose.Schema(
  {
    userId : {
      type : mongoose.Schema.Types.ObjectId,
      ref : Users,
    },
    balance : {
      type : Number
    }
  }
);
const Accounts = mongoose.model("Accounts",accountSchema);

module.exports = {Users,Accounts};
