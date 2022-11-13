import { makeStyles } from "@t";

export const useStyles = makeStyles({
  actions: (theme) => ({
    display: "flex",
    flexDirection: "row",
    gap: theme.spacing(1),
  }),
});
