import React from "react";
import { Page, Navbar } from "konsta/react";
import axios from "axios";
import IconButton from "./components/icon";
import { Routes, Route, useLocation } from "react-router-dom";
import Logo from "./components/logo";
import { useAppContext } from "./components/app-context";
import SynthesisPage from "./pages/synthesis/synthesis";
import HomePage from "./pages/home/home";
import { RouteWithSplash } from "./pages/splash/splash";
import AppToolbar from "./components/toolbar";
import AppBar from "./components/navbar";

axios.defaults.baseURL = "/api";

export default function App() {
  const { isSplashVisible } = useAppContext();

  return (
    <Page className="bg-gray-100 pb-11">
      {!isSplashVisible && <AppBar />}

      <Routes>
        <Route path="/" element={<RouteWithSplash element={<HomePage />} />} />
        <Route
          path="/synthesis"
          element={<RouteWithSplash element={<SynthesisPage />} />}
        />
      </Routes>

      {!isSplashVisible && <AppToolbar />}
    </Page>
  );
}
