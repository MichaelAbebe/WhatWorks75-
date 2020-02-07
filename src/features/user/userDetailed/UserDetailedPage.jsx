import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect, isEmpty } from "react-redux-firebase";
import { compose } from "redux";
import { Grid } from "semantic-ui-react";
import UserDetailedDescription from "./UserDetailedDescription";
import UserDetailedPosts from "./UserDetailedPosts";
import UserDetailedHeader from "./UserDetailedHeader";
import UserDetailedPhotos from "./UserDetailedPhotos";
import UserDetailedSidebar from "./UserDetailedSidebar";
import { userDetailedQuery } from "../UserQueries";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { getUserPosts } from "../UserActions";

const actoins = {
  getUserPosts
};

const mapState = (state, ownProps) => {
  let userUid = null;
  let profile = {};
  if (ownProps.match.params.id === state.auth.uid) {
    profile = state.firebase.profile;
  } else {
    profile =
      !isEmpty(state.firestore.ordered.profile) &&
      state.firestore.ordered.profile[0];
    userUid = ownProps.match.params.id;
  }
  return {
    profile,
    userUid,
    posts: state.posts,
    postsLoading: state.async.loading,
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos,
    requesting: state.firestore.status.requesting
  };
};

class UserDetailedPage extends Component {
  // async componentDidMount() {
  //   let posts = await this.props.getUserPosts(this.props.userUid);
    
  // }

  changeTab = (e, data) => {
    this.props.getUserPosts(this.props.userUid, data.activeIndex);
  };
  render() {
    const {
      profile,
      photos,
      auth,
      match,
      requesting,
      posts,
      postsLoading
    } = this.props;
    const isCurrentUser = auth.uid === match.params.id;
    const loading = Object.values(requesting).some(a => a === true);
    if (loading) return <LoadingComponent />;

    return (
      <Grid>
        <UserDetailedHeader profile={profile} />
        <UserDetailedDescription profile={profile} />
        <UserDetailedSidebar isCurrentUser={isCurrentUser} />
        {photos && photos.length > 0 && <UserDetailedPhotos photos={photos} />}
        <UserDetailedPosts
          posts={posts}
          postsLoading={postsLoading}
          changeTab={this.changeTab}
        />
      </Grid>
    );
  }
}

export default compose(
  connect(mapState, actoins),
  firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid))
)(UserDetailedPage);
