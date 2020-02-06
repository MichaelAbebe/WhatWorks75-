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
import { withFirestore, firebaseConnect, isEmpty } from "react-redux-firebase";
import { compose } from "redux";
import {
  objectToArray,
  createDataTree
} from "../../../app/Common/Util/Helpers";
import { addPostComment } from "../PostAction";
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
  return {
    post,
    auth: state.firebase.auth,
    postChat:
      !isEmpty(state.firebase.data.post_chat) &&
      objectToArray(state.firebase.data.post_chat[ownProps.match.params.id])
  };
};

const actions = {
  participatingInPost,
  cancelParticipatingInPost,
  addPostComment
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
      cancelParticipatingInPost,
      addPostComment,
      postChat
    } = this.props;

    const participants =
      post && post.participants && objectToArray(post.participants);
    const isHost = post.hostUid === auth.uid;
    const chatTree = !isEmpty(postChat) && createDataTree(postChat);
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
            <PostDetailChat
              postChat={chatTree}
              addPostComment={addPostComment}
              postId={post.id}
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <PostDetailSidebar participants={participants} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default compose(
  withFirestore,
  connect(mapState, actions),
  firebaseConnect(props => [`post_chat/${props.match.params.id}`])
)(PostDetailsPage);
