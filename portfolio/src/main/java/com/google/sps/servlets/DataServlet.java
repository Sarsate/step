// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import java.util.ArrayList;
import java.util.List;
import java.io.IOException;
import java.util.Date;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import com.google.sps.data.Comment;
import com.google.gson.Gson;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns some data refrencing comments for the webpage. */
@WebServlet("/comments")
public class DataServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Query query = new Query("Comment").addSort("timeOfComment", SortDirection.DESCENDING);
    PreparedQuery results = datastore.prepare(query);

    List<Comment> listOfComments = new ArrayList<Comment>();
    //Creates a Comment object for each entity that was previously ever posted. 
    for (Entity commentEntity : results.asIterable()) {
      Date timeOfComment = (Date) commentEntity.getProperty("timeOfComment");
      String name = (String) commentEntity.getProperty("name");
      String commentString = (String) commentEntity.getProperty("comment-string");
      Comment comment = new Comment(timeOfComment, name, commentString);
      listOfComments.add(comment);
    }
    //Changes the list of Comments into a JSON
    Gson gson = new Gson();
    String json = gson.toJson(listOfComments);
    response.setContentType("application/json;");
    response.getWriter().println(json);
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Date timeOfComment = new Date();
    String name = request.getParameter("name");
    String commentString = request.getParameter("comment-string");

    Entity commentEntity = new Entity("Comment");
    commentEntity.setProperty("name", name);
    commentEntity.setProperty("timeOfComment", timeOfComment);
    commentEntity.setProperty("comment-string", commentString);

    datastore.put(commentEntity);

    response.sendRedirect("/index.html");
  }
}
