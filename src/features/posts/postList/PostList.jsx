import React, { Component, Fragment } from "react";
import PostListItem from "./PostListItem";
import InfiniteScroll from "react-infinite-scroller";

  

class PostList extends Component {
  render() {
    const { posts, getNextPost, loading, morePosts} = this.props;
   
    return (
      <Fragment>
        
        {posts && posts.length !== 0 && (
          <InfiniteScroll
            pageStart={0}
            loadMore={getNextPost}
            hasMore={!loading && morePosts}
            initialLoad={false}
          >
            {posts &&
              posts.map(post => <PostListItem key={post.id} post={post} />)}
          </InfiniteScroll>
        )}
      </Fragment>
    );
  }
}
export default  PostList;
