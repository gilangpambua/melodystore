import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    const storedAccounts = JSON.parse(localStorage.getItem("accounts")) || {};
    const storedPassword = storedAccounts[username];

    if (!storedPassword) {
      setErrorMessage("Username not found. Please register an account.");
      return;
    }

    const loginAttempts =
      JSON.parse(localStorage.getItem("loginAttempts")) || {};
    const attempts = loginAttempts[username] || 0;
    const accountLocked = loginAttempts[`${username}_locked`] === true;

    if (accountLocked) {
      setErrorMessage("Account is locked. Please reset your password.");
      return;
    }

    if (password === storedPassword) {
      localStorage.setItem(
        "loginAttempts",
        JSON.stringify({ ...loginAttempts, [username]: 0 })
      );
      localStorage.setItem("token", setIsAuthenticated);
      alert("Login successful!");
      setIsAuthenticated(true);
      window.location.href = "/";
    } else {
      const updatedAttempts = attempts + 1;
      const isLocked = updatedAttempts >= 3;
      localStorage.setItem(
        "loginAttempts",
        JSON.stringify({
          ...loginAttempts,
          [username]: updatedAttempts,
          [`${username}_locked`]: isLocked,
        })
      );

      if (isLocked) {
        setErrorMessage("Account is locked. Please reset your password.");
      } else {
        setErrorMessage(
          `Incorrect password. ${3 - updatedAttempts} attempts left.`
        );
      }
    }
  };

  return (
    <div>
      <div className="text-[32px] font-bold py-[25px] flex justify-left px-[50px]">
        MELODY STORE
      </div>
      <div className="flex justify-center font-bold gap-[170px] text-[24px] pt-[20px]">
        <a href="/login">
          <div className="text-[#1A719C]">Login</div>
        </a>
        <a href="/register">
          <div>SignUp</div>
        </a>
      </div>
      <div className="flex justify-center font-bold text-[32px] pt-[40px] pb-[40px]">
        Login to Your Account
      </div>
      <div className="flex justify-center font-bold text-left text-[20px]">
        <form
          className="flex justify-between gap-[54px]"
          onSubmit={handleLogin}
        >
          <div className="grid gap-[20px]">
            <div>
              <div className="pl-[17px]">Username</div>
              <div className="pt-[11px]">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[65px] rounded-[20px]"
                />
              </div>
            </div>
            <div>
              <div className="pl-[17px]">Password</div>
              <div className="pt-[11px]">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[65px] rounded-[20px]"
                />
              </div>
            </div>
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            <div className="flex place-content-end">
              <button
                type="submit"
                className="w-[125px] h-[56px] bg-[#1A719C] rounded-[10px] text-white"
              >
                Login
              </button>
            </div>
            <div className="text-center pb-[20px]">
              <a href="/reset-password" className="text-[#1A719C]">
                Forgot Password?
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
