package com.example.board;

import com.example.board.comment.Comment;
import com.example.board.comment.CommentService;
import com.example.board.post.Post;
import com.example.board.post.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class RootController {

  @Autowired
  public PostService postService;
  @Autowired
  public CommentService commentService;

  ////////////////////// Post Handling Logic

  @GetMapping("/posts")
  public List<Post> findAllPosts() {
    return postService.findAll();
  }

  @PostMapping("/posts")
  @ResponseBody
  public Post addPost(@Valid @RequestBody Post p) {
    return postService.addPost(p);
  }

  @PutMapping("/posts/{id}")
  @ResponseBody
  public Post editPost(@Valid @RequestBody Post p, @PathVariable Long id) {
    return postService.editPost(id, p);
  }

  @DeleteMapping("/posts/{id}")
  @ResponseBody
  public void deletePost(@PathVariable Long id) {
    commentService.deleteAllByPostId(id);
    postService.deleteById(id);
  }

  ////////////////////// Comment Handling Logic

  @GetMapping("/posts/{id}")
  public Post findById(@PathVariable Long id) {
    return postService.findById(id);
  }

  @GetMapping("/posts/{id}/comments")
  public List<Comment> findAllComments(@PathVariable Long id) {
    return commentService.findAllByPostId(id);
  }

  @PostMapping("/posts/{id}")
  @ResponseBody
  public Comment addComment(@PathVariable Long id, @Valid @RequestBody Comment c) {
    return commentService.addComment(c);
  }

  @PutMapping("/posts/{id}/comments/{cid}")
  @ResponseBody
  public Comment editComment(@PathVariable Long cid, @Valid @RequestBody Comment c) {
    return commentService.editComment(cid, c);
  }

  @DeleteMapping("/posts/{id}/comments/{cid}")
  @ResponseBody
  public void deleteComment(@PathVariable Long cid) {
    commentService.deleteById(cid);
  }

}
