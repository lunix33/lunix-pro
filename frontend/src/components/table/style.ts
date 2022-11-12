import { ThemeBreakpointsKeys } from "@emotion/react";
import { opacify } from "polished";
import { makeStyles } from "@t";

export const mobileBreakpoint: ThemeBreakpointsKeys = "medium";

export const useTableStyles = makeStyles({
  table: (theme) => ({
    [theme.breakpoints.down(mobileBreakpoint)]: {
      "&, & thead, & tbody, & tr, & td, & th, caption, tfoot": {
        display: "block",
      },
    },

    borderCollapse: "separate",
    border: `${theme.table.borderThickness} solid ${theme.colors.primary.code}`,
    borderRadius: theme.table.roundness,

    [theme.breakpoints.up(mobileBreakpoint)]: {
      borderRadius: `0 0 ${theme.table.roundness} ${theme.table.roundness}`,
    },
  }),
  headers: (theme) => ({
    [theme.breakpoints.down(mobileBreakpoint)]: {
      position: "absolute",
      top: "-9999px",
      left: "-9999px",
    },
  }),
  headContent: (theme) => ({
    padding: theme.spacing(1),
  }),
  thead: (theme) => ({
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

export const useEmptyTableStyles = makeStyles({
  td: (theme) => ({
    padding: theme.spacing(1),
    textAlign: "center",
  }),
});

export const useRowStyles = makeStyles({
  tr: (theme) => ({
    padding: `${theme.spacing(1)} ${theme.spacing(1)} 0 ${theme.spacing(1)}`,
    "&:nth-of-type(even)": {
      backgroundColor: opacify(-0.8, theme.colors.primary.code),
    },
  }),
});

export const useColumnsStyles = makeStyles({
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

export const useCellStyles = makeStyles({
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

export const usePagerStyles = makeStyles({
  tfoot: (theme) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(1),
    padding: theme.spacing(1),
    backgroundColor: theme.colors.primary.code,
    color: theme.colors.textColor(theme.colors.primary),

    "& a": {
      color: theme.colors.textColor(theme.colors.primary),
    },
  }),
});
