import React, { Fragment } from "react";
import { Segment, Item, Label, ItemImage } from "semantic-ui-react";
import { Link } from "react-router-dom";

const PostDetailSidebar = ({ participants }) => {
  const isHost = false;

  return (
    <Fragment>
      <Segment
        textAlign='center'
        style={{ border: "none" }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        {participants && participants.length}{" "}
        {participants && participants.length === 1 ? "Person" : "People"}{" "}
        Participating
      </Segment>
      <Segment attached>
        <Item.Group divided>
          {participants &&
            participants.map(participant => (
              <Item key={participant.id} style={{ position: "relative" }}>
                {isHost && (
                  <Label
                    style={{ position: "absolute" }}
                    color='orange'
                    ribbon='right'
                  >
                    Host
                  </Label>
                )}
                <ItemImage size='mini' src={participant.photoURL} />
                <Item.Content verticalAlign='middle'>
                  <Item.Header as='h5'>
                    <Link to={`/profile/${participant.id}`}>
                      {participant.displayName}
                    </Link>{" "}
                  </Item.Header>
                </Item.Content>
              </Item>
            ))}
        </Item.Group>
      </Segment>
    </Fragment>
  );
};
export default PostDetailSidebar;
