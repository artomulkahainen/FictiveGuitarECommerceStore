const mongoose = require('mongoose');

const guitarSchema = new mongoose.Schema({
  title: String,
  price: Number,
});

guitarSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Guitar', guitarSchema);
