import { useState } from "react";

function buildPath(route: string): string {
  if (import.meta.env.MODE === "development") {
    return "http://localhost:5000/" + route;
  }
  return "/" + route;
}

function Login() {
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginResult, setLoginResult] = useState("");

  async function doLogin(event: any): Promise<void> {
    event.preventDefault();

    const obj = { login: loginName, password: loginPassword };
    const js = JSON.stringify(obj);

    try {
      const response = await fetch(buildPath("api/login"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });

      const res = JSON.parse(await response.text());

      if (res.id <= 0) {
        setLoginResult("User/Password combination incorrect");
      } else {
        setLoginResult("");
        localStorage.setItem("userId", String(res.id));
        localStorage.setItem("firstName", res.firstName);
        localStorage.setItem("lastName", res.lastName);
        window.location.href = "/cards";
      }
    } catch (e: any) {
      setLoginResult(e.toString());
    }
  }

  return (
    <div className="login-page">
      <div className="glass-card login-card">
        <div className="login-logo">
          <span className="dive-icon">🤿</span>
          <h1>COP 4331</h1>
          <p>Deep Dive Card Manager</p>
        </div>
        <div className="login-form">
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              className="ocean-input"
              placeholder="Enter username"
              onChange={(e) => setLoginName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              className="ocean-input"
              placeholder="Enter password"
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <button className="dive-btn" onClick={doLogin}>
            Dive In
          </button>
          {loginResult && <div className="login-error">{loginResult}</div>}
          <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
            <span
              style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}
            >
              New diver?{" "}
            </span>
            <a
              href="/register"
              style={{
                fontSize: "0.8rem",
                color: "var(--biolume-cyan)",
                textDecoration: "none",
                letterSpacing: "0.05em",
              }}
            >
              Join the crew →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
