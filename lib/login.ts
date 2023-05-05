const clientId = "18ff4fca5a744f3a8cc0a54c321a5d33"; // Replace with your client id
const authURL = "https://api.spotify.com/authorize"; 
const redirectURI = "http://localhost:3000"
const scopes = 
  "streaming" +
  "user-read-email" + 
  "user-read-private" +
  "user-library-read" + 
  "user-library-modify" +
  "user-read-playback-state" +
  "user-modify-playback-state";

const getLoginUrl = () => {
  let url = new URL(authURL);
  url.searchParams.append("redirect_uri", redirectURI);
  url.searchParams.append("scope", scopes );
  url.searchParams.append("client_id", clientId);
  url.searchParams.append("response_type", "code");
}

const login = () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  
}