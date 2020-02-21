import React from 'react';
import {connect} from 'react-redux';

import './CommentView.component.css'
import { getComment } from '../../../selectors'

const mapStateToProps = (state, props) => {
  return {
    comment: getComment(state)(props.cid)
  };
};

class CommentView extends React.Component {
  render() {
    const { comment } = this.props;
    const cid = comment.get('commentId');
    return (
      <div className='show-comment'>
        <span className='comment-date'>{ comment.get('commentDate') }</span>
        <span className='comment-text'>{ comment.get('commentText') }</span>
        <button onClick={() => this.props.editComment(cid)}>Edit</button>
        <button onClick={() => this.props.removeComment(cid)}>Delete</button>
        <hr />
      </div>
    );
  }
}

export default connect(mapStateToProps)(CommentView);