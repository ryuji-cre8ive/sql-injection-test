import mysql from 'serverless-mysql';
import { NextResponse } from 'next/server';

const db = mysql({
  config: {
    host: '127.0.0.1',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'my-secret-pw',
    database: process.env.DATABASE_NAME || 'mydatabase'
  }
});

export async function POST(req: Request) {
  await db.connect()
  let result: any
  try{
    const res = await req.json()
    console.log('res', res)
    const query = `SELECT * FROM users WHERE email = '${res.email}' AND password = '${res.password}'`;
    result = await db.query(query)
  db.end()
  }catch(err) {
    console.error('error details: ', err)
  }
  
  if (result.length > 0) {
    return NextResponse.json({ status: 200, message: 'Logged in successfully' });
  } else {
    return NextResponse.json({ status: 401, message: 'Email or password is incorrect' });
  }
}