// login.js

document.getElementById("signupForm").addEventListener("submit", function(event) {
  event.preventDefault();
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  signUp(email, password);
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();
  var loginEmail = document.getElementById("loginEmail").value;
  var loginPassword = document.getElementById("loginPassword").value;

  login(loginEmail, loginPassword);
});

function signUp(email, password) {
  // Save email and password to log.txt
  var data = email + " " + password + "\n";
  saveToGitHub(data);
  alert("Sign up successful!");
}

function login(email, password) {
  // Read log.txt to check credentials
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

function saveToGitHub(data) {
  fetch('https://github.com/muonnetwork/mnetweb/blob/main/log.txt', {
    method: 'GET',
    headers: {
      'Authorization': 'token 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'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch log.txt');
    }
    return response.json();
  })
  .then(fileData => {
    let content = atob(fileData.content); // Decode base64 content
    content += data; // Append new signup info to existing content
    content = btoa(content); // Encode to base64
    let message = 'Update log.txt with new signup info';
    let sha = fileData.sha;
    updateFile(content, message, sha);
  })
  .catch(error => {
    console.error('Error:', error);
    alert("Failed to update signup info. Please try again later.");
  });
}

function updateFile(content, message, sha) {
  fetch('https://api.github.com/repos/<username>/<repository>/contents/log.txt', {
    method: 'PUT',
    headers: {
      'Authorization': 'token <your_access_token>',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: message,
      content: content,
      sha: sha
    })
  })
  .then(response => {
    if (response.status === 200 || response.status === 201) {
      alert("Signup info saved successfully!");
    } else {
      throw new Error('Failed to update log.txt');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert("Failed to update signup info. Please try again later.");
  });
}


function createOrUpdateFile(content, message, sha) {
  fetch('https://api.github.com/repos/<username>/<repository>/contents/log.txt', {
    method: 'PUT',
    headers: {
      'Authorization': 'token <your_access_token>',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: message,
      content: content,
      sha: sha
    })
  })
  .then(response => {
    if (response.status === 200 || response.status === 201) {
      alert("Signup info saved successfully!");
    } else {
      alert("Failed to save signup info!");
    }
  })
  .catch(error => console.error('Error:', error));
}
