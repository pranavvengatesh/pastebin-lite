import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ViewPaste() {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/pastes/${id}`, {
      cache: "no-store"
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => setContent(data.content))
      .catch(() => setError("Paste not found or expired"));
  }, [id]);

  if (error) return <div className="container error">{error}</div>;
  if (!content) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h2>Paste</h2>
      <div className="paste-box">{content}</div>
    </div>
  );
}
