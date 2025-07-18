"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";


export default function DeleteBookingButton({ id }) {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            const res = await fetch(`https://comeback-crew-ecommerce-portfolio.vercel.app/api/service/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            console.log("Deleted:", data);
            router.refresh()
            toast.success("Deleted Successfully")

        } catch (error) {
            console.error("Delete Error:", error);
        }
    };

    return (
        <button onClick={handleDelete} 
        className="btn btn-outline btn-sm btn-error flex items-center gap-2">
            <FaTrash />
        </button>
    );
}
