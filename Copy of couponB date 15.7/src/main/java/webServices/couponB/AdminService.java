package webServices.couponB;

import java.io.IOException;
import java.util.Collection;
import java.util.logging.ConsoleHandler;
import java.util.logging.FileHandler;
import java.util.logging.Formatter;
import java.util.logging.Handler;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.logging.SimpleFormatter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import Data_Base.Connection_Pool;
import Exceptions.ConnectionPoolException;
import Exceptions.DAOException;
import Exceptions.FacadeException;
import Facade.AdminFacade;
import java_beans.Company;
import java_beans.Customer;
import logging.MyLogger;

@Path("admin")
public class AdminService {
	private static final Logger LOGGER = MyLogger.getInstance().getLogger();


	@Context
	HttpServletRequest request;
	@Context
	private HttpServletResponse response;

	private AdminFacade getAdminFacade() {
		LOGGER.log(Level.INFO, "Entering AdminService getAdminFacade");
		AdminFacade adminFacade = (AdminFacade) request.getSession().getAttribute("adminFacade");
		LOGGER.log(Level.INFO, "Ending AdminService getAdminFacade-adminFacade returned");
		return adminFacade;
	}

//	private Boolean getLoginResults() {
//		if(request.getSession().getAttribute("loginResult").equals(false)){
//		return false;
//		}
//		else return true;
//	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("companies")
	public Collection<Company> getAllCompanies() {
		LOGGER.log(Level.INFO, "Entering AdminService getAllCompanies");
		Collection<Company> companies=null;
		try {

			Handler fileHandler = new FileHandler("couponSystem.log");
			Formatter simpleFormatter = new SimpleFormatter();


			LOGGER.addHandler(fileHandler);
			fileHandler.setFormatter(simpleFormatter);

			fileHandler.setLevel(Level.ALL);
			//consoleHandler.setLevel(Level.ALL);

			LOGGER.setLevel(Level.ALL);
			LOGGER.config("Configuration of Logger done.");

			
			LOGGER.log(Level.INFO, "Getting Connection before AdminService getAllCompanies");
			Connection_Pool.getInstance().getConnection();
			AdminFacade adminFacade = getAdminFacade();
			

			if (adminFacade != null) {
				companies = adminFacade.getAllCompanies();
				LOGGER.log(Level.INFO, "AdminService getAllCompanies-getting companies from adminFacade");
			}

		} catch (ConnectionPoolException | DAOException | FacadeException e) {
			// TODO Auto-generated catch block
			LOGGER.log(Level.SEVERE, "AdminService getAllCompanies " + e.toString());
			e.printStackTrace();
		} catch (SecurityException e) {
			LOGGER.log(Level.SEVERE, "Security Error in AdminService getAllCompanies");
		} catch (IOException e) {
			LOGGER.log(Level.SEVERE, "Error occur in FileHandler.");
			e.printStackTrace();
		}
		LOGGER.log(Level.INFO, "Ending AdminService getAllCompanies-companies returned");
		return companies;
		
	}

	// get company
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("company/{id}")
	public Company getCompany(@PathParam("id") long id) {
		Company company=null;
		try {
			LOGGER.log(Level.INFO, "Entering AdminService getCompany {" + id + " }");
			LOGGER.log(Level.INFO, "Getting Connection before AdminService getCompany {" + id + " }");
			Connection_Pool.getInstance().getConnection();
			AdminFacade adminFacade = getAdminFacade();
			if (adminFacade != null) {
				company = adminFacade.getCompany(id);
				LOGGER.log(Level.INFO, "AdminService getCompany {" + id + " }- getting company from adminFacade");

			}

		} catch (ConnectionPoolException | DAOException | FacadeException e) {
			LOGGER.log(Level.SEVERE, "AdminService getCompany {" + id + " } " + e.toString());
			e.printStackTrace();
		}
		LOGGER.log(Level.INFO, "Ending AdminService getCompany {" + id + " }-company returned");
		return company;

	}

	// create company

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("company")
	public void createCompany(Company company) {
		try {
			LOGGER.log(Level.INFO, "Entering AdminService createCompany ");
			LOGGER.log(Level.INFO, "Getting Connection before AdminService createCompany");
			Connection_Pool.getInstance().getConnection();
			AdminFacade adminFacade = getAdminFacade();

			if (adminFacade != null) {
				adminFacade.createCompany(company);
				LOGGER.log(Level.INFO, "Ending AdminService createCompany -company created");
			}

		} catch (ConnectionPoolException | DAOException | FacadeException e) {
			LOGGER.log(Level.SEVERE, "AdminService createCompany" + e.toString());
		}

	}
	// TODO doesn't work yet
	// remove company

	/**
	 * itay said- i need to use this with DELETE since i dont have body to send
	 * in this method i need to do MAAKAF Company c=new Company c.SetID(
	 * 
	 * @param company
	 */
	@DELETE
	// @Context-here i need to get the seesion form the requests some how, i
	// need to do it for each of the method
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("deletecompany/{id}")
	public void removeCompany(@PathParam("id") long id) {
		try {
			LOGGER.log(Level.INFO, "Entering AdminService removeCompany {" + id + " }");
			LOGGER.log(Level.INFO, "Getting Connection before AdminService removeCompany {" + id + " }");
			Connection_Pool.getInstance().getConnection();
			AdminFacade adminFacade = getAdminFacade();

			if (adminFacade != null) {
				Company c = adminFacade.getCompany(id);
				adminFacade.removeCompany(c);
				LOGGER.log(Level.INFO, "Ending AdminService removeCompany {" + id + " } -company removed");
			}

		} catch (ConnectionPoolException | DAOException | FacadeException e) {
			LOGGER.log(Level.SEVERE, "AdminService removeCompany {" + id + " } " + e.toString());
			e.printStackTrace();
		}

	}

	// update company
	// TODO doesn't work yet
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("updatecompany")
	public void updateCompany(Company company) {
		try {
			LOGGER.log(Level.INFO, "Entering AdminService updateCompany ");
			LOGGER.log(Level.INFO, "Getting Connection before AdminService updateCompany");
			Connection_Pool.getInstance().getConnection();
			AdminFacade adminFacade = getAdminFacade();

			if (adminFacade != null) {
				adminFacade.updateCompany(company);
				LOGGER.log(Level.INFO, "Ending AdminService updateCompany -company updated");
			}

		} catch (ConnectionPoolException | DAOException | FacadeException e) {
			LOGGER.log(Level.SEVERE, "AdminService updateCompany" + e.toString());
			e.printStackTrace();
		}

	}

	// TODO- i get 204 status, is that OK?
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("customer")
	public void createCustomer(Customer customer) {
		try {
			LOGGER.log(Level.INFO, "Entering AdminService createCustomer ");
			LOGGER.log(Level.INFO, "Getting Connection before AdminService createCustomer");
			Connection_Pool.getInstance().getConnection();
			AdminFacade adminFacade = getAdminFacade();

			if (adminFacade != null) {
				adminFacade.createCustomer(customer);
				LOGGER.log(Level.INFO, "Ending AdminService createCustomer -Customer Created");
			}

		} catch (ConnectionPoolException | DAOException | FacadeException e) {
			LOGGER.log(Level.SEVERE, "AdminService createCustomer" + e.toString());
			e.printStackTrace();
		}
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("deletecustomer")
	public void removeCustomer(Customer customer) {
		try {
			LOGGER.log(Level.INFO, "Entering AdminService removeCustomer ");
			LOGGER.log(Level.INFO, "Getting Connection before AdminService removeCustomer");
			Connection_Pool.getInstance().getConnection();
			AdminFacade adminFacade = getAdminFacade();

			if (adminFacade != null) {
				adminFacade.removeCustomer(customer);
				LOGGER.log(Level.INFO, "Ending AdminService removeCustomer -Customer removed");
			}

		} catch (ConnectionPoolException | DAOException | FacadeException e) {
			LOGGER.log(Level.SEVERE, "AdminService removeCustomer" + e.toString());
			e.printStackTrace();
		}
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("updatecustomer")
	public void updateCustomer(Customer customer) {
		try {
			LOGGER.log(Level.INFO, "Entering AdminService updateCustomer ");
			LOGGER.log(Level.INFO, "Getting Connection before AdminService updateCustomer");
			Connection_Pool.getInstance().getConnection();
			AdminFacade adminFacade = getAdminFacade();

			if (adminFacade != null) {
				adminFacade.updateCustomer(customer);
				LOGGER.log(Level.INFO, "Ending AdminService updateCustomer -Customer updated");
			}

		} catch (ConnectionPoolException | DAOException | FacadeException e) {
			LOGGER.log(Level.SEVERE, "AdminService updateCustomer" + e.toString());
			e.printStackTrace();
		}
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("customer/{id}")
	public Customer getCustomer(@PathParam("id") long id) {
		Customer customer=null;
		try {
			LOGGER.log(Level.INFO, "Entering AdminService getCustomer {" + id + " }");
			LOGGER.log(Level.INFO, "Getting Connection before AdminService getCustomer {" + id + " }");
			Connection_Pool.getInstance().getConnection();
			AdminFacade adminFacade = getAdminFacade();

			if (adminFacade != null) {
				customer = adminFacade.getCustomer(id);
				LOGGER.log(Level.INFO, "AdminService getCustomer {" + id + " } -getting customer from adminFacade");
			}

		} catch (ConnectionPoolException | DAOException | FacadeException e) {
			LOGGER.log(Level.SEVERE, "AdminService getCustomer {" + id + " } " + e.toString());
			e.printStackTrace();
		}
		LOGGER.log(Level.INFO, "Ending AdminService getCustomer {" + id + " } -Customer Returned");
		return customer;
	}

	// checked and works
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("customers")
	public Collection<Customer> getAllCustomers() {
		Collection<Customer> customers=null;
		try {
			LOGGER.log(Level.INFO, "Entering AdminService getAllCustomers ");
			LOGGER.log(Level.INFO, "Getting Connection before AdminService getAllCustomers");
			Connection_Pool.getInstance().getConnection();
			AdminFacade adminFacade = getAdminFacade();

			if (adminFacade != null) {
				customers = adminFacade.getAllCustomer();
				LOGGER.log(Level.INFO, "AdminService getAllCustomers -getting customers from adminFacade");
			}

		} catch (ConnectionPoolException | DAOException | FacadeException e) {
			LOGGER.log(Level.SEVERE, "AdminService getAllCustomers" + e.toString());
			e.printStackTrace();
		}
		LOGGER.log(Level.INFO, "Ending AdminService getAllCustomers -Customers returned");
		return customers;
	}

}
