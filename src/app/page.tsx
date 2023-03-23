'use client'
import React from 'react'


export default function Home() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async(event: any) => {
    event.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
    const body = JSON.stringify({
      email: email,
      password: password
    })
    try {
      const res = await fetch('/api/hello', {method: 'POST', headers, body})
      const result = await res.json()
      console.log('result', result)
      if (result.status == 200) {
        alert('ok!\n' + result.message)
      } else {
        alert(result.message)
      }
    }catch(err) {
      console.error("error details: ",err)
    }
    
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  );
}
