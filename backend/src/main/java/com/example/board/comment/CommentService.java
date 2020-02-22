package com.example.board.comment;

import com.example.board.post.Post;
import com.example.board.post.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Service
public class CommentService {

  @Autowired
  private CommentRepository commentRepository;
  @Autowired
  private PostRepository postRepository;

  public List<Comment> findAll() {
    return commentRepository.findAll();
  }

  public List<Comment> findAllByPostId(Long pid) {
    return commentRepository.findAllByPostId(pid);
  }

  public Comment addComment(Comment c) {
    Comment newComment = new Comment();
    Post p = postRepository.findById(c.getPostId()).orElse(new Post());
    newComment.setPost(p);
    newComment.setPostId(c.getPostId());
    newComment.setCommentText(c.getCommentText());
    newComment.setCommentDate(new Date());

    return commentRepository.save(newComment);
  }

  @Transactional
  public Comment editComment(Long id, Comment c) {
    Comment commentToUpdate = commentRepository.getOne(id);
    commentToUpdate.setCommentText(c.getCommentText());
    commentToUpdate.setCommentDate(new Date());

    return commentRepository.save(commentToUpdate);
  }

  public void deleteById(Long commentId) {
    commentRepository.deleteById(commentId);
  }

  @Transactional
  public void deleteAllByPostId(Long pid) {
    commentRepository.deleteAllByPostId(pid);
  }
}
