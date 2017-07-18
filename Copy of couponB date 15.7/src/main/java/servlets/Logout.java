package servlets;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import logging.MyLogger;

/**
 * Servlet implementation class Logout
 */
public class Logout extends HttpServlet {
	private static final Logger LOGGER = MyLogger.getInstance().getLogger();
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Logout() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		LOGGER.log(Level.INFO, "entering Logout doGet");
		LOGGER.log(Level.INFO, "Logout doGet- invalidating session ");
		request.getSession().invalidate();
		System.out.println("i'm suppuse to be null ===="+request.getSession().getAttribute("adminFacade"));
		System.out.println("i'm suppuse to be null ===="+request.getSession().getAttribute("companyFacade"));
		System.out.println("i'm suppuse to be null ===="+request.getSession().getAttribute("customerFacade"));
		LOGGER.log(Level.INFO, "Logout doGet- redirecting to Login page ");
		response.sendRedirect("http://localhost:8080/couponB/login/login.html");
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
//	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		// TODO Auto-generated method stub
//		doGet(request, response);
//	}

}
