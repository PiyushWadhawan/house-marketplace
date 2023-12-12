import React from "react";
import { useState } from "react";
// for registering user in firebase authentication
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
// for storing user in firestore database
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  // Create and register new user in firebase authentication and firestore
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Returns the Auth instance associated with the provided @firebase/app#FirebaseApp. If no instance exists, initializes an Auth instance with platform-specific default dependencies.
      const auth = getAuth();
      // Creates a new user account on firebase authentication associated with the specified email address and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(auth.currentUser);
      const user = userCredential.user;

      // Updates a user's profile data like displayname and image
      updateProfile(auth.currentUser, {
        displayName: name,
      });

      // adding user (document) to cloud firestore database in users collection
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      // doc(takes in db to connect to our firestore, collection name, name of new document), data for document
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      toast.success("Account created successfully");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong with registration");
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
            type="text"
            className="nameInput"
            placeholder="name"
            id="name"
            value={name}
            onChange={onChange}
          />
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
          <div className="signUpBar">
            <p className="signUpText">Sign Up</p>
            <button className="signUpButton">
              <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>

          <OAuth />

          <Link to="/sign-in" className="registerLink">
            Sign In Instead
          </Link>
        </form>
      </div>
    </>
  );
};

export default SignUp;
