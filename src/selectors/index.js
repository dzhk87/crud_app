// selectors
import {createSelector} from "reselect";
import memoize from 'lodash.memoize';

export const getPosts = state => {
  return state.postListReducer.get('posts')
};

export const getPost = createSelector(
  [getPosts],
  posts => {
    return memoize(pid => {
      return posts.get(`${pid}`);
    });
  }
);

export const getPostDetail = state => {
  return state.postViewReducer.get('post');
};

export const getComments = state => {
  return state.postViewReducer.get('comments');
};

export const getCommentIds = createSelector(
  [ getComments ],
   comments => memoize(pid => {
     return comments
       .filter(c => {
         return c.getIn(['post', 'id']).toString() === pid;
       })
       .keySeq()
   })
);

export const getComment = createSelector(
  [ getComments ],
  comments => {
    return memoize(cid => {
      return comments.get(`${cid}`);
    });
  }
);
