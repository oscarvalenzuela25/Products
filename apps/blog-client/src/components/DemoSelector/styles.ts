import { styled } from "styled-components";
import theme from "../../styles/theme";

export const SelectorContainer = styled.div({
  position: "fixed",
  zIndex: 100,
  top: "6px",
  right: "12px",
  display: "flex",
  minHeight: "34px",
  alignItems: "center",
  gap: "8px",
  border: `1px solid ${theme.grey[700]}`,
  borderRadius: "999px",
  padding: "4px 6px 4px 11px",
  backgroundColor: theme.grey[900],
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.18)",
  color: theme.text.inverse,
  fontFamily: '"Plus Jakarta Sans", sans-serif',
  transition: "box-shadow 160ms ease, transform 160ms ease",

  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: "0 10px 28px rgba(0, 0, 0, 0.24)",
  },

  "@media (max-width: 640px)": {
    right: "6px",
  },

  "@media (prefers-reduced-motion: reduce)": {
    transition: "none",
  },
});

export const SelectorLabel = styled.label({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  color: theme.grey[300],
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.1em",
  lineHeight: 1,
  textTransform: "uppercase",

  "&::before": {
    content: '""',
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: theme.success.main,
    boxShadow: `0 0 0 3px ${theme.success.light}`,
  },

  "@media (max-width: 480px)": {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    border: 0,
  },
});

export const SelectWrapper = styled.div({
  position: "relative",
  display: "flex",
  alignItems: "center",

  "&::after": {
    content: '"⌄"',
    position: "absolute",
    right: "10px",
    top: "50%",
    color: theme.grey[600],
    fontSize: "13px",
    lineHeight: 1,
    pointerEvents: "none",
    transform: "translateY(-58%)",
  },
});

export const Select = styled.select({
  minWidth: "142px",
  minHeight: "26px",
  appearance: "none",
  border: 0,
  borderRadius: "999px",
  padding: "5px 28px 5px 11px",
  backgroundColor: theme.background.default,
  color: theme.text.primary,
  cursor: "pointer",
  fontSize: "11px",
  fontWeight: 700,
  lineHeight: 1.2,

  "&:focus-visible": {
    outline: `3px solid ${theme.primary[200]}`,
    outlineOffset: "2px",
  },

  "@media (max-width: 480px)": {
    minWidth: "128px",
  },
});
