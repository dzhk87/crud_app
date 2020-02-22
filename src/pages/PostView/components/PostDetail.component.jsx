import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {getPostDetail} from '../../../selectors';

const mapStateToProps = state => {
  return {
    post: getPostDetail(state)
  }
};

class PostDetail extends React.Component {
  render() {
    const { post } = this.props;
    const pid = post.get('id');
    return (
      <div className='show-post'>
        <h1>{ post.get('title') }</h1>
        <h3>{ post.get('date') }</h3>
        <h4>{ post.get('text') }</h4>
        <Link to={`/posts/${pid}/edit`}>
          <button>Edit</button>
        </Link>
        <button onClick={() => this.props.remove(pid)}>Delete</button>
      </div>
    );
  }
}


export default connect(mapStateToProps)(PostDetail);