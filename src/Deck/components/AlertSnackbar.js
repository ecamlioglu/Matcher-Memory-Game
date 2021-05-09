import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { withStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = (theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
});
class CustomizedSnackbars extends React.Component {
  constructor(props) {
    super(props);
    const openSnack = this.props.openSnack ?? false;
    this.state = {
      open: openSnack,
    };
    this.wrapper = React.createRef();
  }
  render() {
    const handleClick = () => {
      this.setState({ open: true });
    };

    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }

      this.setState({ open: false });
    };
    return (
      <div className={useStyles.root} ref={this.wrapper}>
        <Snackbar open={this.state.open ? handleClick : ""} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={this.props.severity}>
            {this.props.text}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
export default withStyles(useStyles)(CustomizedSnackbars);
