'use server'
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    return (
        <div className="flex w-full justify-between items-center border-b border-b-black">
            <Link href="/" className="font-bold p-4 cursor-pointer">Todo App</Link>
            {
                token ?
                    <LogoutButton /> :
                    <Link href='/auth' className="py-4 px-6 bg-black min-h-full text-white cursor-pointer hover:bg-zinc-800">Login / Sign up</Link>
            }
        </div>
    )
}