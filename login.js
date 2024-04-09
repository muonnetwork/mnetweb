// Function to handle user signup
function signup(email, password) {
  const data = email + ' ' + password + '\n';
  saveToGitHub(data);
}

// Function to handle user login
function login(email, password) {
  fetchLogFileContent()
    .then(credentials => {
      const isValid = credentials.some(cred => cred.email === email && cred.password === password);
      if (isValid) {
        alert('Login successful!');
      } else {
        alert('Invalid email or password');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to log in. Please try again later.');
    });
}

// Function to save signup info to GitHub
function saveToGitHub(data) {
  const accessToken = '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'; // Replace with your GitHub access token
  const url = 'https://api.github.com/repos/muonnetwork/mnetweb/contents/log.txt';

  fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `token ${accessToken}`
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch log.txt');
    }
    return response.json();
  })
  .then(fileData => {
    let content = atob(fileData.content || ''); // Decode base64 content
    content += data; // Append new signup info to existing content
    content = btoa(content); // Encode to base64
    const message = 'Update log.txt with new signup info';
    const sha = fileData.sha;
    updateFile(content, message, sha);
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Failed to save signup info. Please try again later.');
  });
}

// Function to fetch content of log.txt file from GitHub
function fetchLogFileContent() {
  const accessToken = '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'; // Replace with your GitHub access token
  const url = 'https://api.github.com/repos/muonnetwork/mnetweb/contents/log.txt';

  return fetch(url, {
    headers: {
      'Authorization': `token ${accessToken}`
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch log.txt');
    }
    return response.json();
  })
  .then(data => {
    const content = atob(data.content || ''); // Decode base64 content
    const credentials = content.split('\n').map(line => {
      const [email, password] = line.split(' ');
      return { email, password };
    });
    return credentials;
  });
}

// Function to update log.txt file on GitHub
function updateFile(content, message, sha) {
  const accessToken = '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'; // Replace with your GitHub access token
  const url = 'https://api.github.com/repos/muonnetwork/mnetweb/contents/log.txt';

  fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: message,
      content: content,
      sha: sha
    })
  })
  .then(response => {
    if (response.ok) {
      alert('Signup info saved successfully!');
    } else {
      throw new Error('Failed to save signup info');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Failed to save signup info. Please try again later.');
  });
}
