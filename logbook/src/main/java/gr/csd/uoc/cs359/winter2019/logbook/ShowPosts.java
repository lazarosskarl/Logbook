/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gr.csd.uoc.cs359.winter2019.logbook;

import gr.csd.uoc.cs359.winter2019.logbook.db.PostDB;
import gr.csd.uoc.cs359.winter2019.logbook.model.Post;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author user
 */
public class ShowPosts extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String username=request.getParameter("username");
        String mode=request.getParameter("mode");
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            String postID;
            String postusername;
            String description;
            String resourceURL;
            String imageURL;
            String imageBase64;
            String latitude;
            String longitude;
            String createdAt;
            String json="";
            if(mode==null){
                out.println("No mode param");
                response.setStatus(400);
            }
            else if(mode.equals("0")){
                List<Post> posts = PostDB.getTop10RecentPosts();
                out.println('"'+"posts"+'"'+":["); 
                for (Post postIt : posts) {
                   postusername='"'+"username"+'"'+':'+'"'+postIt.getUserName()+'"'+',';
                   String idstring=String.valueOf(postIt.getPostID());
                   postID='"'+"postID"+'"'+':'+'"'+idstring+'"'+',';
                   String tmp=postIt.getDescription();
                   tmp=tmp.replaceAll("\n"," ");
                   description='"'+"description"+'"'+':'+'"'+tmp+'"'+',';
                   resourceURL='"'+"resourceURL"+'"'+':'+'"'+postIt.getResourceURL()+'"'+',';
                   imageURL='"'+"imageURL"+'"'+':'+'"'+postIt.getImageURL()+'"'+',';
                   imageBase64='"'+"imageBase64"+'"'+':'+'"'+postIt.getImageBase64()+'"'+',';
                   latitude='"'+"latitude"+'"'+':'+'"'+postIt.getLatitude()+'"'+',';
                   longitude='"'+"longitude"+'"'+':'+'"'+postIt.getLongitude()+'"'+',';
                   createdAt='"'+"createdAt"+'"'+':'+'"'+postIt.getCreatedAt()+'"';
                   json=json+'{'+postID+postusername+description+resourceURL+imageURL+imageBase64+latitude+longitude+createdAt+'}'+',';
                }
                json=json.substring(0, json.length()-1)+']';
                out.println(json);
                response.setStatus(200);
            }
            else if(mode.equals("1")){
                Cookie[] cookies = request.getCookies();
                int counter = 0;
                String userName = "";
                if (cookies != null) {
                    for (Cookie cookie : cookies) {
                        if (cookie.getName().equals("uname")) {
                            userName = cookie.getValue();
                            counter++;
                        }
                    }
                }
                String n = userName;
                if (counter != 0) {
                    List<Post> posts = PostDB.getTop10RecentPostsOfUser(n);
                    out.println('"' + "posts" + '"' + ":[");
                    for (Post postIt : posts) {
                        postusername = '"' + "username" + '"' + ':' + '"' + postIt.getUserName() + '"' + ',';
                        String idstring = String.valueOf(postIt.getPostID());
                        postID = '"' + "postID" + '"' + ':' + '"' + idstring + '"' + ',';
                        String tmp = postIt.getDescription();
                        tmp = tmp.replaceAll("\n", " ");
                        description = '"' + "description" + '"' + ':' + '"' + tmp + '"' + ',';
                        resourceURL = '"' + "resourceURL" + '"' + ':' + '"' + postIt.getResourceURL() + '"' + ',';
                        imageURL = '"' + "imageURL" + '"' + ':' + '"' + postIt.getImageURL() + '"' + ',';
                        imageBase64 = '"' + "imageBase64" + '"' + ':' + '"' + postIt.getImageBase64() + '"' + ',';
                        latitude = '"' + "latitude" + '"' + ':' + '"' + postIt.getLatitude() + '"' + ',';
                        longitude = '"' + "longitude" + '"' + ':' + '"' + postIt.getLongitude() + '"' + ',';
                        createdAt = '"' + "createdAt" + '"' + ':' + '"' + postIt.getCreatedAt() + '"';
                        json = json + '{' + postID + postusername + description + resourceURL + imageURL + imageBase64 + latitude + longitude + createdAt + '}' + ',';
                    }
                    json = json.substring(0, json.length() - 1) + ']';
                    out.println(json);
                    response.setStatus(200);
                } else {
                    response.setStatus(400);
                }
            } else if (mode.equals("2")) {
                if (username != "") {
                    List<Post> posts = PostDB.getTop10RecentPostsOfUser(username);
                    out.println('"' + "posts" + '"' + ":[");
                    for (Post postIt : posts) {
                        postusername = '"' + "username" + '"' + ':' + '"' + postIt.getUserName() + '"' + ',';
                        String idstring = String.valueOf(postIt.getPostID());
                        postID = '"' + "postID" + '"' + ':' + '"' + idstring + '"' + ',';
                        String tmp = postIt.getDescription();
                        tmp = tmp.replaceAll("\n", " ");
                        description = '"' + "description" + '"' + ':' + '"' + tmp + '"' + ',';
                        resourceURL = '"' + "resourceURL" + '"' + ':' + '"' + postIt.getResourceURL() + '"' + ',';
                        imageURL = '"' + "imageURL" + '"' + ':' + '"' + postIt.getImageURL() + '"' + ',';
                        imageBase64 = '"' + "imageBase64" + '"' + ':' + '"' + postIt.getImageBase64() + '"' + ',';
                        latitude = '"' + "latitude" + '"' + ':' + '"' + postIt.getLatitude() + '"' + ',';
                        longitude = '"' + "longitude" + '"' + ':' + '"' + postIt.getLongitude() + '"' + ',';
                        createdAt = '"' + "createdAt" + '"' + ':' + '"' + postIt.getCreatedAt() + '"';
                        json = json + '{' + postID + postusername + description + resourceURL + imageURL + imageBase64 + latitude + longitude + createdAt + '}' + ',';
                    }
                    json = json.substring(0, json.length() - 1) + ']';
                    out.println(json);
                    response.setStatus(200);
                } else {
                    response.setStatus(400);
                }
            } else {
                response.setStatus(400);
            }
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(ShowPosts.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
