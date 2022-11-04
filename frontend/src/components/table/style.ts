import { StyleObject } from "@c";
import { opacify } from "polished";

export const tableStyles: StyleObject = {
  table: (theme) => ({
    borderCollapse: "separate",
    border: `${theme.table.borderThickness} solid ${theme.colors.primary.code}`,
    borderRadius: `0 0 ${theme.table.roundness} ${theme.table.roundness}`,
  }),
  thead: (theme) => ({
    color: theme.colors.textColor(theme.colors.primary),
    backgroundColor: theme.colors.primary.code,
  }),
  caption: (theme) => ({
    backgroundColor: theme.colors.primary.code,
    color: theme.colors.textColor(theme.colors.primary),
    padding: theme.spacing(1),
    borderTop: `${theme.table.borderThickness} solid ${theme.colors.primary.code}`,
    borderLeft: `${theme.table.borderThickness} solid ${theme.colors.primary.code}`,
    borderRight: `${theme.table.borderThickness} solid ${theme.colors.primary.code}`,
    borderRadius: `${theme.table.roundness} ${theme.table.roundness} 0 0`,
  }),
};

export const rowStyles: StyleObject = {
  tr: (theme) => ({
    "&:nth-of-type(even)": {
      backgroundColor: opacify(-0.8, theme.colors.primary.code),
    },
  }),
};

export const columnsStyles: StyleObject = {
  th: (theme) => ({
    padding: theme.spacing(1),
    minWidth: theme.table.columnWidth,
    textAlign: "center",
  }),
  fit: {
    minWidth: "auto",
    whiteSpace: "nowrap",
  },
};

export const cellStyles: StyleObject = {
  td: (theme) => ({
    padding: theme.spacing(1),
    minWidth: theme.table.columnWidth,
  }),
  fit: {
    minWidth: "auto",
    whiteSpace: "nowrap",
  },
};
