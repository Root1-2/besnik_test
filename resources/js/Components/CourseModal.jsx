import { useState } from "react";
import InputField from "./Input";
import Button from "./Button";

export default function CourseModal({ open, onClose }) {
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");

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
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl w-96 p-6"
            >
                <h2 className="text-lg font-bold mb-4">Create Course</h2>
                <form>
                    <InputField
                        label="Name"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Enter course name"
                    />

                    <InputField label="Slug" value={slug} readOnly />

                    <div className="flex justify-end gap-3 mt-4">
                        <Button hover="red" onClick={onClose}>
                            Cancel
                        </Button>

                        <Button hover="blue" type="submit">
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
