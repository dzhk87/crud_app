package com.example.board.post;

import com.example.board.comment.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Service
public class PostService {

  @Autowired
  private PostRepository postRepository;

  public List<Post> findAll() {
    return postRepository.findAll();
  }

  public Post findById(Long id) {
    return postRepository.findById(id).orElse(new Post());
  }

  public Post addPost(Post p) {
    Post newPost = new Post();
    newPost.setTitle(p.getTitle());
    newPost.setText(p.getText());
    newPost.setDate(new Date());

    return postRepository.save(newPost);
  }

  @Transactional
  public Post editPost(Long id, Post p) {
    Post postToUpdate = postRepository.findById(id).orElse(new Post());
    postToUpdate.setTitle(p.getTitle());
    postToUpdate.setText(p.getText());
    postToUpdate.setDate(new Date());

    return postRepository.save(postToUpdate);
  }

  public void deleteById(Long id) {
    postRepository.deleteById(id);
  }
}
