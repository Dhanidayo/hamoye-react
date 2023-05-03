import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../../utils/helpers";
import { Slide, toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState(null);
  const [passErr, setPassErr] = useState();
  const navigate = useNavigate();

  const handleEmailValidation = (e) => {
    const emailInputValue = e.target.value.trim();
    const emailInputFieldName = e.target.name;

    if (emailInputFieldName === "email") {
      const pattern =
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i || /\S+@\S+\.\S+/;
      let validEmail = pattern.test(emailInputValue);
      let errMsg = "";
      if (!emailInputValue || emailInputValue === "") {
        errMsg = "Email is required";
      } else if (!validEmail) {
        errMsg = "Invalid email";
      } else {
        errMsg = "";
      }
      setEmailErr(errMsg);
    }
  };

  const handlePasswordValidation = (e) => {
    const passwordInputValue = e.target.value.trim();
    const passwordInputFieldName = e.target.name;

    if (passwordInputFieldName === "password") {
      let errMsg = "";
      if (!passwordInputValue || passwordInputValue === "") {
        errMsg = "Password is required";
      } else {
        errMsg = "";
      }
      setPassErr(errMsg);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Find user from db
    const userData = database.find((user) => user.email === email);

    if (!userData) {
      setPassErr("Invalid credentials");
    } else {
      if (password !== userData.password) {
        setPassErr("Wrong password");
      } else if (email !== userData.email) {
        setEmailErr("Wrong email address");
      } else {
        toast.success(`Login successful!`, {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 3000,
        });
        localStorage.setItem("hamoye-user", email);
        navigate("/dashboard");
      }
    }
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log in</h3>
      <label>Email: </label>
      <input
        type="email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        onKeyUp={handleEmailValidation}
      />
      {<p className="error-message">{emailErr}</p>}

      <label>Password: </label>
      <input
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        onKeyUp={handlePasswordValidation}
      />
      {<p className="error-message">{passErr}</p>}

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
