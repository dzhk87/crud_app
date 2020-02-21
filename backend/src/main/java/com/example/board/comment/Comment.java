package com.example.board.comment;

import com.example.board.post.Post;
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

  @ManyToOne
  @JoinColumn(name = "post_id")
  private Post post;
}
