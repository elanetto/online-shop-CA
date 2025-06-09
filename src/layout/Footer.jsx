import { EyeOff } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-neutral-800 text-white flex flex-col items-center justify-center py-20 w-full">
      <p className="text-center flex items-center gap-2">
        <EyeOff size={16} /> Why are you looking at this footer?
      </p>
    </footer>
  );
}
