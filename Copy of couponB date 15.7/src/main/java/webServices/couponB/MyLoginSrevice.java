//package webServices.couponB;
//
//
//import java.io.IOException;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import javax.ws.rs.Consumes;
//import javax.ws.rs.POST;
//import javax.ws.rs.Path;
//import javax.ws.rs.core.Context;
//import javax.ws.rs.core.MediaType;
//
//import servlets.Login;
//
//@Path("login")
//public class MyLoginSrevice {
//
//	@Context
//	HttpServletRequest request;
//	@Context
//	private HttpServletResponse response;
//	@POST
//	@Consumes(MediaType.APPLICATION_JSON)
//	public javax.ws.rs.core.Response login(String username, String password,String usertype)
//	{
//		Login login=new Login();
//		try {
//			login.doPost(request, response);
//		} catch (ServletException | IOException e) {
//			return javax.ws.rs.core.Response.ok("i couldnt login").status(400).build();
//			
//		}
//		
//		return javax.ws.rs.core.Response.ok().status(200).build(); 
//		
//	}
//
//
//}
