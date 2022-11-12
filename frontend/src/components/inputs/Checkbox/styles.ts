import { makeStyles } from "@t";

export const useStyles = makeStyles({
  label: (theme) => ({
    display: "inline-grid",
    gridTemplateColumns: "1em auto",
    gap: theme.spacing(1),
    cursor: "pointer",

    color: "red",

    "& input": {
      display: "grid",
      placeContent: "center",

      cursor: "pointer",
      appearance: "none",
      margin: 0,
      width: "1.15em",
      height: "1.15em",
      border: "0.15em solid currentColor",
      borderRadius: ".35em",

      font: "inherit",
      color: "currentColor",
      //backgroundColor: "hsla(0deg, 0%, 30%, 0.25)",
      transition: "250ms background-color ease-in-out",

      "&:hover, &:focus": {
        backgroundColor: "hsla(0deg, 0%, 30%, 0.15)",
      },

      "&:before": {
        content: '""',
        width: "0.65em",
        height: "0.65em",
        clipPath:
          "polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%)",
        opacity: 0,
        transition: "250ms opacity ease-in-out",
        boxShadow: "inset 1em 1em currentColor",
        backgroundColor: "CanvasText",
      },

      "&:checked:before": {
        opacity: 1,
      },
    },
  }),
});
