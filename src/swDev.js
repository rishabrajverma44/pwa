export default function swDev() {
  let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  navigator.serviceWorker.register(swUrl).then((response) => {
    console.warn("response", response);

    // return response.pushManager.getSubscription().then(function (subscription) {
    //   response.pushManager.subscribe({
    //     userVisibleOnly: true,
    //     applicationServerKey: determineAppServerKey(),
    //   });
    // });
  });
}
