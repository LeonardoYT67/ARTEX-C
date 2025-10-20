const https = require('https');
module.exports = async (req, res) => {
  const CLOUD = process.env.CLOUDINARY_CLOUD_NAME;
  const KEY = process.env.CLOUDINARY_API_KEY;
  const SECRET = process.env.CLOUDINARY_API_SECRET;
  if(!CLOUD || !KEY || !SECRET){
    return res.status(500).json({ error: 'Cloudinary env vars not set. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.'});
  }
  const auth = Buffer.from(KEY + ':' + SECRET).toString('base64');
  const options = {
    hostname: 'api.cloudinary.com',
    path: `/v1_1/${CLOUD}/resources/image/upload?max_results=100`,
    method: 'GET',
    headers: { 'Authorization': 'Basic ' + auth }
  };
  const request = https.request(options, response => {
    let data = '';
    response.on('data', chunk => data += chunk);
    response.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        res.status(response.statusCode).json(parsed.resources || parsed);
      } catch (e) {
        res.status(500).json({ error: 'Invalid JSON from Cloudinary' });
      }
    });
  });
  request.on('error', (err) => res.status(500).json({ error: err.message }));
  request.end();
};