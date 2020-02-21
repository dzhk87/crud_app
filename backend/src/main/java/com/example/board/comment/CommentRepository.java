package com.example.board.comment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
  List<Comment> findAllByPostId(@Param("pid") Long pid);

  void deleteAllByPostId(Long pid);
}
