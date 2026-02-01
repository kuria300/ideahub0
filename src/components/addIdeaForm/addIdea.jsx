import { useState } from "react";
import "../addidea/Addidea.css";
import { useParams } from "react-router-dom";

function Addidea() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [github, setGithub] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !author || !github || !description) {
      setError("Please fill out this field");
      return;
    }

    const newIdea = {
      id,
      title,
      author,
      github,
      description,
    };

    console.log(newIdea);

    e.target.reset();
    setTitle("");
    setAuthor("");
    setGithub("");
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
        />

        <input
          type="text"
          placeholder="Author name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <input
          type="text"
          placeholder="GitHub Link"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
        />

        <textarea
          placeholder="Describe your idea..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {error && <span className="error-text">{error}</span>}

        <button type="submit">Submit Idea</button>
      </form>
    </div>
  );
}

export default Addidea;
