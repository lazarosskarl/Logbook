/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gr.csd.uoc.cs359.winter2019.logbook;

import gr.csd.uoc.cs359.winter2019.logbook.db.UserDB;
import gr.csd.uoc.cs359.winter2019.logbook.model.User;
import java.io.IOException;
import java.io.PrintWriter;
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
public class GetUserInfo extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     * @throws java.lang.ClassNotFoundException
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, ClassNotFoundException {
        response.setContentType("application/json;charset=UTF-8");
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
        if(counter!=0){
            String n=userName;
            User user=UserDB.getUser(n);
            try (PrintWriter out = response.getWriter()) {
                out.println(
                    '"'+"username"+'"'+':'+'"'+user.getUserName()+'"'+','+
                    '"'+"email"+'"'+':'+'"'+user.getEmail()+'"'+','+
                    '"'+"password"+'"'+':'+'"'+user.getPassword()+'"'+','+
                    '"'+"firstname"+'"'+':'+'"'+user.getFirstName()+'"'+','+
                    '"'+"lastname"+'"'+':'+'"'+user.getLastName()+'"'+','+
                    '"'+"birthdate"+'"'+':'+'"'+user.getBirthDate()+'"'+','+
                    '"'+"gender"+'"'+':'+'"'+user.getGender()+'"'+','+
                    '"'+"country"+'"'+':'+'"'+user.getCountry()+'"'+','+
                    '"'+"city"+'"'+':'+'"'+user.getTown()+'"'+','+
                    '"'+"address"+'"'+':'+'"'+user.getAddress()+'"'+','+
                    '"'+"profession"+'"'+':'+'"'+user.getOccupation()+'"'+','+
                    '"'+"interests"+'"'+':'+'"'+user.getInterests()+'"'+','+
                    '"'+"info"+'"'+':'+'"'+user.getInfo()+'"'+','+
                    '"'+"registered_since"+'"'+':'+'"'+user.getRegisteredSince()+'"'
                );
                response.setStatus(200);
            }
        }
        else{
            response.setStatus(400);
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
        try {
            processRequest(request, response);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(GetUserInfo.class.getName()).log(Level.SEVERE, null, ex);
        }
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
        try {
            processRequest(request, response);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(GetUserInfo.class.getName()).log(Level.SEVERE, null, ex);
        }
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
