
package com.google.sps.servlets;

import java.util.ArrayList;
import java.util.List;
import java.io.IOException;
import java.util.Date;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import com.google.sps.data.Comment;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns some example content. */
@WebServlet("/delete-data")
public class DeleteServlet extends HttpServlet {

  private DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Query query = new Query("Comment");
    PreparedQuery results = datastore.prepare(query);
    //Iterates through all the queries, deleting them from the datastore.
    for (Entity commentEntity : results.asIterable()) {
      datastore.delete(commentEntity.getKey());
    }
    response.setStatus(HttpServletResponse.SC_OK);
  }
}