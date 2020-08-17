const mongoose = require('mongoose');
const config = require('./utils/config');

const url = config.URL;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const guitarSchema = new mongoose.Schema({
  title: String,
  price: Number,
});

const Guitar = mongoose.model('Guitar', guitarSchema);

const guitar = new Guitar({
  title: 'Telecaster',
  price: 1099.9,
});

guitar.save().then((res) => {
  console.log('guitar saved!');
  mongoose.connection.close();
});

Guitar.find({}).then((res) => {
  res.forEach((guitar) => {
    console.log(guitar);
  });
  mongoose.connection.close();
});
