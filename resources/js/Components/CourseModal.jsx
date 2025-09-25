import { useActionState, useState, useEffect } from "react";
import { SpinnerMini } from "./SpinnerMini";
import Input from "./Input";
import Button from "./Button";
import courseForm from "../lib/courseForm";

export default function CourseModal({ open, onClose, course }) {
    const isEdit = !!course;

    const [state, action, pending] = useActionState(courseForm);

    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");

    useEffect(() => {
        if (isEdit) {
            setName(course.name || "");
            setSlug(course.slug || "");
        } else {
            setName("");
            setSlug("");
        }
    }, [course, isEdit]);

    // Slug generator
    const makeSlug = (val) =>
        val
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");

    const handleNameChange = (e) => {
        const val = e.target.value;
        setName(val);
        setSlug(makeSlug(val));
    };

    if (!open) return null;

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl w-96 p-6"
            >
                <h2 className="text-lg font-bold mb-4">
                    {isEdit ? "Edit Course" : "Create Course"}
                </h2>
                <form action={action}>
                    <Input
                        label="Name"
                        name="name"
                        value={name}
                        state={state}
                        onChange={handleNameChange}
                        placeholder="Enter course name"
                    />

                    <Input name="slug" label="Slug" value={slug} readOnly />

                    {isEdit && (
                        <input type="hidden" name="id" value={course.id} />
                    )}

                    <div className="flex justify-end gap-3 mt-4">
                        <Button hover="red" onClick={onClose}>
                            Cancel
                        </Button>

                        <Button hover="blue" type="submit">
                            {pending ? <SpinnerMini /> : "Save"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
