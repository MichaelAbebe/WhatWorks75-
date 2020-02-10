import React, { Fragment } from "react";
import { Segment, Image, Item, Header, Button, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
// import format from "date-fns";
const postImageStyle = {
  filter: "brightness(30%)"
};

const postImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white"
};

const PostDetailHeader = ({
  post,
  isHost,
  isParticipating,
  participatingInPost,
  cancelParticipatingInPost,
  loading
}) => {
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: "0" }}>
        <Image src='/Assets/stock-chart.jpg' fluid style={postImageStyle} />

        <Segment basic style={postImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={post.ticker}
                  style={{ color: "white" }}
                />
                <p>
                  {/* {post.date && format(post.date.toDate(), "dddd MM YYYY")}at{" "}
                  {format(post.date.toDate(), "h:mm a")} */}
                </p>
                <p>{post.forcast}</p>
                <p>
                  Tipped By:
                  <Link
                    to={`/profile/${post.hostUid}`}
                    style={{ color: "white" }}
                  >
                    {post.hostedBy}
                  </Link>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached='bottom' clearing>
        {!isHost && !post.cancelled && (
          <Fragment>
            {isParticipating ? (
              <Button
                color='grey'
                onClick={() => cancelParticipatingInPost(post)}
              >
                Cancel Join{" "}
              </Button>
            ) : (
              <Button
                loading={loading}
                color='teal'
                onClick={() => participatingInPost(post)}
              >
                Join
              </Button>
            )}
          </Fragment>
        )}
        {post.cancelled && (
          <Label
            size='large'
            color='red'
            content='This tip has been cancelled'
          />
        )}
        {isHost && (
          <Button
            as={Link}
            to={`/manage/${post.id}`}
            color='orange'
            floated='right'
          >
            Edit Tip
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};
export default PostDetailHeader;
