import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import { BsSpotify } from "react-icons/bs";

function Login( props: any) {
  const { data: session, status } = useSession();

  return (
    <div className="h-screen flex flex-col justify-center items-center">
        
      <BsSpotify size={98} className="text-emerald-600"/>
      {props.providers !== null && Object.values(props.providers).map((provider: any) => (
        <div key={provider.name}>
          <button 
            className="
              text-neutral-800
              text-xl
              font-bold
              rounded-full
              p-4
              mt-4
              bg-emerald-600
              whitespace-nowrap
            "
            onClick={() => signIn(provider.id, {callbackUrl: "/"})}
          >Login with {provider.name}</button>
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