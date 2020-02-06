import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import {
  participatingInPost,
  cancelParticipatingInPost
} from "../../user/UserActions";
import PostDetailHeader from "./PostDetailHeader";
import PostDetailInfo from "./PostDetailInfo";
import PostDetailChat from "./PostDetailChat";
import PostDetailSidebar from "./PostDetailSidebar";
import { withFirestore } from "react-redux-firebase";
import { objectToArray } from "../../../app/Common/Util/Helpers";

const mapState = (state, ownProps) => {
  const postId = ownProps.match.params.id;

  let post = {};

  if (
    state.firestore.ordered.posts &&
    state.firestore.ordered.posts.length > 0
  ) {
    post =
      state.firestore.ordered.posts.filter(post => post.id === postId)[0] || {};
  }
  return { post, auth: state.firebase.auth };
};

const actions = {
  participatingInPost,
  cancelParticipatingInPost
};

class PostDetailsPage extends Component {
  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`posts/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`posts/${match.params.id}`);
  }
  render() {
    const {
      post,
      auth,
      participatingInPost,
      cancelParticipatingInPost
    } = this.props;

    const participants =
      post && post.participants && objectToArray(post.participants);
    const isHost = post.hostUid === auth.uid;

    const isParticipating =
      participants && participants.some(a => a.id === auth.uid);
    return (
      <div>
        <Grid>
          <Grid.Column width={10}>
            <PostDetailHeader
              post={post}
              isHost={isHost}
              isParticipating={isParticipating}
              participatingInPost={participatingInPost}
              cancelParticipatingInPost={cancelParticipatingInPost}
            />
            <PostDetailInfo post={post} />
            <PostDetailChat />
          </Grid.Column>
          <Grid.Column width={6}>
            <PostDetailSidebar participants={participants} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default withFirestore(connect(mapState, actions)(PostDetailsPage));
