import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// for signing in using firebase authentication
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  // signing in with email and password
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // used to check if user is signed in or not, returns user object in property currentUser if signed in
      const auth = getAuth();
      // checks with firebase Auth if user with given email/pass exist and signs in and returns user if yes
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // if true it means user is signed in so redirect to explore page
      if (userCredential.user) {
        toast.success("Signed in");
        navigate("/");
      }
    } catch (error) {
      toast.error("Bad User Credentials");
    }
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>

        <form onSubmit={onSubmit}>
          <input
            type="email"
            className="emailInput"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />
          <div className="passwordInputDiv">
            <input
              type={showPassword ? "text" : "password"}
              className="passwordInput"
              placeholder="password"
              id="password"
              value={password}
              onChange={onChange}
            />
            <img
              src={visibilityIcon}
              alt="show password"
              className="showPassword"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>

          <Link to="/forgot-password" className="forgotPasswordLink">
            Forgot Password
          </Link>
          <div className="signInBar">
            <p className="signInText">Sign In</p>
            <button className="signInButton">
              <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>

          <OAuth />

          <Link to="/sign-up" className="registerLink">
            Sign Up Instead
          </Link>
        </form>
      </div>
    </>
  );
};

export default SignIn;
