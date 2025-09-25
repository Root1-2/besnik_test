export default function courseCreateForm(state, formData) {
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
}
