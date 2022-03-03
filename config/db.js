const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_CONNECT);
        console.log(`DB Connected ${conn.connection.host}`);
    } catch (err) {
        if(err) {
            console.log('Failed To Connect');
            process.exit(1);
        }
    }
}

module.exports = connectDB;