import React, { useState } from "react";
import SignUp from "../SignUp/SignUp.jsx";
import SignIn from "./SignIn.jsx";
import xIcon from "../../assets/Icons/x0.svg";
import styles from "./SignInMain.module.css";

const Title = ({ isSignUp }) => (
  <div className={styles.signInTitle}>
    {isSignUp ? "Sign Up" : "Sign In"}
  </div>
);

const SwitchText = ({ isSignUp, switchToSignUp, switchToSignIn }) => (
    <div className={styles.SwitchFrame}>
      <div className={styles.AskSwitch}>
        {isSignUp ? "Already have an account?" : "Don't you have any account?"}
      </div>
      <div
        className={styles.signUpText}
        onClick={isSignUp ? switchToSignIn : switchToSignUp}
      >
        {isSignUp ? "Sign In" : "Sign Up"}
      </div>
    </div>
);

const CloseButton = ({ handleClose }) => (
  <img className={styles.close} src={xIcon} alt="Close" onClick={handleClose} />
);

function Sign({ isOpen, close }) {
  const [isSignUp, setIsSignUp] = useState(false);

  const switchToSignUp = () => setIsSignUp(true);
  const switchToSignIn = () => setIsSignUp(false);
  const handleClose = () => {
    setIsSignUp(false);
    close();
  };

  return isOpen ? (
    <div className={styles.modal}>
      <div className={styles.signInFrame}>
        <Title isSignUp={isSignUp} />
        <div className={styles.MainFrame}>
          {isSignUp ? (
            <SignUp switchToSignIn={switchToSignIn} close={handleClose} />
          ) : (
            <SignIn switchToSignUp={switchToSignUp} close={handleClose} />
          )}
          <SwitchText
            isSignUp={isSignUp}
            switchToSignUp={switchToSignUp}
            switchToSignIn={switchToSignIn}
          />
        </div>
        <CloseButton handleClose={handleClose} />
      </div>
    </div>
  ) : null;
}

export default Sign;
