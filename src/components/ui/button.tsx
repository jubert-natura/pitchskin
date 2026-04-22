import React from "react";
import { cn } from "../../lib/utils";
import "./button.css";

export type ButtonVariant = "primary" | "secondary" | "dark" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant. Primary = yellow CTA, used for all conversion actions. */
  variant?: ButtonVariant;
  /** Size preset — `md` is the default. */
  size?: ButtonSize;
  /** Stretch to fill the parent's inline-size. */
  block?: boolean;
  /** Render as a child element (e.g. a link) while keeping button styles. */
  asChild?: boolean;
}

/**
 * Pitch Skin primary interactive primitive.
 *
 * ```tsx
 * <Button variant="primary" size="lg">Shop Now</Button>
 * <Button variant="secondary">Learn More</Button>
 * <Button variant="ghost">Skip</Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      block = false,
      className,
      type = "button",
      children,
      ...rest
    },
    ref
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "ps-btn",
          `ps-btn--${variant}`,
          `ps-btn--${size}`,
          block && "ps-btn--block",
          className
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
