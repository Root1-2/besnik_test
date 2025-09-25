export default function studentCreateForm(state, formData) {
    const name = formData.get("name")?.trim() || "";
    const email = formData.get("email")?.trim() || "";
    const subjects = formData.getAll("subjects").map((s) => s.trim());

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
        return { ok: false, errors };
    }

    return {
        ok: true,
        data: {
            name,
            email,
            subjects,
        },
    };
}
