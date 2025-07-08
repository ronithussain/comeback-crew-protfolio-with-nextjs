import { authOptions } from "@/lib/authOptions";
import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// DELETE api
export const DELETE = async (res, { params }) => {
    const p = await params

    const bookingCollection = dbConnect(collectionNamesObj.bookingCollection)
    const query = { _id: new ObjectId(p.id) }

    // validation
    const session = await getServerSession(authOptions)
    const currentBooking = await bookingCollection.findOne(query)

    const isOwnerOK = session?.user?.email == currentBooking.email

    if (isOwnerOK) {
        // Deleting user specific booking

        const deleteResponse = await bookingCollection.deleteOne(query)
        revalidatePath("/my-booking")
        return NextResponse.json(deleteResponse);
    }
    else {
        return NextResponse.json({ success: false, message: "Forbidden Action" }, { status: 401 })
    }
}

// GET api:
export const GET = async (req, { params }) => {

    const p = await params;

    //  ID validation
    if (!ObjectId.isValid(p.id)) {
        return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const servicesCollection = dbConnect(collectionNamesObj.servicesCollection);
    const data = await servicesCollection.findOne({ _id: new ObjectId(p.id) });

    return NextResponse.json(data);

}