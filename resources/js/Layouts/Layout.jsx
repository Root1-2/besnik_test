import { Link } from "@inertiajs/react";
import { BookOpen, Home, User } from "lucide-react";

export default function Layout({ children }) {
    return (
        <div className="flex">
            <nav className="w-1/5 h-dvh bg-blue-900 rounded-e-lg shadow-2xl text-white p-5 flex flex-col gap-3 text-xl">
                <h1 className="text-3xl underline mb-5">Besnik Test</h1>
                <Link
                    className="flex gap-2 items-center hover:bg-blue-950 transition-colors ps-2 py-2 rounded-lg"
                    href="/"
                >
                    <Home />
                    Home
                </Link>
                <Link
                    className="flex gap-2 items-center hover:bg-blue-950 transition-colors ps-2 py-2 rounded-lg"
                    href="/courses"
                >
                    <BookOpen />
                    Course
                </Link>
                <Link
                    className="flex gap-2 items-center hover:bg-blue-950 transition-colors ps-2 py-2 rounded-lg"
                    href="/students"
                >
                    <User />
                    Student
                </Link>
            </nav>

            <main className="w-full bg-gray-50 p-10">{children}</main>
        </div>
    );
}
