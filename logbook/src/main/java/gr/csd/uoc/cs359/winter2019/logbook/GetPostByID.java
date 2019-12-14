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
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author user
 */
public class GetPostByID extends HttpServlet {

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
        String postidstring=request.getParameter("postid");
        response.setContentType("text/json;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            if(postidstring!=null && postidstring!=""){
                int postID=Integer.parseInt(postidstring);
                Post postIt=PostDB.getPost(postID);
                if(postIt!=null){
                   String postusername;
                   String description;
                   String resourceURL;
                   String imageURL;
                   String imageBase64;
                   String latitude;
                   String longitude;
                   String createdAt;
                   String json="";
                   postusername='"'+"username"+'"'+':'+'"'+postIt.getUserName()+'"'+',';
                   String idstring=String.valueOf(postIt.getPostID());
                   postidstring='"'+"postID"+'"'+':'+'"'+idstring+'"'+',';
                   String tmp=postIt.getDescription();
                   tmp=tmp.replaceAll("\n"," ");
                   description='"'+"description"+'"'+':'+'"'+tmp+'"'+',';
                   resourceURL='"'+"resourceURL"+'"'+':'+'"'+postIt.getResourceURL()+'"'+',';
                   imageURL='"'+"imageURL"+'"'+':'+'"'+postIt.getImageURL()+'"'+',';
                   imageBase64='"'+"imageBase64"+'"'+':'+'"'+postIt.getImageBase64()+'"'+',';
                   latitude='"'+"latitude"+'"'+':'+'"'+postIt.getLatitude()+'"'+',';
                   longitude='"'+"longitude"+'"'+':'+'"'+postIt.getLongitude()+'"'+',';
                   createdAt='"'+"createdAt"+'"'+':'+'"'+postIt.getCreatedAt()+'"';
                   json=json+'{'+postidstring+postusername+description+resourceURL+imageURL+imageBase64+latitude+longitude+createdAt+'}';
                   out.print(json);
                   response.setStatus(200);
                }
                else{
                    out.println("Could not Find Post");
                    response.setStatus(400); 
                }
            } 
            else{
                out.println("Could not Find Post");
                response.setStatus(400);
            }
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(GetPostByID.class.getName()).log(Level.SEVERE, null, ex);
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
