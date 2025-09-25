export default async function courseCreateForm(state, formData) {
    const name = formData.get("name")?.trim() || "";
    const slug = formData.get("slug");

    const nameRegex = /^[A-Za-z\s]+$/;
    const errors = {};

    if (!name || !nameRegex.test(name)) {
        errors.name = "Name must only contain letters and spaces.";
    }

    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    try {
        const res = await fetch("/courses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document.querySelector(
                    'meta[name="csrf-token"]'
                ).content,
            },
            body: JSON.stringify({ name, slug }),
        });

        if (!res.ok) {
            return { errors: { toast: "Failed to create course." } };
        }

        return { success: true };
    } catch (err) {
        return { errors: { toast: "Something went wrong." } };
    }
}
