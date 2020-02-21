package com.example.board.comment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Service
public class CommentService {

  @Autowired
  private CommentRepository commentRepository;

  public List<Comment> findAll() {
    return commentRepository.findAll();
  }

  public List<Comment> findAllByPostId(Long pid) {
    return commentRepository.findAllByPostId(pid);
  }

  public Comment addComment(Comment c) {
    Comment newComment = new Comment();
    newComment.setCommentText(c.getCommentText());
    newComment.setPost(c.getPost());
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
