import { FilePenLine, Trash } from "lucide-react";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import StudentSidebar from "./StudentSidebar";

export default function StudentList({ students }) {
    const { delete: destroy } = useForm();
    function deleteStudent(e, id) {
        e.preventDefault();
        destroy(`/students/${id}`);
    }

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);

    function openEditSidebar(student) {
        setEditingStudent(student);
        setSidebarOpen(true);
    }

    return (
        <>
            <div className="mt-10 overflow-x-auto rounded-2xl shadow-lg border border-gray-200">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="px-6 py-3 text-gray-700">ID</th>
                            <th className="px-6 py-3 text-gray-700">Name</th>
                            <th className="px-6 py-3 text-gray-700">Email</th>
                            <th className="px-6 py-3 text-gray-700">
                                Subjects
                            </th>
                            <th className="px-6 py-3 text-gray-700">
                                Created At
                            </th>
                            <th className="px-6 py-3 text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students && students.length > 0 ? (
                            students.map((student) => (
                                <tr
                                    key={student.id}
                                    className="border-b border-b-gray-200 hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4">{student.id}</td>
                                    <td className="px-6 py-4">
                                        {student.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {student.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {student.subject}
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(
                                            student.created_at
                                        ).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 flex gap-3">
                                        <FilePenLine
                                            className="text-green-800 rounded-full hover:bg-green-400 p-2 h-10 w-10 cursor-pointer"
                                            onClick={() =>
                                                openEditSidebar(student)
                                            }
                                        />

                                        <form
                                            onSubmit={(e) =>
                                                deleteStudent(e, student.id)
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

            <StudentSidebar
                open={sidebarOpen}
                onClose={() => {
                    setSidebarOpen(false);
                    setEditingStudent(null);
                }}
                student={editingStudent}
            />
        </>
    );
}
