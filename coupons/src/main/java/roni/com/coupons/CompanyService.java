package roni.com.coupons;

import java.sql.Date;
import java.util.Collection;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
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
import Facade.ClientType;
import Facade.CompanyFacade;
import Facade.CouponSystem;
import java_beans.Company;
import java_beans.Coupon;
import java_beans.CouponType;
import logging.MyLogger;

/**this Company Service class contains all the methods an authorized Company is able to reach in Coupon System
 * @author roni
 *
 */
@Path("company")
public class CompanyService {
	private static final Logger LOGGER = MyLogger.getInstance().getLogger();
	@Context HttpServletRequest request;
	@Context private HttpServletResponse response;

	/**
	 * @return CompanyFacade, session attribute from a Http Request
	 * This method will return the attribute CompanyFacade, attribute can be null for unauthorized Company
	 */
	private CompanyFacade getCompanyFacade() {
		LOGGER.log(Level.INFO, "Entering CompanyService getCompanyFacade");
		CompanyFacade companyFacade = (CompanyFacade) request.getSession().getAttribute("companyFacade");
		LOGGER.log(Level.INFO, "Ending CompanyService getCompanyFacade-CompanyFacade returned");
		return companyFacade;
	}
	
	/**
	 * @param id is the Coupon ID
	 * @return the Coupon object associated with the given id
	 * This service method will return the Coupon only for a logged in Company that owns the Coupon
	 */
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("coupon/{id}")
	public Coupon getCoupon(@PathParam("id") int id) {
		Coupon coupon=null;
		try {
			LOGGER.log(Level.INFO, "Entering CompanyService getCoupon {" + id + " }");
			LOGGER.log(Level.INFO, "Getting Connection before CompanyService getCoupon {" + id + " }");
			Connection_Pool.getInstance().getConnection();
			CompanyFacade companyFacade=getCompanyFacade();			
			if (companyFacade != null) {
				coupon=companyFacade.getCoupon(id);
				LOGGER.log(Level.INFO, "CompanyService getCoupon {" + id + " }-Getting Coupon from companyFacade ");
			}
		} catch (ConnectionPoolException | DAOException | FacadeException e) {
			LOGGER.log(Level.SEVERE, "CompanyService getCoupon {" + id + " } " + e.toString());
			e.printStackTrace();
		}
		LOGGER.log(Level.INFO, "Ending CompanyService getCoupon {" + id + " }-Coupon returned");
		return coupon;

	}
	/**  
	 * @return a Collection of all Coupons owned by the logged in Company
	 */
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("coupons")
	public Collection<Coupon> getAllCoupon() {
		Collection<Coupon> coupons=null;
		try {
			LOGGER.log(Level.INFO, "Entering CompanyService getAllCoupon");
			LOGGER.log(Level.INFO, "Getting Connection before CompanyService getAllCoupon");
			Connection_Pool.getInstance().getConnection();
			CompanyFacade companyFacade=getCompanyFacade();
			
			if (companyFacade != null) {
				coupons = companyFacade.getAllCoupon();
				LOGGER.log(Level.INFO, "CompanyService getAllCoupon -Getting Coupons from companyFacade ");
			}

		} catch (ConnectionPoolException | DAOException | FacadeException e) {
			LOGGER.log(Level.SEVERE, "CompanyService getAllCoupon" + e.toString());
			e.printStackTrace();
		}
		LOGGER.log(Level.INFO, "Ending CompanyService getAllCoupon -Coupons returned");
		return coupons;
	}
	
	/**
	 * @param CouponType is the Coupon type (category)
	 * @return a Collection of all Coupons owned by the logged in Company associated with the given type
	 */
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("couponsbytype/{couponType}")
	public Collection<Coupon> getAllCouponByType(@PathParam("couponType") CouponType CouponType){
		Collection<Coupon> coupons=null;
		try {
			LOGGER.log(Level.INFO, "Entering CompanyService getAllCouponByType {" + CouponType + " }");
			LOGGER.log(Level.INFO, "Getting Connection before CompanyService getAllCouponByType {" + CouponType + " }");
			Connection_Pool.getInstance().getConnection();
			CompanyFacade companyFacade=getCompanyFacade();
			
			if (companyFacade != null){
				coupons = companyFacade.getAllCouponByType(CouponType);
				LOGGER.log(Level.INFO, "CompanyService getAllCouponByType {" + CouponType + " }- getting Coupons By Type from companyFacade");
			}
	} catch (ConnectionPoolException | DAOException | FacadeException e) {
		LOGGER.log(Level.SEVERE, "CompanyService getAllCouponByType {" + CouponType + " } " + e.toString());
		e.printStackTrace();
	}
		LOGGER.log(Level.INFO, "Ending CompanyService getAllCouponByType {" + CouponType + " }-Coupons By Type returned");
	return coupons;

	}

		/**
		 * @param date is the expiration date
		 * @return a Coupons Collection that will expire before the given date
		 */
		@GET
		@Produces(MediaType.APPLICATION_JSON)
		@Path("couponsbydate/{date}")
	public Collection<Coupon> getAllCouponUntilDate(@PathParam("date") Date date){
			Collection<Coupon>coupons=null;
		try {
			LOGGER.log(Level.INFO, "Entering CompanyService getAllCouponUntilDate {" + date + " }");
			LOGGER.log(Level.INFO, "Getting Connection before CompanyService getAllCouponUntilDate {" + date + " }");
			Connection_Pool.getInstance().getConnection();
			CompanyFacade companyFacade=getCompanyFacade();
			
			if (companyFacade != null){
				coupons = companyFacade.getAllCouponUntilDate(date);
				LOGGER.log(Level.INFO, "CompanyService getAllCouponUntilDate {" + date + " }-Getting Coupons Until Date from companyFacade");
			}
	} catch (ConnectionPoolException | DAOException | FacadeException e) {
		LOGGER.log(Level.SEVERE, "CompanyService getAllCouponUntilDate {" + date + " } " + e.toString());
		e.printStackTrace();
	}
		LOGGER.log(Level.INFO, "Ending CompanyService getAllCouponUntilDate {" + date + " }-Coupons Until Date returned");
	return coupons;

	}

		/**
		 * @return the Object Company of the logged in Company
		 */
		@GET
		@Produces(MediaType.APPLICATION_JSON)
		@Path("companydetails")
	public Company getCompanyDetails() {
			Company company=null;
		try {
			LOGGER.log(Level.INFO, "Entering CompanyService getCompanyDetails");
			LOGGER.log(Level.INFO, "Getting Connection before CompanyService getCompanyDetails");
			Connection_Pool.getInstance().getConnection();
			CompanyFacade companyFacade=getCompanyFacade();
			
			if (companyFacade != null){
				company = companyFacade.getCompanyDetails();
				LOGGER.log(Level.INFO, "CompanyService getCompanyDetails -Getting Company details from companyFacade");
			}
	} catch (ConnectionPoolException | DAOException | FacadeException e) {
		LOGGER.log(Level.SEVERE, "CompanyService getCompanyDetails" + e.toString());
		e.printStackTrace();
	}
		LOGGER.log(Level.INFO, "Ending CompanyService getCompanyDetails -Company details returned");
	return company;

	}

	/** This service method will create a new Coupon in DB, which will be owned by the logged in Company
	 * @param coupon is the Object Coupon to Create
	 */
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("coupon")
	public void createCoupon(Coupon coupon) {
		try {
			LOGGER.log(Level.INFO, "Entering CompanyService createCoupon");
			LOGGER.log(Level.INFO, "Getting Connection before CompanyService createCoupon");
			Connection_Pool.getInstance().getConnection();
			CompanyFacade companyFacade=getCompanyFacade();
			
			if (companyFacade != null) {
				companyFacade.createCoupon(coupon);
				LOGGER.log(Level.INFO, "Ending CompanyService createCoupon -Coupon created");
			}

		} catch (ConnectionPoolException | DAOException | FacadeException e) {
			LOGGER.log(Level.SEVERE, "CompanyService createCoupon" + e.toString());
			e.printStackTrace();
		}

	}
	
	/**This service method will delete the given Coupon from the DB
	 * @param coupon is the Object Coupon to Delete
	 */
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("deletecoupon")
	public void removeCoupon(Coupon coupon) {
		try {
			LOGGER.log(Level.INFO, "Entering CompanyService removeCoupon");
			LOGGER.log(Level.INFO, "Getting Connection before CompanyService removeCoupon");
			Connection_Pool.getInstance().getConnection();
			CompanyFacade companyFacade=getCompanyFacade();
			
			if (companyFacade != null) {
				companyFacade.removeCoupon(coupon);
				LOGGER.log(Level.INFO, "Ending CompanyService removeCoupon -Coupon removed");
			}

		} catch (ConnectionPoolException | DAOException | FacadeException e) {
			LOGGER.log(Level.SEVERE, "CompanyService removeCoupon" + e.toString());
			e.printStackTrace();
		}

	}

	/**This service method will update the given Coupon in DB
	 * @param coupon is the Object Coupon to Update
	 */
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("updatecoupon")
	public void updatecoupon(Coupon coupon) {
		try {
			LOGGER.log(Level.INFO, "Entering CompanyService updatecoupon");
			LOGGER.log(Level.INFO, "Getting Connection before CompanyService updatecoupon");
			Connection_Pool.getInstance().getConnection();
			CompanyFacade companyFacade=getCompanyFacade();
			
			if (companyFacade != null) {
				companyFacade.updateCoupon(coupon);
				LOGGER.log(Level.INFO, "Ending CompanyService updatecoupon -Coupon updated");
			}

		} catch (ConnectionPoolException | DAOException | FacadeException e) {
			LOGGER.log(Level.SEVERE, "CompanyService updatecoupon" + e.toString());
			e.printStackTrace();
		}

	}
	

}

