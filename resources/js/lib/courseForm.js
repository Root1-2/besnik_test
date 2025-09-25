export default async function courseForm(state, formData) {
    const name = formData.get("name")?.trim() || "";
    const slug = formData.get("slug");
    const courseId = formData.get("id");

    const errors = {};
    const nameRegex = /^[A-Za-z\s]+$/;

    if (!name || !nameRegex.test(name)) {
        errors.name = "Name must only contain letters and spaces.";
    }

    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    const url = courseId ? `/courses/${courseId}` : "/courses";
    const method = courseId ? "PUT" : "POST";

    try {
        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document.querySelector(
                    'meta[name="csrf-token"]'
                ).content,
            },
            body: JSON.stringify({ name, slug }),
        });

        if (!res.ok) {
            return {
                errors: {
                    toast: courseId
                        ? "Failed to update course."
                        : "Failed to create course.",
                },
            };
        }

        window.location.href = "/courses";
    } catch (err) {
        return { errors: { toast: "Something went wrong." } };
    }
}
