document.addEventListener("DOMContentLoaded", function(event) { 
    window.hubspotutk = document.cookie
      .split("; ")
      .find((row) => row.startsWith("hubspotutk="))
      ?.split("=")[1];
});