import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  loaderStyles: {
    textAlign: "center",
    marginTop: "45vh"
  },

  mt20: {
    marginTop: 20
  },
  font: {
    fontFamily: "Roboto"
  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  white: {
    color: "#fff"
  }
}));

export default useStyles;
