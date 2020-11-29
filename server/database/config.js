const mongoose = require('mongoose');

const dbConection = () => {
    mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify:true
    };
    mongoose.connect(process.env.DB_LCNN, mongooseOptions, (err) => {
        if (err) {
            return console.log(err);
        }
        console.log('base de datos online');
    });
}

module.exports = {
    dbConection
};