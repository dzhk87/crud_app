import React from 'react';
import { connect } from 'react-redux';

import { setPost } from '../../actions';

const mapStateToProps = state => ({
  posts: state.postListReducer.get('posts')
});

const mapDispatchToProps = dispatch => ({
  setPost: post => dispatch(setPost(post))
});

class EditPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    await fetch(`http://localhost:8080/api/posts/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(post => {
        this.setState({
          post
        });
      });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let { post } = this.state;
    post[name] = value;
    this.setState({
      post
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    
    const { post } = this.state;

    await fetch(`http://localhost:8080/api/posts/${post.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    }).then(res => res.json())
      .then(body => {
      this.props.setPost(body);
      this.props.history.push('/posts');
    });
  }

  render() {
    const { post } = this.state;

    return (
      <div className='edit-page'>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='title'
            placeholder='Title'
            value={post.title || ''}
            onChange={this.handleChange}
          />
          <textarea
            name='text'
            placeholder='Enter text'
            value={post.text || ''}
            onChange={this.handleChange}
          />
          <input type='submit' />
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
