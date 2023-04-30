import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState(null);
  const [passErr, setPassErr] = useState();
  const navigate = useNavigate();

  const handleEmailValidation = (e) => {
    const emailInputValue = e.target.value.trim();
    const emailInputFieldName = e.target.name;

    if (emailInputFieldName === "email" || emailInputFieldName === "orgEmail") {
      const pattern =
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i || /\S+@\S+\.\S+/;
      let validEmail = pattern.test(emailInputValue);
      let errMsg = "";
      if (!emailInputValue || emailInputValue === "") {
        errMsg = "Required";
      } else if (!validEmail) {
        errMsg = "Email is not valid";
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
      const minLengthRegExp = /.{6,}/;
      const minLengthPassword = minLengthRegExp.test(passwordInputValue);

      let errMsg = "";
      if (!minLengthPassword) {
        errMsg = "Password should be at least a minumum of 6 characters";
      } else {
        errMsg = "";
      }
      setPassErr(errMsg);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    localStorage.setItem("hamoye-user", email);
    navigate("/dashboard");
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
