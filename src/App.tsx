import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      console.log("PWA install prompt triggered");
      // You can show a custom install button here
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
