import { useState } from "react";

export default function CreatePaste() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [url, setUrl] = useState("");

  async function createPaste() {
    const res = await fetch("https://pastebin-lite-backend-4ojs.onrender.com/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        ttl_seconds: ttl ? Number(ttl) : undefined,
        max_views: views ? Number(views) : undefined
      })
    });

    const data = await res.json();

    if (res.ok) {
      setUrl(`http://localhost:5173/p/${data.id}`);
    } else {
      alert(data.error);
    }
  }

  return (
    <div className="container">
      <h2>Create a Paste</h2>

      <textarea
        placeholder="Write your text here..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <input
        placeholder="TTL (seconds, optional)"
        value={ttl}
        onChange={e => setTtl(e.target.value)}
      />

      <input
        placeholder="Max views (optional)"
        value={views}
        onChange={e => setViews(e.target.value)}
      />

      <button onClick={createPaste}>Create Paste</button>

      {url && (
        <div className="result">
          Paste URL:{" "}
          <a href={url} target="_blank" rel="noreferrer">
            {url}
          </a>
        </div>
      )}
    </div>
  );
}
