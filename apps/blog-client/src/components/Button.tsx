import type { ButtonHTMLAttributes } from "react";
import { styled } from "styled-components";

const StyledButton = styled.button({
  fontSize: "16px",
  padding: "10px 20px",
  borderRadius: "5px",
});

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children = "Button", ...props }: ButtonProps) => (
  <StyledButton {...props}>{children}</StyledButton>
);

export default Button;
