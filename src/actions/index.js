export const POST_LIST_PAGE_INIT = 'POST_LIST_PAGE_INIT';
export const SET_POST = 'SET_POST';
export const DELETE_POST = 'DELETE_POST';

export const POST_VIEW_PAGE_INIT = 'POST_VIEW_PAGE_INIT';
export const SET_COMMENT = 'SET_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const DELETE_ALL_COMMENTS = 'DELETE_ALL_COMMENTS';

export const deleteAllPosts = () => ({
  type: DELETE_ALL_POSTS
});

export const deleteAllComments = () => ({
  type: DELETE_ALL_COMMENTS
});

///////////////////POST ACTIONS
export const postListPageInit = posts => ({
  type: POST_LIST_PAGE_INIT,
  posts
});

export const setPost = post => ({
  type: SET_POST,
  post
});

export const deletePost = id => ({
  type: DELETE_POST,
  id
});

///////////////////COMMENT ACTIONS
export const postViewPageInit = postPackage => ({
  type: POST_VIEW_PAGE_INIT,
  postPackage
});

export const setComment = comment => ({
  type: SET_COMMENT,
  comment
});

export const deleteComment = cid => ({
  type: DELETE_COMMENT,
  cid
});
