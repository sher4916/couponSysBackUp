package logging;

import java.util.logging.Logger;

public class MyLogger {
	
	private static MyLogger INSTANCE;
	private static Logger logger = null;
	
	private MyLogger()
	{
		logger = Logger.getLogger("Coupon Logger");
		
		
		// handler
	}
	
	public static synchronized MyLogger getInstance(){
		if (INSTANCE == null) {
			INSTANCE = new MyLogger();
		}
		return INSTANCE;
	}
	
	public Logger getLogger()
	{
		return logger;
	}

}
