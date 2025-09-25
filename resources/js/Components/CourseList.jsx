import { FilePenLine, Trash } from "lucide-react";
import { useState } from "react";
import CourseModal from "./CourseModal";
import { useForm } from "@inertiajs/react";

export default function CourseList({ courses }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const { delete: destroy } = useForm();
    function deleteCourse(e, id) {
        e.preventDefault();
        destroy(`/courses/${id}`);
    }

    const openEditModal = (course) => {
        setSelectedCourse(course);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedCourse(null);
        setModalOpen(false);
    };
    return (
        <>
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
                                        <FilePenLine
                                            className="text-green-800 rounded-full hover:bg-green-400 p-2 h-10 w-10 cursor-pointer"
                                            onClick={() =>
                                                openEditModal(course)
                                            }
                                        />

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

            <CourseModal
                open={modalOpen}
                onClose={closeModal}
                course={selectedCourse}
            />
        </>
    );
}
