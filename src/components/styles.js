import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  loaderStyles: {
    textAlign: "center",
    marginTop: "45vh",
  },

  mt20: {
    marginTop: 20,
  },
  mb20: {
    marginBottom: 20,
  },
  font: {
    fontFamily: "Roboto",
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontSize: 20,
  },
  white: {
    color: "#fff",
    fontSize: 16,
  },
}));

export default useStyles;
