package roni.com.coupons;

import java.util.Collection;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
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
import Facade.CustomerFacade;
import java_beans.Coupon;
import java_beans.CouponType;
import java_beans.Customer;
import logging.MyLogger;
/**this Customer Service class contains all the methods an authorized Customer is able to reach in Coupon System
 * @author roni
 *
 */
@Path("customer")
public class CustomerService {
	private static final Logger LOGGER = MyLogger.getInstance().getLogger();

	@Context
	HttpServletRequest request;
	@Context
	private HttpServletResponse response;
	/**
	 * @return CustomerFacade, session attribute from a Http Request
	 * This method will return the attribute CustomerFacade, attribute can be null for unauthorized Customer
	 */
	private CustomerFacade getCustomerFacade() {
		LOGGER.log(Level.INFO, "Entering CustomerService getCustomerFacade");
		CustomerFacade customerFacade = (CustomerFacade) request.getSession().getAttribute("customerFacade");
		LOGGER.log(Level.INFO, "Ending CustomerService getCustomerFacade-CustomerFacade returned");
		return customerFacade;
	}

	/**This service method will perform purchase that will indicate that the coupon now belongs to the logged in Customer
	 * @param coupon is the Object Coupon to purchase
	 */
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("purchasecoupon")
	public void purchaseCoupon(Coupon coupon) {
		try {
			LOGGER.log(Level.INFO, "Entering CustomerService purchaseCoupon");
			LOGGER.log(Level.INFO, "Getting Connection before CustomerService purchaseCoupon");
			Connection_Pool.getInstance().getConnection();
			CustomerFacade customerFacade = getCustomerFacade();

			if (customerFacade != null) {

				customerFacade.purchaseCoupon(coupon);
				LOGGER.log(Level.INFO, "Ending CustomerService purchaseCoupon -Coupon Purchased");
			}

		} catch (ConnectionPoolException | DAOException | FacadeException e) {
			LOGGER.log(Level.SEVERE, "CustomerService purchaseCoupon" + e.toString());
			e.printStackTrace();
		}

	}
	/**  
	 * @return a Collection of all Coupons owned by the logged in Customer
	 */
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("coupons")
	public Collection<Coupon> getAllPurchasedCoupons() {
		Collection<Coupon> coupons = null;
		try {
			LOGGER.log(Level.INFO, "Entering CustomerService getAllPurchasedCoupons");
			LOGGER.log(Level.INFO, "Getting Connection before CustomerService getAllPurchasedCoupons");
			Connection_Pool.getInstance().getConnection();
			CustomerFacade customerFacade = getCustomerFacade();

			if (customerFacade != null) {
				coupons = customerFacade.getAllPurchasedCoupons();
				LOGGER.log(Level.INFO,
						"CustomerService getAllPurchasedCoupons -getting purchased coupons from customerFacade ");
			}

		} catch (ConnectionPoolException | DAOException | FacadeException e) {
			LOGGER.log(Level.SEVERE, "CustomerService getAllPurchasedCoupons" + e.toString());
			e.printStackTrace();
		}
		LOGGER.log(Level.INFO, "Ending CustomerService getAllPurchasedCoupons -Purchased Coupons returned");
		return coupons;

	}
	/**  
	 * @return a Collection of all Coupons available for purchase for the logged in Customer
	 */
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("couponsforpurchase")
	public Collection<Coupon> getCouponsForPurchase() {
		LOGGER.log(Level.INFO, "Entering CustomerService getCouponsForPurchase");
		Collection<Coupon> result = null;
		try {

			LOGGER.log(Level.INFO, "Getting Connection before CustomerService getCouponsForPurchase");
			Connection_Pool.getInstance().getConnection();
			CustomerFacade customerFacade = getCustomerFacade();

			if (customerFacade != null) {
				result = customerFacade.getAvialableCouponsForPurchase();
				LOGGER.log(Level.INFO,
						"CustomerService getCouponsForPurchase -Getting Available Coupons For Purchase from customerFacade");
			}

		} catch (ConnectionPoolException | DAOException | FacadeException e) {
			LOGGER.log(Level.SEVERE, "CustomerService getCouponsForPurchase" + e.toString());
			e.printStackTrace();
		}
		LOGGER.log(Level.INFO, "Ending CustomerService getCouponsForPurchase -Available Coupons For Purchase returned");
		return result;

	}

	/**
	 * @param type is the Coupon type (category)
	 * @return a Collection of all Coupons owned by the logged in Customer associated with the given type
	 */
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("coupontype/{type}")
	public Collection<Coupon> getAllPurchasedCouponsByType(@PathParam("type") CouponType type) {
		Collection<Coupon> CouponsByType = null;
		try {
			LOGGER.log(Level.INFO, "Entering CustomerService getAllPurchasedCouponsByType {" + type + " }");
			LOGGER.log(Level.INFO,
					"Getting Connection before CustomerService getAllPurchasedCouponsByType {" + type + " }");
			Connection_Pool.getInstance().getConnection();
			CustomerFacade customerFacade = getCustomerFacade();

			if (customerFacade != null) {
				LOGGER.log(Level.INFO, "CustomerService getAllPurchasedCouponsByType {" + type
						+ " }-Getting Purchased Coupons By Type from customerFacade");
				CouponsByType = customerFacade.getAllPurchasedCouponsByType(type);
			}

		} catch (ConnectionPoolException | DAOException | FacadeException e) {
			LOGGER.log(Level.SEVERE, "CustomerService getAllPurchasedCouponsByType {" + type + " } " + e.toString());
			e.printStackTrace();
		}
		LOGGER.log(Level.INFO,
				"Ending CustomerService getAllPurchasedCouponsByType {" + type + " } - Coupons By Type returned");
		return CouponsByType;

	}

	/**
	 * @param price is the maximum price of coupons retrieved 
	 * @return a Collection of all Coupons owned by the logged in Customer with a lower cost then the given price
	 */
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("couponprice/{price}")
	public Collection<Coupon> getAllPurchasedCouponsByPrice(@PathParam("price") Double price) {
		Collection<Coupon> CouponsByPrice = null;
		try {
			LOGGER.log(Level.INFO, "Entering CustomerService getAllPurchasedCouponsByPrice {" + price + " }");
			LOGGER.log(Level.INFO,
					"Getting Connection before CustomerService getAllPurchasedCouponsByPrice {" + price + " }");
			Connection_Pool.getInstance().getConnection();
			CustomerFacade customerFacade = getCustomerFacade();

			if (customerFacade != null) {
				CouponsByPrice = customerFacade.getAllPurchasedCouponsByPrice(price);
				LOGGER.log(Level.INFO, "CustomerService getAllPurchasedCouponsByPrice"+ " {" + price+ " }-Getting Purchased Coupons By Price from customerFacade");
			}

		} catch (ConnectionPoolException | DAOException | FacadeException e) {
			LOGGER.log(Level.SEVERE, "CustomerService getAllPurchasedCouponsByPrice {" + price + " } " + e.toString());
			e.printStackTrace();
		}
		LOGGER.log(Level.INFO,
				"Ending CustomerService getAllPurchasedCouponsByPrice {" + price + " } - Coupons By price returned");
		return CouponsByPrice;

	}
	/**
	 * @return the Object Customer of the logged in Customer
	 */
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("customerdetails")
	public Customer getCustomerDetails() {
		Customer customer = null;
		try {
			LOGGER.log(Level.INFO, "Entering CustomerService getCustomerDetails");
			LOGGER.log(Level.INFO, "Getting Connection before CustomerService getCustomerDetails");
			Connection_Pool.getInstance().getConnection();
			CustomerFacade customerFacade = getCustomerFacade();

			if (customerFacade != null) {
				customer= customerFacade.getCustomerDetails();
				LOGGER.log(Level.INFO,
						"CustomerService getCustomerDetails -getting Customer Details from customerFacade ");
			}

		} catch (ConnectionPoolException | DAOException | FacadeException e) {
			LOGGER.log(Level.SEVERE, "CustomerService getCustomerDetails" + e.toString());
			e.printStackTrace();
		}
		LOGGER.log(Level.INFO, "Ending CustomerService getCustomerDetails -Customer returned");
		return customer;

	}

}
