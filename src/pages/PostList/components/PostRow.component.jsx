import React from 'react';
import {connect} from 'react-redux'
import {Link} from "react-router-dom";
import {getPost} from "../../../selectors";


const mapStateToProps = (state, props) => {
  return {
    post: getPost(state)(props.pid)
  }
};

class PostRow extends React.Component {
  render() {
    const { post } = this.props;
    const pid = post.get('id');
    return (
      <div className='show-post'>
        <h1>{ post.get('title') }</h1>
        <h3>{ post.get('date') }</h3>
        <h4>{ post.get('text') }</h4>
        <Link to={`/posts/${pid}`}>
          <button>View Post</button>
        </Link>
        <Link to={`/posts/${pid}/edit`}>
          <button>Edit</button>
        </Link>
        <button onClick={() => this.props.remove(pid)}>Delete</button>
        <hr />
      </div>
    );
  }
}


export default connect(mapStateToProps)(PostRow);