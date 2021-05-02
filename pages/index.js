import Head from 'next/head'
import styles from '../styles/Home.module.css'
import useApi from '../lib/use-api';

import { useUser } from '@auth0/nextjs-auth0';


export default function Home() {
  const { user, error, isLoading } = useUser();


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  let userDetails = {};

   if (user){
  
    console.log(JSON.stringify(user));
    console.log("about to hit the api");
    const { response, error, isLoading } = useApi('/api/userprofile');

    console.log(`response: ${JSON.stringify(response)}`);

    userDetails = response;

   }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>


        {(user && userDetails) ? <div>Welcome {user.name}! <a href="/api/auth/logout">Logout</a></div> : <a href="/api/auth/login">Login</a>}

        <h1 className={styles.title}>
          Idam profile site.
        </h1>

        {(user && userDetails) ?

          <div className={styles.grid}>
            <div className={styles.card}>
              <label>Firstname&nbsp;
                <input type="text" value={userDetails.firstName} />
              </label>            
            </div>

            <div className={styles.card}>
              <label>Lastname&nbsp;
                <input type="text" value={userDetails.lastName} />
              </label>            
            </div>

            <div className={styles.card}>
              <label>Email&nbsp;
                <input type="text" value={userDetails.emailAddress} />
              </label>            
            </div>

            <div className={styles.card}>            
                <button>Update</button>            
            </div>          
          </div>

         :

          <p className={styles.description}></p>

        }

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
