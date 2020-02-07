import React, { Component } from "react";
import { Feed } from "semantic-ui-react";
import { Link } from "react-router-dom";
import distanceInWords from "date-fns/distance_in_words";
class PostActivityItem extends Component {
  renderSummary = activity => {
    switch (activity.type) {
      case "newPost":
        return (
          <div>
            New Tip!{" "}
            <Feed.User
              as={Link}
              to={{ pathname: "/profile/" + activity.hostUid }}
            >
              {activity.hostedBy}
            </Feed.User>{" "}
            has tiped{" "}
            <Link to={{ pathname: "/posts/" + activity.postId }}>
              {activity.ticker}
            </Link>{" "}
            <p>
              for {activity.catalyst} coming up in{" "}
              {distanceInWords(
                activity.catalystDate && activity.catalystDate.toDate(),
                Date.now()
              )}
            </p>
          </div>
        );
      case "cancelledPost":
        return (
          <div>
            Tip Cancelled!{" "}
            <Feed.User
              as={Link}
              to={{ pathname: "/profile/" + activity.hostUid }}
            >
              {activity.hostedBy}
            </Feed.User>{" "}
            has cancelled{" "}
            <Link to={{ pathname: "/posts/" + activity.postId }}>
              {activity.ticker}
            </Link>
          </div>
        );
      default:
        return;
    }
  };
  render() {
    const { activity } = this.props;

    return (
      <Feed.Event>
        <Feed.Label>
          <img src={activity.photoURL || "/Assets/user.png"} alt='' />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>{this.renderSummary(activity)}</Feed.Summary>
          <Feed.Meta>
            <Feed.Date>
              {distanceInWords(
                activity.timestamp && activity.timestamp.toDate(),
                Date.now()
              )}
              ago
            </Feed.Date>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    );
  }
}

export default PostActivityItem;