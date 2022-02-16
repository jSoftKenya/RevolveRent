
let baseUrl = "";
if (process.env.NODE_ENV === "development") {
  // baseUrl = "http://localhost:4000";
  baseUrl = "https://revolve-rent-backend.herokuapp.com/";
} else {
  baseUrl = "https://revolve-rent-backend.herokuapp.com/";
}


export default baseUrl;