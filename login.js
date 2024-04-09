function saveToGitHub(data) {
  const accessToken = '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'; // Replace with your GitHub access token
  const username = 'muonnetwork'; // Replace with your GitHub username
  const repository = 'mnetweb'; // Replace with your repository name

  fetch(`https://api.github.com/repos/${username}/${repository}/contents/log.txt`, {
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
  const accessToken = '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'; // Replace with your GitHub access token
  const username = 'muonnetwork'; // Replace with your GitHub username
  const repository = 'mnetweb'; // Replace with your repository name

  fetch(`https://api.github.com/repos/${username}/${repository}/contents/log.txt`, {
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
