import { useState } from "react";

function buildPath(route: string): string {
  if (import.meta.env.MODE !== "development") {
    return "http://129.212.179.35:5000/" + route;
  } else {
    return "http://localhost:5000/" + route;
  }
}

function CardUI() {
  const firstName = localStorage.getItem("firstName") || "Diver";
  const lastName = localStorage.getItem("lastName") || "";
  const userId = Number(localStorage.getItem("userId")) || 1;

  const [cardText, setCardText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [message, setMessage] = useState("");
  const [results, setResults] = useState<any[]>([]);

  function doLogout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    window.location.href = "/";
  }

  async function addCard(event: any): Promise<void> {
    event.preventDefault();
    const obj = { userId: userId, card: cardText };
    const js = JSON.stringify(obj);
    try {
      const response = await fetch(buildPath("api/addCard"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      const res = JSON.parse(await response.text());
      if (res.error.length > 0) {
        setMessage("Error: " + res.error);
      } else {
        setMessage("Card logged to the deep ✓");
        setCardText("");
      }
    } catch (e: any) {
      setMessage(e.toString());
    }
  }

  async function searchCard(event: any): Promise<void> {
    event.preventDefault();
    const obj = { userId: userId, search: searchText };
    const js = JSON.stringify(obj);
    try {
      const response = await fetch(buildPath("api/searchCards"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      const res = JSON.parse(await response.text());
      setResults(res.results);
    } catch (e: any) {
      setResults([]);
    }
  }

  return (
    <div className="cards-page">
      <div className="cards-header">
        <div className="cards-header-left">
          <h1>🤿 DIVE LOG</h1>
          <p>
            Welcome back, {firstName} {lastName}
          </p>
        </div>
        <button className="logout-btn" onClick={doLogout}>
          Surface ↑
        </button>
      </div>
      <div className="cards-grid">
        <div className="glass-card panel">
          <h2>⬡ Log a Card</h2>
          <div className="input-group">
            <label>Card Text</label>
            <input
              type="text"
              className="ocean-input"
              placeholder="What did you discover?"
              value={cardText}
              onChange={(e) => setCardText(e.target.value)}
            />
          </div>
          <button className="panel-btn" onClick={addCard}>
            Drop to Depth
          </button>
          {message && <div className="success-msg">{message}</div>}
        </div>
        <div className="glass-card panel">
          <h2>⬡ Search Cards</h2>
          <div className="input-group">
            <label>Search Term</label>
            <input
              type="text"
              className="ocean-input"
              placeholder="Search the depths..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <button className="panel-btn" onClick={searchCard}>
            Sonar Ping
          </button>
        </div>
      </div>
      {results.length > 0 && (
        <div className="glass-card panel results-section">
          <h2>⬡ Results — {results.length} found</h2>
          <div className="results-list">
            {results.map((item, index) => (
              <div className="result-item" key={index}>
                {item.Card}
              </div>
            ))}
          </div>
        </div>
      )}
      {results.length === 0 && searchText && (
        <div className="glass-card panel">
          <div className="no-results">Nothing found in the deep...</div>
        </div>
      )}
    </div>
  );
}

export default CardUI;
