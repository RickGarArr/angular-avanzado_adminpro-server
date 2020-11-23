const mongoose = require('mongoose');

const dbConection = () => {
    mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };
    mongoose.connect(process.env.DB_CNN, mongooseOptions, (err) => {
        if (err) {
            return console.log(err);
        }
        console.log('base de datso online');
    });
}

module.exports = {
    dbConection
};