import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "../Components/Button";
import StudentSidebar from "../Components/StudentSidebar";

export default function Student() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className="w-full flex justify-between items-center rounded-2xl shadow-2xl border border-gray-200 backdrop-blur-xl p-6">
                <h1 className="text-xl font-semibold text-gray-600">
                    Student List
                </h1>
                <Button onClick={() => setOpen(true)}>
                    <Plus /> Create
                </Button>
            </div>

            <StudentSidebar open={open} onClose={() => setOpen(false)} />
        </>
    );
}
