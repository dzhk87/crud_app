package com.example.board.comment;

import com.example.board.post.Post;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "comments")
@NoArgsConstructor
public class Comment {
  @Id
  @GeneratedValue
  private Long commentId;
  @NonNull
  private String commentText;
  private Date commentDate;

  @Column(name = "post_id", insertable = false, updatable = false)
  private Long postId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "post_id")
  @JsonIgnore
  private Post post;

}
