import { Link } from "@inertiajs/react";

export default function Layout({ children }) {
    return (
        <div className="flex gap-10">
            <nav className="w-1/5 h-dvh bg-blue-900 rounded-e-lg shadow-2xl text-white p-5 flex flex-col gap-3 text-xl">
                <h1 className="text-3xl underline mb-5">Besnik Test</h1>
                <Link
                    className="hover:bg-blue-950 transition-colors ps-2 py-2"
                    href="/"
                >
                    Home
                </Link>
                <Link
                    className="hover:bg-blue-950 transition-colors ps-2 py-2"
                    href="/courses"
                >
                    Course
                </Link>
                <Link
                    className="hover:bg-blue-950 transition-colors ps-2 py-2"
                    href="/students"
                >
                    Student
                </Link>
            </nav>

            <main>{children}</main>
        </div>
    );
}
