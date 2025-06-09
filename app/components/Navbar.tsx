import { auth, signIn, signOut } from "@/auth"
import Image from "next/image"
import Link from "next/link"

const Navbar = async () => {
    // 1. Mengambil data sesi di server, ini sudah benar.
    const session = await auth()

    return (
        <div className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <Image src="/logo.png" alt="logo" width={144} height={30} />
                </Link>
                <div className="flex items-center gap-5 text-black">
                    {/* 2. Kondisi ini sudah benar, memeriksa apakah user sudah login */}
                    {session?.user ? (
                        <>
                            <Link href="/startup/create" className="hover:text-gray-700 cursor-pointer">
                                <span>Create</span>
                            </Link>

                            {/* 3. Tombol Logout dibungkus dengan <form> yang memanggil Server Action */}
                            <form
                                action={async () => {
                                    "use server";
                                    await signOut();
                                }}
                            >
                                <button type="submit" className="hover:text-gray-700 cursor-pointer">
                                    <span>Logout</span>
                                </button>
                            </form>

                            <Link href={`/user/${session.id}`} className="flex items-center gap-2">
                                <span className="font-semibold">{session.user.name}</span>
                            </Link>
                        </>
                    ) : (
                        /* 4. Tombol Login juga dibungkus dengan <form> untuk Server Action */
                        <form
                            action={async () => {
                                "use server";
                                await signIn("github");
                            }}
                        >
                            <button type="submit" className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 cursor-pointer">
                                <span>Login with GitHub</span>
                            </button>
                        </form>
                    )}
                </div>
            </nav>
        </div>
    )
}

export default Navbar
