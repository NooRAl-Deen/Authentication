function matchPassword() {
    let pw1 = document.getElementById("pas1").value;
    let pw2 = document.getElementById("pas2").value;
    if(pw1 !== pw2)
    {	
        alert("Passwords did not match!");
    }
  }