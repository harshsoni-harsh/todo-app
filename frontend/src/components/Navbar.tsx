import Link from "next/link";

export default function Navbar() {
    return (
        <div className="flex w-full justify-between items-center border-b border-b-black">
            <p className="font-bold p-4">Todo App</p>
            <Link href='/auth' className="py-4 px-6 bg-black min-h-full text-white cursor-pointer hover:bg-zinc-800">Login / Sign up</Link>
        </div>
    )
}