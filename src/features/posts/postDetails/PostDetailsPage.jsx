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
import { openModal } from "../../Modals/ModalAction";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import NotFound from "../../../app/layout/NotFound";
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
    requesting: state.firestore.status.requesting,
    loading: state.async.loading,
    auth: state.firebase.auth,
    postChat:
      !isEmpty(state.firebase.data.post_chat) &&
      objectToArray(state.firebase.data.post_chat[ownProps.match.params.id])
  };
};

const actions = {
  participatingInPost,
  cancelParticipatingInPost,
  addPostComment,
  openModal
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
      openModal,
      post,
      auth,
      participatingInPost,
      cancelParticipatingInPost,
      addPostComment,
      postChat,
      loading,
      requesting,
      match
    } = this.props;

    const participants =
      post && post.participants && objectToArray(post.participants);
    // .sort((a, b) => {
    //   return a.joinDate.toDate() - b.joinDate;
    // });
    const isHost = post.hostUid === auth.uid;
    const chatTree = !isEmpty(postChat) && createDataTree(postChat);
    const isParticipating =
      participants && participants.some(a => a.id === auth.uid);
    const autheniticated = auth.isLoaded && !isEmpty;
    const loadingpost = requesting[`posts/${match.params.id}`];

    if (loadingpost) return <LoadingComponent />;
    if (Object.keys(post).length === 0) return <NotFound />;
    return (
      <div>
        <Grid>
          <Grid.Column width={10}>
            <PostDetailHeader
              loading={loading}
              post={post}
              isHost={isHost}
              isParticipating={isParticipating}
              participatingInPost={participatingInPost}
              cancelParticipatingInPost={cancelParticipatingInPost}
              autheniticated={autheniticated}
              openModal={openModal}
            />
            <PostDetailInfo post={post} />
            {isParticipating ? (
              <PostDetailChat
                postChat={chatTree}
                addPostComment={addPostComment}
                postId={post.id}
              />
            ) : null}
            {/* <PostDetailChat
              postChat={chatTree}
              addPostComment={addPostComment}
              postId={post.id}
              
            /> */}
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
