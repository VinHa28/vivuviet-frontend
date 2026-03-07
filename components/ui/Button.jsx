"use client";
import React from "react";
import clsx from "clsx";

const sizes = {
  sm: "h-[44px] min-w-[130px] px-[8px]",
  md: "min-w-[234px] h-[65px] px-[12px]",
  lg: "",
};

const variants = {
  default: "",
  secondary: "",
};

const base = ` relative bg-primary  rounded-md text-[18px] flex items-center justify-center overflow-hidden`;

const borderHoverClasses = `opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300`;

const Button = React.forwardRef(
  (
    {
      className,
      hoverable = true,
      variant,
      size = "sm",
      disabled,
      loading = false,
      children,
      isButton = true,
      onClick = () => {},
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          sizes[size],
          variants[variant],
          base,
          "group",
          className,
          hoverable ? "cursor-pointer" : "",
          isButton ? "hover:opacity-90 font-light" : "",
          
        )}
        onClick={onClick}
      >
        <div
          className={`absolute -top-px -left-px w-3 h-3 border border-secondary ${hoverable ? borderHoverClasses : ""}`}
        ></div>
        <div
          className={`absolute -right-px -top-px w-3 h-3 border border-secondary ${hoverable ? borderHoverClasses : ""}`}
        ></div>
        <div
          className={`absolute -right-px -bottom-px w-3 h-3 border border-secondary ${hoverable ? borderHoverClasses : ""}`}
        ></div>
        <div
          className={`absolute -left-px -bottom-px w-3 h-3 border border-secondary ${hoverable ? borderHoverClasses : ""}`}
        ></div>
        <span
          className={`absolute inset-1 border border-secondary pointer-events-none ${hoverable ? borderHoverClasses : ""}`}
        />
        <span
          className={`text-white ${isButton ? "" : "font-script-1 text-[32px]"}`}
        >
          {children}
        </span>
      </button>
    );
  },
);
Button.displayName = "Button";
export default Button;
