import { authOptions } from "@/lib/authOptions";
import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server"

// UpdateBookingData load api in this form
export const GET = async (req, { params }) => {

    const p = await params;
    const bookingCollection = dbConnect(collectionNamesObj.bookingCollection)
    const query = { _id: new ObjectId(p.id) }

    // validation
    const session = await getServerSession(authOptions)
    const email = session?.user?.email
    const singleBooking = await bookingCollection.findOne(query)
    const isOwnerOK = email === singleBooking?.email

    if (isOwnerOK) {
        return NextResponse.json(singleBooking)
    }
    else {
        return NextResponse.json({ message: "Forbidden GET action" }, { status: 403 })
    }

}

// finally updateBookingData for patch api
export const PATCH = async (req, { params }) => {

    const p = await params;
    const bookingCollection = dbConnect(collectionNamesObj.bookingCollection)
    const query = { _id: new ObjectId(p.id) }

    // validation protected route
    const session = await getServerSession(authOptions)
    const email = session?.user?.email
    const currentBookingData = await bookingCollection.findOne(query)
    const isOwnerOK = email === currentBookingData?.email

    if (isOwnerOK) {

        const body = await req.json()
        const filter = {
            $set: { ...body }
        }
        const option = {
            upsert: true
        }
        const updateResponse = await bookingCollection.updateOne(query, filter, option)
        revalidatePath("/my-bookings")

        return NextResponse.json(updateResponse);
    }
    else {
        return NextResponse.json({ message: "Forbidden UPDATE action" }, { status: 403 })
    }

}