package servlets;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Data_Base.Connection_Pool;
import Exceptions.ConnectionPoolException;
import Exceptions.DAOException;
import Exceptions.FacadeException;
import Facade.AdminFacade;
import Facade.ClientType;
import Facade.CompanyFacade;
import Facade.CouponSystem;
import Facade.CustomerFacade;
import logging.MyLogger;

/**
 * Servlet implementation class Login
 */
public class Login extends HttpServlet {
	private static final Logger LOGGER = MyLogger.getInstance().getLogger();
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Login() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * this post method gets 3 parameters from the request-
	 * username,password,usertype, when parameters matches the information in DB
	 * it enables login, sets attribute on session, and redirect to the welcome
	 * page for each type of user, when login is not permitted it add cookie login failed
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		LOGGER.log(Level.INFO, "Entering Login doPost");
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		LOGGER.log(Level.INFO, "Login doPost-checking which userType");
		// ========================== Company Login ======================
		if (request.getParameter("usertype").equals("Company")) {
			LOGGER.log(Level.INFO, "Login doPost- userType equals Company");
			try {
				System.out.println("im in company");
				LOGGER.log(Level.INFO, "Login doPost- Getting Connection to DB in order to check Login credentials");
				Connection_Pool.getInstance().getConnection();
				LOGGER.log(Level.INFO, "Login doPost- Getting companyFacade with Login credentials");
				CompanyFacade companyFacade = (CompanyFacade) CouponSystem.getInstance().login(username, password,
						ClientType.Company);
				LOGGER.log(Level.INFO, "Login doPost- checking companyFacade is not null and approved for login");
				if (companyFacade != null) {
					LOGGER.log(Level.INFO, "Login doPost- login approved, retrieving and setting session for user ");
					request.getSession().setAttribute("companyFacade", companyFacade);
					LOGGER.log(Level.INFO, "Login doPost- redirecting to Company home page ");
					response.sendRedirect("http://localhost:8080/coupons/CompanyView/CompanyView.html#/main");
				}

			} catch (ConnectionPoolException | DAOException | FacadeException e) {
				LOGGER.log(Level.SEVERE, "Login doPost- login failed, redirecting to another attempt ");
				System.out.println("i'm at facade exception");
				Cookie loginFailed = new Cookie("loginFailed", "true");
				response.addCookie(loginFailed);
				response.sendRedirect("http://localhost:8080/coupons/login/login.html");
			}
			// ========================== Admin Login ======================
		} else if (request.getParameter("usertype").equals("Administrator")) {
			LOGGER.log(Level.INFO, "Login doPost- userType equals Administrator");
			try {
				LOGGER.log(Level.INFO, "Login doPost- Getting Connection to DB in order to check Login credentials");
				Connection_Pool.getInstance().getConnection();
				LOGGER.log(Level.INFO, "Login doPost- Getting AdminFacade with Login credentials");
				AdminFacade adminFacade = (AdminFacade) CouponSystem.getInstance().login(username, password,
						ClientType.Admin);
				LOGGER.log(Level.INFO, "Login doPost- checking adminFacade is not null and approved for login");
				if (adminFacade != null) {
					LOGGER.log(Level.INFO, "Login doPost- login approved, retrieving and setting session for user ");
					request.getSession().setAttribute("adminFacade", adminFacade);
					LOGGER.log(Level.INFO, "Login doPost- redirecting to Administrator home page ");
					response.sendRedirect("http://localhost:8080/coupons/AdminView/AdminView.html#/mainWelcome");
				}

			} catch (ConnectionPoolException | DAOException | FacadeException e) {
				LOGGER.log(Level.SEVERE, "Login doPost- login failed, redirecting to another attempt ");
				Cookie loginFailed = new Cookie("loginFailed", "true");
				response.addCookie(loginFailed);
				response.sendRedirect("http://localhost:8080/coupons/login/login.html");

			}
			// ========================== Customer Login ======================
		} else if (request.getParameter("usertype").equals("Customer")) {
			LOGGER.log(Level.INFO, "Login doPost- userType equals Customer");
			try {
				LOGGER.log(Level.INFO, "Login doPost- Getting Connection to DB in order to check Login credentials");
				Connection_Pool.getInstance().getConnection();
				LOGGER.log(Level.INFO, "Login doPost- Getting CustomerFacade with Login credentials");
				CustomerFacade customerFacade = (CustomerFacade) CouponSystem.getInstance().login(username, password,
						ClientType.Customer);
				LOGGER.log(Level.INFO, "Login doPost- checking customerFacade is not null and approved for login");
				if (customerFacade != null) {
					LOGGER.log(Level.INFO, "Login doPost- login approved, retrieving and setting session for user ");
					request.getSession().setAttribute("customerFacade", customerFacade);
					LOGGER.log(Level.INFO, "Login doPost- redirecting to Customer home page ");
					response.sendRedirect("http://localhost:8080/coupons/CustomerView/CustomerView.html");

				}
			} catch (ConnectionPoolException | DAOException | FacadeException e) {
				LOGGER.log(Level.SEVERE, "Login doPost- login failed, redirecting to another attempt ");
				Cookie loginFailed = new Cookie("loginFailed", "true");
				response.addCookie(loginFailed);
				response.sendRedirect("http://localhost:8080/coupons/login/login.html");

			}
		}
	}

//	/**
//	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
//	 *      response)
//	 */
//	protected void doGet(HttpServletRequest request, HttpServletResponse response)
//			throws ServletException, IOException {
//		this.doPost(request, response);
//	}

}
