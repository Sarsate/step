package com.google.sps.data;

import java.util.Date;

/** Class containing server statistics. */
public class Comment {

  private final Date timeOfComment;
  private final String name;
  private final String comment;

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
