import mongoose from "mongoose";

export default async function dbConnect() {

    await mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log('Connected to MongoDB')
        })
        .catch(err => console.error('Could not connect to MongoDB', err));

    const db = mongoose.connection.db;
    return db;

}
