const mongoose = require("mongoose");

const StaticSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  availableBalance: {
    type: Number,
    required: true,
  },
  incomeGoal: {
    type: Number,
    required: true,
  },
  assets: {
    land: {
      type: Number,
      required: true,
    },
    business: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    others: {
      type: Number,
      required: true,
    },
  }
});

module.exports = mongoose.model("Static", StaticSchema);
