import React from "react";
import "./Card.css";
class Card extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  render() {
    let content;
    if (this.props.faceUp) {
      content = this.props.content;
    } else {
      content = "";
    }
    return (
      <div className={`Card ${this.props.faceUp ? "face-up" : ""}`} onClick={this.props.flipOver}>
        {content}
      </div>
    );
  }
}

export default Card;
