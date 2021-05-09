import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class AlertDialog extends React.Component {
  constructor(props) {
    super(props);
    const openDialog = this.props.open ?? false;
    this.state = {
      open: openDialog,
    };
    this.wrapper = React.createRef();
  }
  render() {
    const handleClickOpen = () => {
      this.setState({ open: true });
    };
    const handleClose = () => {
      this.setState({ open: false });
    };
    function restart() {
      window.location.reload(false);
    }

    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          {this.props.title}
        </Button>
        <Dialog
          ref={this.wrapper}
          open={this.state.open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">{this.props.description}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Hayır
            </Button>
            <Button onClick={restart} color="primary" autoFocus>
              Evet
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
