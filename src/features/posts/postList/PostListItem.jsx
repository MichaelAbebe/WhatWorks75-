import React, { Component } from "react";
import { Segment, Item, Icon, Button, List, Label } from "semantic-ui-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import Participants from "./Participants";
import { objectToArray } from "../../../app/Common/Util/Helpers";
import { withFirestore } from "react-redux-firebase";
class PostListItem extends Component {
  render() {
    const { post } = this.props;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size='tiny' circular src={post.hostPhotoURL} />

              <Item.Content>
                <Item.Header as={Link} to={`/posts/${post.id}`}>
                  {post.ticker}
                </Item.Header>
                <br />
                <Item.Description>
                  Tiped by:
                  <Link to={`/profile/${post.hostUid}`}>{post.hostedBy}</Link>
                </Item.Description>
                <Item.Description>Catalyst {post.catalyst}</Item.Description>
                <Item.Description>Forcast: {post.forcast}</Item.Description>
                <Item.Description>
                  Catalyst Date:{format(post.date.toDate(), "dddd MMM YYYY")}
                </Item.Description>
                {post.cancelled && (
                  <Label
                    style={{ top: "-110px" }}
                    ribbon='right'
                    color='red'
                    content='This post has been canceled'
                  />
                )}
                <Item.Description>
                  <Button
                    as={Link}
                    to={`posts/${post.id}`}
                    size='mini'
                    color='teal'
                    floated='right'
                    content='View'
                  />
                  <Icon name='clock' />
                  {format(post.created.toDate(), "dddd MMM YYYY")}at{" "}
                  {format(post.created.toDate(), "h:mm a")}
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>{post.description} </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {post.participants &&
              objectToArray(post.participants).map(participant => (
                <Participants key={participant.id} participant={participant} />
              ))}
          </List>
        </Segment>
      </Segment.Group>
    );
  }
}
export default withFirestore(PostListItem);
