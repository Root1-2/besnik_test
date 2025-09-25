import { useState } from "react";
import { Plus } from "lucide-react";
import CourseList from "../Components/CourseList";
import Button from "../Components/Button";
import CourseModal from "../Components/CourseModal";

export default function Course({ courses }) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className="w-full flex justify-between items-center rounded-2xl shadow-2xl border border-gray-200 backdrop-blur-xl p-6">
                <h1 className="text-xl font-semibold text-gray-600">
                    Course List
                </h1>
                <Button onClick={() => setOpen(true)} name="Create">
                    <Plus /> Create
                </Button>
            </div>

            <CourseList courses={courses} />

            <CourseModal open={open} onClose={() => setOpen(false)} />
        </>
    );
}
