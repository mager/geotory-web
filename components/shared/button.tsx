import React from "react";

export default function Button({
  children,
  danger,
  disabled,
  isSubmit,
  onClick,
}: {
  children: React.ReactNode;
  isSubmit?: boolean;
  disabled?: boolean;
  danger?: boolean;
  onClick?: (e: React.FormEvent) => void;
}) {
  const bgColor = danger ? "bg-red-400" : "bg-green-400";
  const hoverBgColor = danger ? "hover:bg-red-500" : "hover:bg-green-500";
  const className = `rounded-lg ${bgColor} px-4 py-2 font-semibold text-white shadow-md ${hoverBgColor}`;

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
