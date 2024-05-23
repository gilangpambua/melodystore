import React, { useState } from "react";

const ResetPassword = () => {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!username || !newPassword) {
      setMessage("Username and New Password cannot be empty.");
      return;
    }

    const storedAccounts = JSON.parse(localStorage.getItem("accounts")) || {};
    const storedPassword = storedAccounts[username];

    if (!storedPassword) {
      setMessage("Username not found. Please register an account.");
      return;
    }

    const updatedAccounts = {
      ...storedAccounts,
      [username]: newPassword,
    };

    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
    localStorage.setItem("loginAttempts", 0); // Reset login attempts
    localStorage.setItem("accountLocked", "false"); // Unlock account

    setMessage("Password has been reset successfully.");
    window.location.href = "/login";
  };

  return (
    <div>
      <div className="text-[32px] font-bold py-[25px] flex justify-left px-[50px]">
        MELODY STORE
      </div>
      <div className="flex justify-center font-bold text-[32px] pt-[40px] pb-[40px]">
        Reset Your Password
      </div>
      <div className="flex justify-center font-bold text-left text-[20px]">
        <form
          className="flex justify-between gap-[54px]"
          onSubmit={handleResetPassword}
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
              <div className="pl-[17px]">New Password</div>
              <div className="pt-[11px]">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
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
                Reset Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
