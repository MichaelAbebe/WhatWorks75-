import React, { Component, createRef } from "react";
import { Grid, Loader } from "semantic-ui-react";
import PostList from "../postList/PostList";
import { connect } from "react-redux";
import { getPostsForDashboard } from "../PostAction";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import PostActivity from "../PostActivity/PostActivity";
import { firestoreConnect } from "react-redux-firebase";

const query = [
  { collection: "activity", orderBy: ["timestamp", "desc"], limit: 5 }
];
const mapState = state => ({
  posts: state.posts,
  loading: state.async.loading,
  activities: state.firestore.ordered.activity
});
const actions = {
  getPostsForDashboard
};

class postDashboard extends Component {
  contextRef = createRef();
  state = {
    morePosts: false,
    loadingInitial: true,
    loadedPosts: []
  };
  async componentDidMount() {
    let next = await this.props.getPostsForDashboard();

    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        morePosts: true,
        loadingInitial: false
      });
    }
  }

  componentDidUpdate = prevProps => {
    if (this.props.posts !== prevProps.posts) {
      this.setState({
        loadedPosts: [...this.state.loadedPosts, ...this.props.posts]
      });
    }
  };
  getNextPost = async () => {
    const { posts } = this.props;

    let lastPost = posts && posts[posts.length - 1];

    let next = await this.props.getPostsForDashboard(lastPost);

    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        morePosts: false
      });
    }
  };
  render() {
    const { loading, activities } = this.props;
    const { morePosts, loadedPosts } = this.state;
    if (this.state.loadingInitialg) return <LoadingComponent />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <div ref={this.contextRef}>
            {" "}
            <PostList
              loading={loading}
              posts={loadedPosts}
              morePosts={morePosts}
              getNextPost={this.getNextPost}
            />
          </div>
        </Grid.Column>
        <Grid.Column width={6}>
          <PostActivity activities={activities} contextRef={this.contextRef} />
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loading} />
        </Grid.Column>
      </Grid>
    );
  }
}
export default connect(
  mapState,
  actions
)(firestoreConnect(query)(postDashboard));
