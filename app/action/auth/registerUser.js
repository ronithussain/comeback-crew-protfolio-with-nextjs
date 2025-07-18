"use server"

import dbConnect, { collectionNamesObj } from "@/lib/dbConnect"
import bcrypt from "bcrypt";

export const registerUser = async (payload) => {
  const userCollection = dbConnect(collectionNamesObj.userCollection);

  // validation -1
  const { name, email, password } = payload;
  if (!email || !password) {
    return { success: false, message: "Email and password are required" };
  }

  // validation -2
  const existingUser = await userCollection.findOne({ email });

  if (existingUser) {
    return { success: false, message: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  payload.password = hashedPassword;

  const result = await userCollection.insertOne(payload);
  if (result.insertedId) {
    return { success: true, message: "User registered successfully" };
  } else {
    return { success: false, message: "Failed to register user" };
  }
};




// nicher code ta project e dekhano jekhane user ke redirect er kaj ta korano hoyni.... tai etake comment rekhe upore puro code ta kora holo...

// "use server"

// import dbConnect, { collectionNamesObj } from "@/lib/dbConnect"
// import bcrypt from "bcrypt";

// export const registerUser = async (payload) => {
//     const userCollection = dbConnect(collectionNamesObj.userCollection);

//     // validation -1
//     const { name, email, password } = payload;
//     if (!email || !password) return null;

//     // validation -2
//     const user = await userCollection.findOne({ email: payload.email })

//     if (!user) {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         payload.password = hashedPassword
//         const result = await userCollection.insertOne(payload);
//         result.insertedId = result.insertedId.toString()
//         return result
//     }
//     return null;
// }