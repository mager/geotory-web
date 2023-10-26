import { on } from "events";
import React from "react";

export default function Button({
  children,
  disabled,
  isSubmit,
  onClick,
}: {
  children: React.ReactNode;
  isSubmit?: boolean;
  disabled?: boolean;
  onClick?: (e: React.FormEvent) => void;
}) {
  const className = `rounded-lg bg-green-400 px-4 py-2 font-semibold text-white shadow-md hover:bg-green-600`;

  return (
    <button
      type={isSubmit ? "submit" : "button"}
      disabled={disabled}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
