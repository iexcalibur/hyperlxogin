// mongodb.ts
import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface MongooseConnectionCache {
    conn: mongoose.Connection | null;
    promise: Promise<Mongoose> | null;
}

declare global {
    var mongooseCache: MongooseConnectionCache;
}

if (!global.mongooseCache) {
    global.mongooseCache = { conn: null, promise: null };
}

async function dbConnect(): Promise<mongoose.Connection> {
    const cache = global.mongooseCache;

    if (cache.conn) {
        return cache.conn;
    }

    if (!cache.promise) {
        cache.promise = mongoose.connect(MONGODB_URI);
    }

    const mongooseInstance = await cache.promise;
    cache.conn = mongooseInstance.connection;
    return cache.conn;
}

export default dbConnect;
