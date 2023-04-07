import axios from 'axios';

// const clientID = '7e015d8ce32370079895';
// const clientSecret = '2b976af0e6b6ceea2b1554aa31d1fe94ea692cd9';

const clientID = 'da1007c94a0a6d983a80';
const clientSecret = 'a36c50fcb847719033a9d3c363f73a4d9bf2a3dc';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestToken = req.query.code;

  console.log('authorization code:', requestToken);
  if (!requestToken) {
    res.status(200).json({ error: 'token error' });
    return;
  }

  const tokenResponse = await axios({
    method: 'post',
    url:
      'https://github.com/login/oauth/access_token?' +
      `client_id=${clientID}&` +
      `client_secret=${clientSecret}&` +
      `code=${requestToken}`,
    headers: {
      accept: 'application/json',
    },
  });

  const accessToken = tokenResponse.data.access_token;
  console.log(`access token: ${accessToken}`);

  const result = await axios({
    method: 'get',
    url: `https://api.github.com/user`,
    headers: {
      accept: 'application/json',
      Authorization: `token ${accessToken}`,
    },
  });
  console.log(result.data);
  const name = result.data.name;

  res.redirect(307, `/?name=${name}`);
}
