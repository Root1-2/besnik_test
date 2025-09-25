export default function InputField({
    label,
    value,
    onChange,
    readOnly = false,
    placeholder,
}) {
    return (
        <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1">{label}</label>
            <input
                type="text"
                value={value}
                onChange={onChange}
                readOnly={readOnly}
                placeholder={placeholder}
                className={`rounded-lg px-3 py-2 focus:outline-none mb-5
          ${
              readOnly
                  ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                  : "focus:ring focus:ring-blue-400"
          }`}
            />
        </div>
    );
}
