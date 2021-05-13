import "./App.css";
import Deck from "./Deck/Deck";
import AlertSnackBar from "./Deck/components/AlertSnackbar";
import React from "react";
import { Button } from "@material-ui/core";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      levelCounter: 0
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">Matcher</header>
        <div className="Container">
          {
            this.state.levelCounter === 0 ? (
              <>
                <span>
                  Oynamak istediğiniz seviyeyi seçiniz.
              </span>
                <div className="Buttons">

                  <Button onClick={() => { this.setState({ levelCounter: 1 }) }} variant="contained" color="primary">Kolay</Button>
                  <Button onClick={() => { this.setState({ levelCounter: 2 }) }} variant="contained" color="primary">Orta</Button>
                  <Button onClick={() => { this.setState({ levelCounter: 3 }) }} variant="contained" color="primary">Zor</Button>
                </div>
              </>
            ) : (<>
              <Deck levelCount={this.state.levelCounter} />
              <AlertSnackBar openSnack={true} text={"Oyun Başladı"} severity={"success"}></AlertSnackBar> </>)
          }

        </div>
      </div>
    );
  }
}
export default App;