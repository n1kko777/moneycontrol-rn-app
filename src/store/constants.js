let localhost =
  process.env.NODE_ENV === "production"
    ? "https://mncntrl.ru"
    : "http://192.168.0.16:8000";

const apiURL = "/api/v1";

export const url = `${localhost}`;
export const endpointAPI = `${url}${apiURL}`;
