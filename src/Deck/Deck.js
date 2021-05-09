import React from "react";
import Countdown, { zeroPad } from "react-countdown";
import Card from "../Card/Card";
import "./Deck.css";
import AlertSnackBar from "./components/AlertSnackbar";
import AlertDialog from "./components/AlertDialog";

const Completionist = () => <span>You are good to go!</span>;
var isTimerComplete = false;
// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
  isTimerComplete = completed;
  if (completed) {
    // Render a complete state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <span>
        {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
      </span>
    );
  }
};
class Deck extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    const items = ["🥸", "😎", "🤪", "😍"];
    const deck = items
      .concat(items)
      .sort(() => Math.random() - 0.5)
      .map((i) => {
        return {
          content: i,
          faceUp: false,
        };
      });
    const size = this.props.levelCount;
    this.state = {
      deck: deck,
      firstCard: null,
      divDisable: false,
      date: Date.now() + 10000,
      deckMatchSize: size,
      matchedSize: 0,
      gameOver: null,
    };
  }

  wrongMatch(cardIndex) {
    this.setState({
      deck: this.state.deck.map((card, index) => {
        if (index === cardIndex) {
          return {
            content: card.content,
            faceUp: !card.faceUp,
          };
        } else {
          return card;
        }
      }),
      matchedTemp: false,
      unMatchedTemp: false,
    });
  }
  flipOver(cardIndex) {
    if (this.state.firstCard === null) {
      this.setState({ firstCard: cardIndex });
    } else {
      const firstCardContent = this.state.deck[this.state.firstCard].content;
      const secondCardContent = this.state.deck[cardIndex].content;
      this.setState({ divDisable: true });
      if (firstCardContent === secondCardContent) {
        setTimeout(() => {
          this.setState({
            firstCard: null,
            divDisable: false,
            matchedTemp: true,
            matchedSize: this.state.matchedSize + 1,
          });
        }, 500);
      } else {
        setTimeout(() => {
          this.wrongMatch(this.state.firstCard);
          this.wrongMatch(cardIndex);
          this.setState({ firstCard: null, divDisable: false, unMatchedTemp: true });
        }, 2000);
      }
    }
    this.isGameOver();
    this.wrongMatch(cardIndex);
  }

  async isGameOver() {
    if (isTimerComplete || this.state.deckMatchSize === this.state.matchedSize) {
      this.setState({ deck: null, gameOver: true });
    }
  }

  render() {
    return (
      <div className="Container">
        {!(this.state.gameOver === true) ? (
          <div className="Deck" disabled={this.state.divDisable}>
            {this.state.deck.map((i, index) => {
              return (
                <Card
                  content={i.content}
                  faceUp={i.faceUp}
                  flipOver={() => {
                    this.flipOver(index);
                  }}
                />
              );
            })}
          </div>
        ) : (
          ""
        )}
        <Countdown date={this.state.date} renderer={renderer} />
        {this.state.matchedTemp ? <AlertSnackBar openSnack={true} text={"Doğru :)"} severity={"success"} /> : ""}
        {this.state.unMatchedTemp ? <AlertSnackBar openSnack={true} text={"Yanlış :("} severity={"warning"} /> : ""}
        {this.state.gameOver ? <AlertSnackBar openSnack={true} text={"Oyun Bitti"} severity={"success"} /> : ""}
        <AlertDialog title="deneme" description="deneme" />
        <span>
          Eşleşme Sayısı: {this.state.matchedSize ?? 0} / {this.state.deckMatchSize}
        </span>
      </div>
    );
  }
}

export default Deck;
