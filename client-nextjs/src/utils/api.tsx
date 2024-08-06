import wretch from "wretch";
import cst from "./constants";

const api = wretch(cst.API_URL).accept("application/json");

export default api;
