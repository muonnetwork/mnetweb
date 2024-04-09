// login.js

document.getElementById("signupForm").addEventListener("submit", function(event) {
  event.preventDefault();
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  
  // Save email and password to log.txt
  var data = email + " " + password + "\n";
  saveToLogFile(data);
  alert("Sign up successful!");
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();
  var loginEmail = document.getElementById("loginEmail").value;
  var loginPassword = document.getElementById("loginPassword").value;
  
  // Read log.txt to check credentials
  readFromLogFile(loginEmail, loginPassword);
});

function saveToLogFile(data) {
  fetch('log.txt', {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'text/plain'
    }
  });
}

function readFromLogFile(email, password) {
  fetch('log.txt')
    .then(response => response.text())
    .then(data => {
      var credentials = data.split("\n");
      credentials.pop(); // Remove empty string at the end
      for (var i = 0; i < credentials.length; i++) {
        var cred = credentials[i].split(" ");
        if (cred[0] === email && cred[1] === password) {
          alert("Login successful!");
          return;
        }
      }
      alert("Invalid email or password");
    })
    .catch(error => console.error('Error:', error));
}
