export const googleMapAPIKey = "AIzaSyD05puWQ47xCSsLFknqNzRHt_dBCX-7ydg";

export const GetAPI = () =>
  window.location.host === "localhost"
    ? "localhost:49153"
    : "https://eventsinfoapi.azurewebsites.net";
