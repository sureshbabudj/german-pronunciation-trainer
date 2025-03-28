import React from "react";

const IconButton = ({
  children,
  shape = "rectangle", // rectangle | rounded | roundedRectangle | triangle | bubble
  outline = false, // true for outline mode
  disabled = false, // Disabled state
  isActive = false, // Active state
  className = "",
  ...props // Pass all SVG props
}) => {
  const baseClasses = `
    flex justify-center items-center p-2 transition-colors duration-200
    ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
  `;

  const shapeClasses = {
    rectangle: "rounded-none",
    rounded: "rounded-full",
    roundedRectangle: "rounded-lg",
    triangle: "clip-path-triangle", // Custom clip-path for triangle
    bubble: "rounded-xl px-4 py-2",
  };

  const activeClasses = isActive ? `
    active:scale-95 active:shadow-none
  ` : '';

  const outlineClasses = outline
    ? "border-2 bg-transparent hover:border-gray-300 active:border-gray-500"
    : "hover:bg-gray-200 active:bg-gray-500";

  const svgClasses = `
    ${disabled ? "fill-gray-400" : outline ? "fill-gray-900" : "fill-gray-900"}
    transition-colors
  `;

  return (
    <button
      className={`${baseClasses} ${shapeClasses[shape]} ${outlineClasses} ${svgClasses} ${activeClasses} ${className} `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;
