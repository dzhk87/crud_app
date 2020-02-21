import React from 'react';
import { connect } from 'react-redux';

import { setPost } from '../../actions';

import './PostAddPage.component.css';

const mapDispatchToProps = dispatch => ({
  setPost: post => dispatch(setPost(post))
});

class PostPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newPost: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const { newPost } = this.state;
    newPost[name] = value;
    this.setState({
      newPost
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const { newPost } = this.state;

    await fetch('http://localhost:8080/api/posts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
    }).then(res => res.json())
      .then (body => {
      this.props.setPost(body);
      this.props.history.push('/posts');
    });
  }

  render() {
    return (
      <div className='post-page'>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='title'
            placeholder='Title'
            onChange={this.handleChange}
          />
          <textarea
            name='text'
            placeholder='Enter text'
            onChange={this.handleChange}
          />
          <input type='submit' />
        </form>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(PostPage);
