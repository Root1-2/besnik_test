import { Plus } from "lucide-react";

export default function Button({ type = "button", onClick, children }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className="flex items-center rounded-2xl hover:bg-gray-400 px-3 py-2 transition-colors cursor-pointer"
        >
            {children}
        </button>
    );
}
