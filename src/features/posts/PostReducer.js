import createReducer from "../../app/Common/Util/ReducerUtils";
import {
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  FETCH_POSTS,
  FETCH_USER_POSTS
} from "./PostConstants";

const initialState = {
  posts: [],
  userPosts: []
};

const createPost = (state, payload) => {
  return [...state, payload.post];
};

const updatePost = (state, payload) => {
  return [...state.filter(post => post.id !== payload.post.id), payload.post];
};

const deletePost = (state, payload) => {
  return [...state.filter(post => post.id !== payload.postId)];
};
const fetchPosts = (state, payload) => {
  return {
    ...state,
    posts: payload.posts
  };
};
const fetchUserPosts = (state, payload) => {
  return {
    ...state,
    userPosts: payload.posts
  };
};

export default createReducer(initialState, {
  [CREATE_POST]: createPost,
  [UPDATE_POST]: updatePost,
  [DELETE_POST]: deletePost,
  [FETCH_POSTS]: fetchPosts,
  [FETCH_USER_POSTS]: fetchUserPosts
});
