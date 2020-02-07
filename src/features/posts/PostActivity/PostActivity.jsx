import React from "react";
import { Header, Segment, Feed, Sticky } from "semantic-ui-react";
import PostActivityItem from "./PostActivityItem";
const PostActivity = ({ activities, contextRef }) => {
  return (
    <Sticky context={contextRef} offset={94} styleElement={{ zindex: 0 }}>
      <Header attached='top' content='Recent Activity' />
      <Segment attached>
        <Feed>
          {activities &&
            activities.map(activity => (
              <PostActivityItem key={activity.id} activity={activity} />
            ))}
        </Feed>
      </Segment>
    </Sticky>
  );
};
export default PostActivity;
