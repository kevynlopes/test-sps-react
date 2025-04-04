import React from "react";
import "../styles.css";

export default function Button({
  children,
  type,
  className,
  onClick,
  disabled,
}) {
  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
