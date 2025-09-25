import { useState } from "react";
import Button from "../Components/Button";
import CourseModal from "../Components/CourseModal";
import { FilePenLine, Plus, Trash } from "lucide-react";
import { useForm } from "@inertiajs/react";

export default function Course({ courses }) {
    const { delete: destroy } = useForm();

    function deleteCourse(e, id) {
        e.preventDefault();
        destroy(`/courses/${id}`);
    }

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

            <div className="mt-10 overflow-x-auto rounded-2xl shadow-lg border border-gray-200">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="px-6 py-3 text-gray-700">ID</th>
                            <th className="px-6 py-3 text-gray-700">Name</th>
                            <th className="px-6 py-3 text-gray-700">Slug</th>
                            <th className="px-6 py-3 text-gray-700">
                                Created At
                            </th>
                            <th className="px-6 py-3 text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses && courses.length > 0 ? (
                            courses.map((course) => (
                                <tr
                                    key={course.id}
                                    className="border-b border-b-gray-200 hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4">{course.id}</td>
                                    <td className="px-6 py-4">{course.name}</td>
                                    <td className="px-6 py-4">{course.slug}</td>
                                    <td className="px-6 py-4">
                                        {new Date(
                                            course.created_at
                                        ).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 flex gap-3">
                                        <FilePenLine className="text-green-800 rounded-full hover:bg-green-400 p-2 h-10 w-10" />
                                        <form
                                            onSubmit={(e) =>
                                                deleteCourse(e, course.id)
                                            }
                                        >
                                            <button type="submit">
                                                <Trash className="text-red-800 rounded-full hover:bg-red-400 p-2 h-10 w-10" />
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="px-6 py-4 text-center text-gray-500"
                                >
                                    No courses found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <CourseModal open={open} onClose={() => setOpen(false)} />
        </>
    );
}
