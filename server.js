const http = require('http');
const https = require('https');
const { URL } = require('url');

const PORT = 3000;

// Read URL from environment variables
const TARGET_URL = process.env.URL || 'https://127.0.0.1:8200/v1/lab_secret/data/lab/app-1';

// Function to fetch data from URL
function fetchUrl(urlString, callback) {
  if (!urlString) {
    return callback(null, 'URL not set in environment variables');
  }

  try {
    const url = new URL(urlString);
    const client = url.protocol === 'https:' ? https : http;

    const request = client.get(urlString, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        callback(null, data);
      });
    });

    request.on('error', (error) => {
      callback(error, null);
    });

    request.setTimeout(5000, () => {
      request.destroy();
      callback(new Error('Request timeout'), null);
    });
  } catch (error) {
    callback(error, null);
  }
}

// Create HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Time is: ' + new Date().toISOString() + '\n');

  res.write('Target URL: ' + (TARGET_URL || 'not set') + '\n\n');

  if (TARGET_URL) {
    fetchUrl(TARGET_URL, (error, data) => {
      if (error) {
        res.write('Error fetching URL: ' + error.message);
      } else {
        res.write('Response from URL:\n' + data);
      }
      res.end();
    });
  } else {
    res.end();
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

