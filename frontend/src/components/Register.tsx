import { useState } from "react";

function buildPath(route: string): string {
  return import.meta.env.VITE_API_URL + "/" + route;
}

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  async function doRegister(event: any): Promise<void> {
    event.preventDefault();

    if (!firstName || !lastName || !login || !password) {
      setIsError(true);
      setMessage("All fields are required");
      return;
    }

    const obj = { firstName, lastName, login, password };
    const js = JSON.stringify(obj);

    try {
      const response = await fetch(buildPath("api/register"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      const res = JSON.parse(await response.text());
      if (res.error.length > 0) {
        setIsError(true);
        setMessage(res.error);
      } else {
        setIsError(false);
        setMessage("Account created! Diving in...");
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      }
    } catch (e: any) {
      setIsError(true);
      setMessage(e.toString());
    }
  }

  return (
    <div className="login-page">
      <div className="glass-card login-card" style={{ maxWidth: "460px" }}>
        <div className="login-logo">
          <span className="dive-icon">🌊</span>
          <h1>JOIN THE CREW</h1>
          <p>Create your dive account</p>
        </div>
        <div className="login-form">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <div className="input-group">
              <label>First Name</label>
              <input
                type="text"
                className="ocean-input"
                placeholder="First"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Last Name</label>
              <input
                type="text"
                className="ocean-input"
                placeholder="Last"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              className="ocean-input"
              placeholder="Choose a username"
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              className="ocean-input"
              placeholder="Choose a password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="dive-btn" onClick={doRegister}>
            Create Account
          </button>
          {message && (
            <div className={isError ? "login-error" : "success-msg"}>
              {message}
            </div>
          )}
          <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
            <span
              style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}
            >
              Already have an account?{" "}
            </span>
            <a
              href="/"
              style={{
                fontSize: "0.8rem",
                color: "var(--biolume-cyan)",
                textDecoration: "none",
                letterSpacing: "0.05em",
              }}
            >
              Dive In →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
