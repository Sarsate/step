package com.google.sps.data;

import java.util.Date;

/** Class detailing a comment. */
public class Comment {

  private final Date timeOfComment;
  private final String name;
  private final String comment;

  /**
   * Initializes an object of class Comment
   * @param {Date} timeOfComment - the date the comment was written
   * @param {String} name - the user who wrote the comment
   * @param {String} comment - the comment that was written
   */
  public Comment(Date timeOfComment, String name, String comment) {
    this.timeOfComment = timeOfComment;
    this.name = name;
    this.comment = comment;
  }

  public Date getTimeOfComment() {
    return timeOfComment;
  }

  public String getName() {
    return name;
  }

  public String getComment() {
    return comment;
  }
}
