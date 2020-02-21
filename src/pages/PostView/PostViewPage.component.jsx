import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import PostDetail from './components/PostDetail.component';
import CommentView from './components/CommentView.component';
import {
  deleteAllComments,
  deleteComment,
  postViewPageInit,
  setComment
} from '../../actions';
import { getPostDetail, getCommentIds, getComments } from '../../selectors';
import CommentAdd from './components/CommentAdd.component';

const mapStateToProps = (state, props) => {
  const pid = props.match.params.id;

  return {
    post: getPostDetail(state),
    commentIds: getCommentIds(state)(pid),
    comments: getComments(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postViewPageInit: postPackage => dispatch(postViewPageInit(postPackage)),
    setComment: c => dispatch(setComment(c)),
    deleteComment: cid => dispatch(deleteComment(cid)),
    deleteAll: () => dispatch(deleteAllComments())
  };
};

class PostViewPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      commentText: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.editComment = this.editComment.bind(this);
    this.removeComment = this.removeComment.bind(this);
  }

  async componentDidMount() {
    const pid = this.props.match.params.id;
    let postPackage = {};
    await fetch(`http://localhost:8080/api/posts/${pid}`)
      .then(res => res.json())
      .then(body => {
        postPackage = {
          ...postPackage,
          post: body
        };
      })
      .catch(err => console.log(err));
    await fetch(`http://localhost:8080/api/posts/${pid}/comments`)
      .then(res => res.json())
      .then(body => {
        const bodyObj = body.reduce((map, comment) => {
          map[comment.commentId] = comment;
          return map;
        }, {});
        postPackage = {
          ...postPackage,
          comments: bodyObj
        };
      })
      .catch(err => console.log(err));
    this.props.deleteAll();
    this.props.postViewPageInit(postPackage);
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      commentText: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const { post } = this.props;
    const { commentText } = this.state;

    if (!commentText.length) {
      console.log('Cannot post an empty comment');
      return;
    }

    // logic for posting to db
    const newComment = {
      commentText,
      post
    };
    await fetch(`http://localhost:8080/api/posts/${post.get('id')}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newComment)
    })
      .then(res => res.json())
      .then(body => {
        this.props.setComment(body);
        this.setState({
          commentText: ''
        })
      })
  }

  async editComment(cid) {
    const commentToEdit = this.props.comments
      .toList()
      .find(c => c.get('commentId') === cid)
      .update('commentText', str => `${str}.`);
    await fetch(
      `http://localhost:8080/api/posts/${this.props.post.id}/comments/${cid}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentToEdit)
      }
    )
      .then(res => res.json())
      .then(body => this.props.setComment(body));
  }

  async removeComment(cid) {
    await fetch(`http://localhost:8080/api/posts/${this.props.post.get('id')}/comments/${cid}`, {
      method: 'DELETE'
    }).then(() => {
      this.props.deleteComment(cid);
    });
  }

  render() {
    const { post } = this.props;
    if (!post) {
      return <Redirect to='/posts' />;
    }
    
    return (
      <div className='view-page'>
        {/* Display post content */}
        <PostDetail key={post.id} post={post} />

        {/* Display comments */}
        {this.props.commentIds.sort().map((cid, i) => {
          return (
            <div className='comment-row' key={i}>
              <CommentView
                key={cid}
                cid={cid}
                editComment={this.editComment}
                removeComment={this.removeComment}
              />
            </div>
          );
        })}

        {/* Display comment posting form */}
        <CommentAdd
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          commentText={this.state.commentText}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostViewPage);
