import { useEffect, useState } from 'react';


const client_id = 'da1007c94a0a6d983a80';
const authorize_uri = 'https://github.com/login/oauth/authorize';

const Login = () => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  useEffect(() => {
    const search = globalThis.location?.search || '';
    const params = new URLSearchParams(search);
    const n = params.get('name');
    if (n) {
      setName(n);
    } else {
      const redirect_uri = `${location.protocol}//${location.host}/api/oauth/redirect`;
      setLink(`${authorize_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}`);
    }
  }, [name, link]);
  return (
    <p style={{ position: 'fixed', right: 0, top: 0 }}>
      {
        name ? <a>{name}</a> : <a href={link}>login with github</a>
      }
    </p>
  )
}

export default Login