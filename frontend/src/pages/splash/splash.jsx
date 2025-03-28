import { useLocation } from "react-router-dom";
import { useAppContext } from "../../components/app-context";
import SplashScreen from "./splash-screen";
import { useEffect } from "react";

export const RouteWithSplash = ({ element }) => {
  const { isSplashVisible, setSplashVisible } = useAppContext();
  const location = useLocation(); // Get current route location

  useEffect(() => {
    // Show splash screen on route change
    setSplashVisible(true);
    const timer = setTimeout(() => {
      setSplashVisible(false); // Hide splash after delay
    }, 2000);

    return () => clearTimeout(timer);
  }, [location.pathname, setSplashVisible]);

  return isSplashVisible ? <SplashScreen /> : element;
};
