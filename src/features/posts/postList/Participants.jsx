import React, { Component } from "react";
import { List, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Participants extends Component {
  render() {
    const { participant } = this.props;
    return (
      <List.Item>
        <Image
          as={Link}
          to={`/profile/${participant.id}`}
          size='mini'
          circular
          src={participant.photoURL}
        />
      </List.Item>
    );
  }
}

export default Participants;
