import { useActionState, useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import Input from "./Input";
import Button from "./Button";
import { SpinnerMini } from "./SpinnerMini";
import studentCreateForm from "../lib/studentCreateForm";

export default function StudentSidebar({ open, onClose, student }) {
    const [state, action, pending] = useActionState(studentCreateForm);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subjects, setSubjects] = useState([""]);

    // 🔑 Pre-fill form if student is passed (edit mode)
    useEffect(() => {
        if (student) {
            setName(student.name || "");
            setEmail(student.email || "");
            setSubjects(student.subject ? student.subject.split(" | ") : [""]);
        } else {
            setName("");
            setEmail("");
            setSubjects([""]);
        }
    }, [student, open]);

    const handleSubjectChange = (index, val) => {
        const updated = [...subjects];
        updated[index] = val;
        setSubjects(updated);
    };

    const addSubject = () => {
        if (subjects.length < 8) setSubjects([...subjects, ""]);
    };

    const removeSubject = (index) => {
        if (subjects.length > 1) {
            const updated = subjects.filter((_, i) => i !== index);
            setSubjects(updated);
        }
    };

    return (
        <div className="fixed inset-0 flex justify-end z-50 pointer-events-none">
            <div
                className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
                    open ? "opacity-100 pointer-events-auto" : "opacity-0"
                }`}
                onClick={onClose}
            />
            <div
                className={`bg-white w-1/5 h-full shadow-2xl p-6 flex flex-col transform transition-transform duration-300 ${
                    open ? "translate-x-0" : "translate-x-full"
                } pointer-events-auto`}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-semibold text-gray-600 mb-4 underline">
                    {student ? "Edit Student" : "Create Student"}
                </h2>

                <form action={action}>
                    <div className="flex flex-col flex-1 overflow-y-auto px-1">
                        {/* hidden input if editing */}
                        {student && (
                            <input type="hidden" name="id" value={student.id} />
                        )}

                        <Input
                            name="name"
                            label="Name"
                            value={name}
                            state={state}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter student name"
                        />
                        <Input
                            name="email"
                            label="Email"
                            value={email}
                            state={state}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                        />

                        <div className="flex flex-col mb-3">
                            <label className="text-sm font-semibold mb-1">
                                Subjects
                            </label>
                            {subjects.map((subj, index) => (
                                <div key={index}>
                                    <div className="flex items-center mb-2 gap-2">
                                        <input
                                            name="subjects"
                                            type="text"
                                            value={subj}
                                            onChange={(e) =>
                                                handleSubjectChange(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            className={`border ${
                                                state?.errors?.subjects
                                                    ? "border-red-500"
                                                    : "border-blue-100"
                                            } rounded-lg px-3 py-2 flex-1 focus:outline-none focus:ring focus:ring-blue-400`}
                                            placeholder={`Subject ${index + 1}`}
                                        />
                                        {subjects.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeSubject(index)
                                                }
                                                className="p-1 rounded hover:bg-gray-200 transition-colors"
                                            >
                                                <Minus className="h-4 w-4 text-gray-600" />
                                            </button>
                                        )}
                                    </div>
                                    {state?.errors?.subjects && (
                                        <p className="text-red-500 text-sm">
                                            {state?.errors?.subjects}
                                        </p>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addSubject}
                                disabled={subjects.length >= 8}
                                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="submit">
                            {pending ? <SpinnerMini /> : "Save"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
