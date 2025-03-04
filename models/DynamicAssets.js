const mongoose = require('mongoose');

const DynamicSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  spending: {
    housing: {
      type: Number,
      required: true,
    },
    personal: {
      type: Number,
      required: true,
    },
    transportation: {
      type: Number,
      required: true,
    }
  },
  income: {
    salary: {
      type: Number,
      required: true,
    },
    e_commerce: {
      type: Number,
      required: true,
    },
    others: {
      type: Number,
      required: true,
    }
  }
});

module.exports = mongoose.model('Dynamic', DynamicSchema);
