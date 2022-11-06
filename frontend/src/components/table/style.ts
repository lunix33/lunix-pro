import { ThemeBreakpointsKeys } from "@emotion/react";
import { opacify } from "polished";
import { style } from "@t";

export const mobileBreakpoint: ThemeBreakpointsKeys = "medium";

export const tableStyles = style({
  table: (theme) => ({
    "&, & thead, & tbody, & tr, & td, & th, caption": {
      display: "block",
      [theme.breakpoints.up(mobileBreakpoint)]: {
        display: "revert",
      },
    },

    borderCollapse: "separate",
    border: `${theme.table.borderThickness} solid ${theme.colors.primary.code}`,
    borderRadius: theme.table.roundness,

    [theme.breakpoints.up(mobileBreakpoint)]: {
      borderRadius: `0 0 ${theme.table.roundness} ${theme.table.roundness}`,
    },
  }),
  thead: (theme) => ({
    position: "absolute",
    top: "-9999px",
    left: "-9999px",
    [theme.breakpoints.up(mobileBreakpoint)]: {
      position: "revert",
      top: "revert",
      left: "revert",
    },

    color: theme.colors.textColor(theme.colors.primary),
    backgroundColor: theme.colors.primary.code,
  }),
  caption: (theme) => ({
    backgroundColor: theme.colors.primary.code,
    color: theme.colors.textColor(theme.colors.primary),
    padding: theme.spacing(1),

    [theme.breakpoints.up(mobileBreakpoint)]: {
      borderTop: `${theme.table.borderThickness} solid ${theme.colors.primary.code}`,
      borderLeft: `${theme.table.borderThickness} solid ${theme.colors.primary.code}`,
      borderRight: `${theme.table.borderThickness} solid ${theme.colors.primary.code}`,
      borderRadius: `${theme.table.roundness} ${theme.table.roundness} 0 0`,
    },
  }),
  scroll: (theme) => ({
    [theme.breakpoints.up(mobileBreakpoint)]: {
      overflowX: "auto",
    },
  }),
});

export const emptyTableStyles = style({
  td: (theme) => ({
    padding: theme.spacing(1),
    textAlign: "center",
  }),
});

export const rowStyles = style({
  tr: (theme) => ({
    padding: `${theme.spacing(1)} ${theme.spacing(1)} 0 ${theme.spacing(1)}`,
    "&:nth-of-type(even)": {
      backgroundColor: opacify(-0.8, theme.colors.primary.code),
    },
  }),
});

export const columnsStyles = style({
  th: (theme) => ({
    padding: theme.spacing(1),
    minWidth: theme.table.columnWidth,
    textAlign: "center",
  }),
  fit: {
    minWidth: "auto",
    whiteSpace: "nowrap",
    width: "0%",
  },
});

export const cellStyles = style({
  td: (theme) => ({
    padding: `${theme.spacing(3)} 0 ${theme.spacing(1)} ${theme.spacing(1)}`,
    minWidth: theme.table.columnWidth,

    "&:before": {
      content: "attr(data-label)",
      float: "left",
      position: "relative",
      top: theme.spacing(-2.5),
      left: theme.spacing(-1),
      overflow: "visible",
      width: "0",
      whiteSpace: "nowrap",

      fontStyle: "italic",
    },

    [theme.breakpoints.up(mobileBreakpoint)]: {
      padding: theme.spacing(1),

      "&:before": {
        display: "none",
      },
    },
  }),
  noLabel: (theme) => ({
    padding: `0 0 ${theme.spacing(1)} 0`,
  }),
  hide: (theme) => ({
    [theme.breakpoints.down(mobileBreakpoint)]: {
      display: "none !important",
    },
  }),
  fit: (theme) => ({
    [theme.breakpoints.up(mobileBreakpoint)]: {
      minWidth: "auto",
      whiteSpace: "nowrap",
      width: "0%",
    },
  }),
});
