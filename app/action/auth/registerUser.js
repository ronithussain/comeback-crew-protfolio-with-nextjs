"use server"

import dbConnect, { collectionNamesObj } from "@/lib/dbConnect"
import bcrypt from "bcrypt";

export const registerUser = async (payload) => {
    const userCollection = dbConnect(collectionNamesObj.userCollection);

    // validation -1
    const { name, email, password } = payload;
    if (!email || !password) return null;

    // validation -2
    const user = await userCollection.findOne({ email: payload.email })

    if (!user) {
        const hashedPassword = await bcrypt.hash(password, 10);
        payload.password = hashedPassword
        const result = await userCollection.insertOne(payload);
        result.insertedId = result.insertedId.toString()
        return result
    }
    return null;
}