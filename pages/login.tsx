import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import { BsSpotify } from "react-icons/bs";

function Login( props: any) {
  const { data: session, status } = useSession();
  console.log(session)
  return (
    <div className="h-screen flex flex-col justify-center items-center">
        
      <BsSpotify size={80} className="text-emerald-600"/>
      {props.providers !== null && Object.values(props.providers).map((provider: any) => (
        <div key={provider.name}>
          <button 
            className="text-neutral-900 rounded-full p-4 mt-4 bg-emerald-600"
            onClick={() => signIn(provider.id, {callbackUrl: "/"})}
          >Login with {provider.name}</button>
          <button 

            className="text-neutral-900 rounded-full p-4 mt-4 bg-emerald-600"
            onClick={() => signOut()}
          >Logout</button>
        </div>
      ))}
     

    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();  
  
  return {
    props: {
      providers,
    }
  }
}