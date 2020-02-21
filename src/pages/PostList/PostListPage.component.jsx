import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import PostRow from './components/PostRow.component';
import {
  setPost,
  deletePost,
  deleteAllPosts,
  postListPageInit
} from '../../actions';
import { getPosts } from '../../selectors';

const mapStateToProps = state => ({
  posts: getPosts(state)
});

const mapDispatchToProps = dispatch => ({
  postListPageInit: posts => dispatch(postListPageInit(posts)),
  setPost: post => dispatch(setPost(post)),
  deletePost: id => dispatch(deletePost(id)),
  deleteAll: () => dispatch(deleteAllPosts())
});

class PostListPage extends React.Component {
  constructor(props) {
    super(props);
    this.remove = this.remove.bind(this);
  }

  async componentDidMount() {
    await fetch(`http://localhost:8080/api/posts`)
      .then(res => res.json())
      .then(body => {
        const bodyMap = body.reduce((map, post) => {
          map[post.id] = post;
          return map;
        }, {});
        this.props.deleteAll();
        this.props.postListPageInit(bodyMap);
      })
      .catch(err => console.log(err));
  }

  async remove(id) {
    await fetch(`http://localhost:8080/api/posts/${id}`, {
      method: 'DELETE'
    }).then(() => {
      this.props.deletePost(id);
    });
  }

  render() {
    const { posts } = this.props;
    return (
      <div className='post-list'>
        {posts.toList().map((post, index) => {
          const pid = post.get('id');
          return (
            <div className='post-row' key={index}>
              <PostRow key={pid} pid={pid} remove={this.remove} />
            </div>
          );
        })}
        <Link to={'/posts/new'}>
          <button>Add</button>
        </Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListPage);
