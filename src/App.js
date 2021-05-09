import "./App.css";
import Deck from "./Deck/Deck";
import AlertSnackBar from "./Deck/components/AlertSnackbar";
export default function App() {
  return (
    <div className="App">
      <header className="App-header">Matcher</header>
      <div className="Container">
        <AlertSnackBar openSnack={true} text={"Oyun Başladı"} severity={"success"}></AlertSnackBar>
        <Deck levelCount={4} />
      </div>
    </div>
  );
}
