
let baseUrl = "";
if (process.env.NODE_ENV === "development") {
  baseUrl = "http://localhost:4000";
} else {
  baseUrl = "https://revolverent-backend.herokuapp.com";
}


export default baseUrl;