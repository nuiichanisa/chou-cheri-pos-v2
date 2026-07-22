if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      await navigator.serviceWorker.register("/sw.js");
      console.log("SW Registered");
    } catch (e) {
      console.error(e);
    }
  });
}