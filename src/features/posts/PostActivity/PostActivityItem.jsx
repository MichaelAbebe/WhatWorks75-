import React, { Component } from "react";
import { Feed, Label } from "semantic-ui-react";
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
      case "updatedPost":
        return (
          <div>
            {" "}
            <Feed.User
              as={Link}
              to={{ pathname: "/profile/" + activity.hostUid }}
            >
              {activity.hostedBy}
            </Feed.User>{" "}
            has Updated{" "}
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
            <Feed.Summary>
              {activity.updated && (
                <Label
                  style={{ top: "-20px", left: "270px" }}
                  size='tiny'
                  color='blue'
                  tag
                >
                  Updated
                </Label>
              )}
              {activity.cancelled && (
                <Label
                  style={{ top: "-20px", left: "270px" }}
                  size='tiny'
                  color='blue'
                  tag
                >
                  Updated
                </Label>
              )}
            </Feed.Summary>
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
