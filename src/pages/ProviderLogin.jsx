import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import '../styles/Login.css'


function LoginPage() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  

  return (
    <div className="login_page">
    <div className={`loginContainer ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form loginForm">
            <h2 className="title">Sign in</h2>

            <div className="input-field">
              <FontAwesomeIcon icon={faUser} className='my-auto mx-auto'/>
              <input className='LoginInput' type="text" placeholder="Name" />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faEnvelope} className='my-auto mx-auto'/>
              <input className='LoginInput' type="email" placeholder="Email" />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} className='my-auto mx-auto'/>
              <input className='LoginInput' type="password" placeholder="Password" />
            </div>
            <button className='btn'>Sign In</button>
           
            <p className="social-text loginp"> Sign in with social platforms</p>
            <div className="social-media">
              
              <a href="#" className="social-icon">
                <FontAwesomeIcon icon={faGoogle} className='my-auto mx-auto'/>
              </a>
              <a href="#" className="social-icon">
                <FontAwesomeIcon icon={faLinkedinIn} className='my-auto mx-auto'/>
              </a>
            </div>
          </form>
          <form action="#" className="sign-up-form loginForm">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <FontAwesomeIcon icon={faUser} className='my-auto mx-auto'/>
              <input className='LoginInput' type="text" placeholder="Name" />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faEnvelope} className='my-auto mx-auto'/>
              <input className='LoginInput' type="text" placeholder="Location" />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faUser} className='my-auto mx-auto'/>
              <input className='LoginInput' type="text" placeholder="Contact" />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faUser} className='my-auto mx-auto'/>
              <input className='LoginInput' type="email" placeholder="Mail" />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} className='my-auto mx-auto'/>
              <input className='LoginInput' type="number" placeholder="Pincode" />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faUser} className='my-auto mx-auto'/>
              <input className='LoginInput' type="password" placeholder="Password" />
            </div>
 
            <button className='btn'>Sign Up</button>
            <p className="social-text loginp">Or Sign up with social platforms</p>
            <div className="social-media">
             
              <a href="#" className="social-icon">
                <FontAwesomeIcon icon={faGoogle} className='my-auto mx-auto'/>
              </a>
              <a href="#" className="social-icon">
                <FontAwesomeIcon icon={faLinkedinIn} className='my-auto mx-auto'/>
              </a>
            </div>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3 className='loginh3'>New here?</h3>
            <p className='loginp'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button className="btn transparent" onClick={handleSignUpClick}>
              Sign up
              </button>
          </div>
          <img src="/img/dogLogin1.svg" class="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3 className='loginh3'>One of us ?</h3>
            <p className='loginp'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button onClick={handleSignInClick} className="btn transparent" id="sign-in-btn">
              Sign in
            </button>
          </div>
          <img src="/img/dogLogin.svg" class="image" alt="" />
        </div>
      </div>
    </div>
    </div>
  )}

export default LoginPage
