import React, { Component } from "react";
import { Segment, Item, Button, List, Label, Feed } from "semantic-ui-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import Participants from "./Participants";
import { objectToArray } from "../../../app/Common/Util/Helpers";
import { withFirestore } from "react-redux-firebase";
import { connect } from "react-redux";
import distanceInWords from "date-fns/distance_in_words";
const mapState = state => ({
  auth: state.firebase.auth
});

class PostListItem extends Component {
  render() {
    const { post, auth } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size='tiny' circular src={post.hostPhotoURL} />
              <Item.Content>
                <Item.Header>{post.ticker}</Item.Header>
                <Item.Content>
                  Tiped by:
                  <Link to={`/profile/${post.hostUid}`}>{post.hostedBy}</Link>
                </Item.Content>

                <Item.Content>Catalyst {post.catalyst}</Item.Content>
                <Item.Description>Forcast: {post.forcast}</Item.Description>
                <Item.Description>
                  Catalyst Date:
                  {format(post.date.toDate(), " MMMM Do YYYY")}
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
                  <Feed.Date>
                    {distanceInWords(
                      post.created && post.created.toDate(),
                      Date.now()
                    )}
                    {"    "}
                    ago
                  </Feed.Date>
                  {/* {format(post.created.toDate(), "dddd MMM YYYY")}at{" "}
                  {format(post.created.toDate(), "h:mm a")} */}
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          {authenticated ? (
            <Button
              as={Link}
              to={`posts/${post.id}`}
              size='mini'
              color='teal'
              floated='right'
              content='View'
            />
          ) : null}
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
export default withFirestore(connect(mapState, null)(PostListItem));
