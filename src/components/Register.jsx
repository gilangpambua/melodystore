import React, { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage("Username and Password cannot be empty.");
      return;
    }

    const existingAccounts = JSON.parse(localStorage.getItem("accounts")) || {};

    if (existingAccounts[username]) {
      setMessage("Username already exists. Please choose a different one.");
      return;
    }

    const updatedAccounts = {
      ...existingAccounts,
      [username]: password,
    };

    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));

    setMessage("Registration successful!");
    window.location.href = "/login";
  };

  return (
    <div>
      <div className="text-[32px] font-bold py-[25px] flex justify-left px-[50px]">
        MELODY STORE
      </div>
      <div className="flex justify-center font-bold gap-[170px] text-[24px] pt-[20px]">
        <a href="/login">
          <div>Login</div>
        </a>
        <a href="/register">
          <div className="text-[#1A719C]">SignUp</div>
        </a>
      </div>
      <div className="flex justify-center font-bold text-[32px] pt-[40px] pb-[40px]">
        SignUp For Your Account
      </div>
      <div className="flex justify-center font-bold text-left text-[20px]">
        <form
          className="flex justify-between gap-[54px]"
          onSubmit={handleRegister}
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
            {message && (
              <div
                className={`text-${
                  message.includes("successful") ? "green" : "red"
                }-500`}
              >
                {message}
              </div>
            )}
            <div className="flex place-content-end">
              <button
                type="submit"
                className="w-[125px] h-[56px] bg-[#1A719C] rounded-[10px] text-white"
              >
                SignUp
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
