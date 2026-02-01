import { useState } from "react";
import "./addIdea.css";

function AddIdea({ userId, onNewIdea }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description) {
      setError("Please fill out all fields");
      return;
    }

    const newIdea = {
      id: userId || "test",
      title,
      description,
      createdAt: new Date().toISOString(),
    };

    console.log(newIdea);

    if (onNewIdea) onNewIdea(newIdea);

    setTitle("");
    setDescription("");
    setError("");
  };

  return (
    <div className="addidea-container">
      <h2>Add a New Idea</h2>
      <form className="addidea-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Idea title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Describe your idea..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        {error && <p className="error-text">{error}</p>}
        <button type="submit">Submit Idea</button>
      </form>
    </div>
  );
}

export default AddIdea;
