import BookingUpdateForm from '@/components/forms/BookingUpdateForm'
import { headers } from 'next/headers';
import React from 'react'


export default async function UpdateBookingPage({ params }) {
    console.log(params)

    const p = await params;
    const res = await fetch(`https://comeback-crew-ecommerce-portfolio.vercel.app/api/my-bookings/${p.id}`,{
        headers: new Headers(await headers())
    })

    
    const data = await res.json();

    return (
        <div>
            <BookingUpdateForm data={data}/>
        </div>
    )
}
