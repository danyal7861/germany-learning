<%@ page import ="java.sql.*"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Login</title>
</head>
<body>
<%

String username = request.getParameter("username"); //Takes the users email entry from the login html page once form is submitted.
String password = request.getParameter("password"); //Takes the users password entry from the login html page



String MySQLURL = "jdbc:mysql://localhost:3306/login?useSSL=false"; //Connects to the driver needed to connect to the specified database. 
String databseUserName = "root"; //The username required to access the database.
String databasePassword = ""; //The password required to access the database.


try {    
	Connection con = DriverManager.getConnection(MySQLURL, databseUserName, databasePassword ); //Pieces the link togethor with the driver, database link, username and and password 
	String query = "SELECT user,pass FROM userandpassword WHERE user = '"+username+"' AND pass = '"+password+"'";   //SQL Statement which will select the required columns from the database.
	Statement st = con.createStatement(); //Built in function used to create the above SQL statement.
	ResultSet rs = st.executeQuery(query); //Execution of the SQL statement. 
	boolean verified = false;  //Sets boolean value to false, this will be later used to validate login 
	while (rs.next()) //A loop going through all the records in the database until there is no more. 
	{
	
	String name = rs.getString("user");   //stores the column data in the program
	String pass = rs.getString("pass");   //stores column data in the program
	if (username.equals(name) && password.equals(pass)) { //Statement checks if the username and password entered by the user match with the username and passwords collected from the database.
		verified = true;
		break;
	}else{
		verified = false;
	}
	}
	
	
		if (verified == true) { //An if statement to confirm the if the user is authenticated or not, if so they will be redirected to an account page if not then they will be asked to retry the details. 
			response.sendRedirect("logged_in_home.html");
		}
		else {
			response.sendRedirect("incorrect_login.html");
	
  

		}
   
} catch (Exception e) {  //Is only executed when the try block above fails. 
   e.printStackTrace();
		out.println("Ooops! Looks like there was an error in the login system, try again or vontact an adminstrator.");
}

%>
</body>
</html>