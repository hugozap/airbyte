import React from "react";

type ButtonSize = "xs" | "sm" | "lg";
export type ButtonVariant = "primary" | "secondary" | "danger" | "light" | "clear" | "dark";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  clickable?: boolean;
  full?: boolean;
  icon?: React.ReactElement;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
  wasActive?: boolean;
  width?: number;
}
