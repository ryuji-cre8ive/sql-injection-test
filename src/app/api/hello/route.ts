import mysql from 'mysql';



export async function GET(request: Request) {
  return new Response('Hello, Next.js!')
}

export async function POST(request: any) {
  const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'my-secret-pw',
    database: 'mydatabase'
  });
  
  connection.connect(async function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return new Response('Error connecting to database');
    }

    console.log('connected as id ' + connection.threadId);

    const query = `SELECT * FROM users WHERE email = '${request.email}'`;
    connection.query(query, async function (error, results, fields) {
      if (error) {
        console.error(error);
        return new Response('Error querying database');
      }

      if (results.length === 0) {
        return new Response('User not found');
      }

      const user = results[0];

      if (user.password !== request.password) {
        return new Response('Incorrect password');
      }

      return new Response('Logged in successfully');
    });
  });

  return new Response('Connecting to database');
}