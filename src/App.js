import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Router from "./routes";
import FuturSpinner from "./components/FuturSpinner";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
  }, [setIsLoaded]);

  if (isLoaded) {
    return (
      <>
        <Navbar />
        <div id="main-wrapper">
          <Router />
        </div>
      </>
    );
  } else {
    return (
      <div className="flex h-screen justify-center items-center">
        <FuturSpinner />
      </div>
    );
  }
}

export default App;
