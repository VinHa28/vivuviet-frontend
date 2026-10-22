"use client";
import React from "react";
import clsx from "clsx";

const sizes = {
  sm: "h-[44px] min-w-[130px] px-[8px]",
  md: "min-w-[234px] h-[65px] px-[12px]",
  lg: "",
};

const variants = {
  default: "bg-primary",
  secondary:
    "bg-white border border-primary hover:bg-primary transition-colors duration-300",
};

const textColors = {
  default: "text-white",
  secondary: "text-primary group-hover:text-white transition-colors duration-300",
};

const base = ` relative rounded-md text-[18px] flex items-center justify-center overflow-hidden`;

const borderHoverClasses = `opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300`;

const Button = React.forwardRef(
  (
    {
      className,
      hoverable = true,
      variant = "default",
      size = "sm",
      disabled,
      loading = false,
      children,
      isButton = true,
        ...props
    },
    ref,
  ) => {
    const v = variants[variant] ? variant : "default";

    return (
      <button
        ref={ref}
        {...props}
        disabled={disabled || loading}
        className={clsx(
          sizes[size],
          variants[v],
          base,
          "group",
          className,
          hoverable && "cursor-pointer",
          isButton && "font-light",
          isButton && v === "default" && "hover:opacity-90",
          (disabled || loading) && "opacity-50 cursor-not-allowed",
        )}
      >
        {v === "default" && (
          <>
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
          </>
        )}
        <span
          className={`${textColors[v]} ${isButton ? "" : "font-script-1 text-[32px]"}`}
        >
          {children}
        </span>
      </button>
    );
  },
);
Button.displayName = "Button";
export default Button;
