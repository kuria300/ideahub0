import { useState } from "react";
import "./AddIdea.css";

function Addidea() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newIdea = {
      title,
      description,
      createdAt: new Date().toISOString(),
    };

    console.log("Submitted idea:", newIdea);

    setTitle("");
    setDescription("");
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
        <button type="submit">Submit Idea</button>
      </form>
    </div>
  );
}

export default Addidea;
