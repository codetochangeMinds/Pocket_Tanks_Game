firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    //document.getElementById("scoreboard").style.display = "none";
    //document.getElementById("buttons").style.display = "none";
     //window.location.assign("file:///home/abhishek/Desktop/Design%20practices/Assignment-3/Pocket_Tank/index.html");
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
    


    var user = firebase.auth().currentUser;
	
    if(user != null){
	
      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
      document.getElementById("login_div").style.display = "none";
      window.location.assign("/client/index.html");	

    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function login(){
  
  var p=0;
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var p=1;
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });
	
/*if(p!==1)
{
	window.location.("file:///home/abhishek/Desktop/Design%20practices/Assignment-3/Pocket_Tank/index.html")
}*/
}

function signup(){
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
 firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error){
	console.log(error.code);
	console.log(error.message);	
});
}
function logout(){
  firebase.auth().signOut();
}
