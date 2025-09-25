export default function Input({
    name,
    label,
    value,
    state,
    onChange,
    readOnly = false,
    placeholder,
}) {
    const error = state?.errors?.[name];
    return (
        <div className="flex flex-col mb-5">
            <label className="text-sm font-semibold mb-1">{label}</label>
            <input
                name={name}
                type="text"
                value={value}
                onChange={onChange}
                readOnly={readOnly}
                placeholder={placeholder}
                className={`rounded-lg px-3 py-2 focus:outline-none border border-blue-100 ${
                    error ? "border-red-500" : "border-gray-300"
                }
          ${
              readOnly
                  ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                  : "focus:ring focus:ring-blue-400"
          }`}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}
