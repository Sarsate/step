package com.google.sps.data;

import java.util.Date;

/** Class detailing a comment. */
public class Comment {

  private final Date timeOfComment;
  private final String name;
  private final String commentString;

  /**
   * Initializes an object of class Comment
   * @param {Date} timeOfComment - the date the comment was written
   * @param {String} name - the user who wrote the comment
   * @param {String} commentString - the comment that was written
   */
  public Comment(Date timeOfComment, String name, String commentString) {
    this.timeOfComment = timeOfComment;
    this.name = name;
    this.commentString = commentString;
  }

  public Date getTimeOfComment() {
    return timeOfComment;
  }

  public String getName() {
    return name;
  }
  
  public String getCommentString() {
    return commentString;
  }
}