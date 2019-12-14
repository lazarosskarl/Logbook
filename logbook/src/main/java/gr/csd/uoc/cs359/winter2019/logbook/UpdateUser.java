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
public class UpdateUser extends HttpServlet {

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
        
        String username=request.getParameter("username");
        String email=request.getParameter("email");
        String firstname=request.getParameter("firstname");
        String password=request.getParameter("password");
        String lastname=request.getParameter("lastname");
        String birthdate=request.getParameter("birthdate");
        String gender=request.getParameter("gender");
        String country=request.getParameter("country");
        String city=request.getParameter("city");
        String address=request.getParameter("address");
        String prof=request.getParameter("prof");
        String interests=request.getParameter("interests");
        String info=request.getParameter("info");
        
        if (counter != 0) {
            User user = UserDB.getUser(userName);
            user.setPassword(password);
            user.setFirstName(firstname);
            user.setLastName(lastname);
            user.setBirthDate(birthdate);
            user.setCountry(country);
            user.setTown(city);
            user.setAddress(address);
            user.setOccupation(prof);
            user.setGender(gender);
            user.setInterests(interests);
            user.setInfo(info);

            response.setContentType("text/plain;charset=UTF-8");
            if ((username.equals(user.getUserName())) == false && UserDB.checkValidUserName(username) == false) {
                try (PrintWriter out = response.getWriter()) {
                    out.println("Username not available.");
                    response.setStatus(400);
                }
            } else if ((!email.equals(user.getEmail())) && !UserDB.checkValidEmail(email)) {
                try (PrintWriter out = response.getWriter()) {
                    out.println("Email not available.");
                    response.setStatus(400);
                }
            } else {
                //user.setUserName(username);
                user.setEmail(email);
                UserDB.updateUser(user);
                try (PrintWriter out = response.getWriter()) {
                    out.println("User updated." + username);
                    response.setStatus(200);
                }
            }
        }
        else{
            try (PrintWriter out = response.getWriter()) {
                    out.println("No active session");
                    response.setStatus(400);
            }
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
            Logger.getLogger(UpdateUser.class.getName()).log(Level.SEVERE, null, ex);
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
            Logger.getLogger(UpdateUser.class.getName()).log(Level.SEVERE, null, ex);
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
