export default function swDev() {
  let swUrl = `${process.env.PUBLIC_URL}/sw.js`;

  // Register the Service Worker
  navigator.serviceWorker.register(swUrl).then((response) => {
    console.warn("Service Worker registered:", response);
  });
}

// Function to trigger background sync and save data to localStorage
const registerBackgroundSync = async (data) => {
  if ("serviceWorker" in navigator && "SyncManager" in window) {
    const registration = await navigator.serviceWorker.ready;
    console.log("Service Worker is ready. Registering sync...");
    await registration.sync.register("syncData");
    console.log("Background Sync registered for syncData");

    // Save data to localStorage
    localStorage.setItem("syncData", JSON.stringify(data));
  } else {
    console.error("Background Sync is not supported in this browser.");
  }
};

// Example usage
const data = { name: "John Doe", task: "Submit Report" };
registerBackgroundSync(data); // This triggers sync registration and stores the data
