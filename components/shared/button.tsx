import React from "react";

type Props = {
  children: React.ReactNode;
  isSubmit?: boolean;
  disabled?: boolean;
};

export default function Button({ children, disabled, isSubmit }: Props) {
  const className = `rounded-lg bg-green-400 px-4 py-2 font-semibold text-white shadow-md hover:bg-green-600`;

  return (
    <button
      type={isSubmit ? "submit" : "button"}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
}
