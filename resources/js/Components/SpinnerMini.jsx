import { LoaderCircle } from "lucide-react";

export function SpinnerMini() {
    return (
        <div className="flex justify-center items-center h-5 w-5 animate-spin">
            <LoaderCircle color="black" className="h-full w-full" />
        </div>
    );
}
