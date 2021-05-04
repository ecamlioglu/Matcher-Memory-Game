import React from "react";
import "./Card.css";
class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      faceUp: false,
    };
  }
  flipOver() {
    this.setState({ faceUp: !this.state.faceUp });
    console.log("flipped");
  }
  render() {
    let content;
    if(this.state.faceUp){
      content = this.props.content;
    }else{
      content = 'back';
    }
    return (
      <div className="Card" onClick={this.flipOver.bind(this)}>
        {content}
      </div>
    );
  }
}

export default Card;
