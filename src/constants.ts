export const googleMapAPIKey = "AIzaSyD05puWQ47xCSsLFknqNzRHt_dBCX-7ydg";

export const GetAPI = () =>
  window.location.host === "localhost:3000"
    ? "https://localhost:49153"
    : "https://eventsinfoapi.azurewebsites.net";

export const FAVOURITE_EVENTS = "FAVOURITE_EVENTS";
