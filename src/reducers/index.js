import { combineReducers } from 'redux';
import Immutable from 'immutable'

import * as ActionTypes from '../actions/index';

const postListState = Immutable.fromJS(
  {
    posts: {
      // pid: post
    }
  }
);

const postViewState = Immutable.fromJS(
  {
    post: {},
    comments: {}
  }
);

const postListReducer = (state = postListState, action) => {
  switch (action.type) {
    case ActionTypes.POST_LIST_PAGE_INIT:
      // console.log(action.posts, Immutable.fromJS(action.posts));
      return state.set('posts', Immutable.fromJS(action.posts));
    case ActionTypes.SET_POST:
      return state.setIn(['posts', `${action.post.id}`], Immutable.fromJS(action.post));
    case ActionTypes.DELETE_POST:
      return state.deleteIn(['posts', `${action.id}`]);
    default:
      return state;
  }
};

const postViewReducer = (state = postViewState, action) => {
  switch (action.type) {
    case ActionTypes.POST_VIEW_PAGE_INIT:
      return state.merge(Immutable.fromJS(action.postPackage));
    case ActionTypes.SET_COMMENT:
      return state.setIn(['comments', `${action.comment.commentId}`], Immutable.fromJS(action.comment));
    case ActionTypes.DELETE_COMMENT:
      return state.deleteIn(['comments', `${action.cid}`]);
    case ActionTypes.DELETE_ALL_COMMENTS:
      return postViewState;
    default:
      return state;
  }
};


export default combineReducers({
  postListReducer,
  postViewReducer
});
