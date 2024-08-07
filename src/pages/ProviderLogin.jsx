import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile_no, setMobile_no] = useState("");
  const [mail, setMail] = useState("");
  const [pincode, setPincode] = useState("");
  const [password, setPassword] = useState("");
  const [signInName, setSignInName] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const navigate = useNavigate();

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://rescue-bite-server-cusm09jr6-amols-projects-604b6fbf.vercel.app/provider_signup",
        {
          name,
          address,
          mobile_no,
          mail,
          pincode,
          password,
        }
      );
      console.log(response.data);
      toast.success("Signup Successful");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Signup Failed");
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://rescue-bite-server-cusm09jr6-amols-projects-604b6fbf.vercel.app/provider_signin",
        {
          name: signInName,
          email: signInEmail,
          password: signInPassword,
        }
      );
      console.log(response.data);
      toast.success("Signin Successful");
      localStorage.setItem("token", response.data.token);
      navigate("/providerdashboard");
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className="login_page">
      <ToastContainer autoClose={2500} />
      <div className={`loginContainer ${isSignUpMode ? "sign-up-mode" : ""}`}>
        <div className="forms-container">
          <div className="signin-signup">
            <form
              action="#"
              className="sign-in-form loginForm"
              onSubmit={handleSignIn}
            >
              <h2 className="title">Sign in</h2>

              <div className="input-field">
                <FontAwesomeIcon icon={faUser} className="my-auto mx-auto" />
                <input
                  className="LoginInput"
                  type="text"
                  placeholder="Name"
                  value={signInName}
                  onChange={(e) => setSignInName(e.target.value)}
                />
              </div>
              <div className="input-field">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="my-auto mx-auto"
                />
                <input
                  className="LoginInput"
                  type="email"
                  placeholder="Email"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                />
              </div>
              <div className="input-field">
                <FontAwesomeIcon icon={faLock} className="my-auto mx-auto" />
                <input
                  className="LoginInput"
                  type="password"
                  placeholder="Password"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                />
              </div>

              <button className="btn" type="submit">
                Sign In
              </button>

              <p className="social-text loginp">
                Sign in with social platforms
              </p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <FontAwesomeIcon
                    icon={faGoogle}
                    className="my-auto mx-auto"
                  />
                </a>
                <a href="#" className="social-icon">
                  <FontAwesomeIcon
                    icon={faLinkedinIn}
                    className="my-auto mx-auto"
                  />
                </a>
              </div>
            </form>

            <form
              action="#"
              className="sign-up-form loginForm"
              onSubmit={handleSignUp}
            >
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <FontAwesomeIcon icon={faUser} className="my-auto mx-auto" />
                <input
                  className="LoginInput"
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div className="input-field">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="my-auto mx-auto"
                />
                <input
                  className="LoginInput"
                  type="text"
                  placeholder="Location"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
              </div>
              <div className="input-field">
                <FontAwesomeIcon icon={faUser} className="my-auto mx-auto" />
                <input
                  className="LoginInput"
                  type="tel"
                  placeholder="Contact"
                  onChange={(e) => setMobile_no(e.target.value)}
                  value={mobile_no}
                />
              </div>
              <div className="input-field">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="my-auto mx-auto"
                />
                <input
                  className="LoginInput"
                  type="email"
                  placeholder="Mail"
                  onChange={(e) => setMail(e.target.value)}
                  value={mail}
                />
              </div>
              <div className="input-field">
                <FontAwesomeIcon icon={faLock} className="my-auto mx-auto" />
                <input
                  className="LoginInput"
                  type="number"
                  placeholder="Pincode"
                  onChange={(e) => setPincode(e.target.value)}
                  value={pincode}
                />
              </div>
              <div className="input-field">
                <FontAwesomeIcon icon={faLock} className="my-auto mx-auto" />
                <input
                  className="LoginInput"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>

              <button className="btn" type="submit">
                Sign Up
              </button>
              <p className="social-text loginp">
                Or Sign up with social platforms
              </p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <FontAwesomeIcon
                    icon={faGoogle}
                    className="my-auto mx-auto"
                  />
                </a>
                <a href="#" className="social-icon">
                  <FontAwesomeIcon
                    icon={faLinkedinIn}
                    className="my-auto mx-auto"
                  />
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3 className="loginh3">New here?</h3>
              <p className="loginp">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Debitis, ex ratione. Aliquid!
              </p>
              <button className="btn transparent" onClick={handleSignUpClick}>
                Sign up
              </button>
            </div>
            {/* <img src="/img/dogLogin1.svg" className="image" alt="" /> */}
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3 className="loginh3">One of us?</h3>
              <p className="loginp">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                laboriosam ad deleniti.
              </p>
              <button
                onClick={handleSignInClick}
                className="btn transparent"
                id="sign-in-btn"
              >
                Sign in
              </button>
            </div>
            {/* <img src="/img/dogLogin.svg" className="image" alt="" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
