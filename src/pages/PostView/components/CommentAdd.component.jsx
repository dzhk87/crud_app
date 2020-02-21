import React from 'react';

const CommentAdd = ({ handleSubmit, handleChange, commentText }) => {
  return (
    <div className='comment-post'>
      <form onSubmit={handleSubmit}>
        <textarea
          name='commentText'
          placeholder='Enter a comment'
          onChange={handleChange}
          value={commentText}
        />
        <input type='submit' />
      </form>
    </div>
  );
};

export default CommentAdd;
