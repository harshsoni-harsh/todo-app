'use client'
import axios from "axios";
import { useRouter } from "next/navigation";

const BACKEND_URI = process.env.NEXT_PUBLIC_BACKEND_URI;

export default function LogoutButton() {
    const router = useRouter();
    const logout = async () => {
        try {
            await axios.post(`${BACKEND_URI}/api/auth/logout`, {}, { withCredentials: true })
            router.replace('/')
        } catch (error) {
            console.error("Error logging out");
        }
    }
    return (
        <button onClick={logout} className="py-4 px-6 bg-black min-h-full text-white cursor-pointer hover:bg-zinc-800">Logout</button>
    )
}