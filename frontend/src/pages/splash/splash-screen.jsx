import React from "react";
import "./splash-screen.scss";
import Logo from "../../components/logo";
import AnimatedMouth from "../../components/animated-mouth/animated-mouth";

export default function SplashScreen() {
  return (
    <div className="container bg-gray-400 z-100">
      <div className="animated-mouth">
        <AnimatedMouth />
      </div>
      <div className="logo">
        <Logo />
        <span>Right!</span>
        {/* <Block strong inset>
          Practice your German pronunciation with audio recording and
          text-to-speech.
        </Block> */}
      </div>
    </div>
  );
}
