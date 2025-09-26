export default async function studentCreateForm(state, formData) {
    const name = formData.get("name")?.trim() || "";
    const email = formData.get("email")?.trim() || "";
    const subjects = formData.getAll("subjects").map((s) => s.trim());
    const studentId = formData.get("id");

    const textRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors = {};

    if (!name || !textRegex.test(name)) {
        errors.name = "Name must only contain letters and spaces.";
    }

    if (!email || !emailRegex.test(email)) {
        errors.email = "Enter a valid email address.";
    }

    if (
        subjects.length === 0 ||
        subjects.some((subj) => !textRegex.test(subj))
    ) {
        errors.subjects =
            "Subjects must only contain letters and spaces (at least one required).";
    }

    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    const subject = subjects.join(" | ");

    const url = studentId ? `/students/${studentId}` : "/students";
    const method = studentId ? "PUT" : "POST";

    try {
        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document.querySelector(
                    'meta[name="csrf-token"]'
                ).content,
            },
            body: JSON.stringify({ name, email, subject }),
        });

        if (!res.ok) {
            return {
                errors: {
                    toast: studentId
                        ? "Failed to update student Info."
                        : "Failed to create Student.",
                },
            };
        }

        window.location.href = "/students";
    } catch (err) {
        return { errors: { toast: "Something went wrong." } };
    }
}
