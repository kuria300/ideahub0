import { useState } from "react";
import { useParams } from "react-router-dom";
import './AddIdea.css';
import { toast } from 'react-toastify';
import axios from 'axios'

function Addidea() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");
 
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if(!title.trim() || !author.trim() || !description.trim()){ 
      setError('Please enter valid data!') 
      return;
    }

    if (githubLink && !isValidURL(githubLink)) {
      setError("Please enter a valid GitHub URL");
      return;
    }

    setError(""); 


    const newIdea = {
      id,
      title,
      description,
      githubLink,
      author,
      createdAt: new Date().toISOString(),
    };

    try{

      fetch('http://localhost:5000/ideas' , {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newIdea)

      })
        .then((res)=>{
          if(!res.ok){
            throw new Error(`Http Error ${res.status}`)
        }
        return res.json()
        }).then((ideasData)=>{
          console.log(ideasData)
        })
      


   toast.success('Idea Added')
    setTitle("");
    setDescription("");
    setGithubLink("");
    setAuthor("");

    }catch(error){
      console.log(error)
    }

  };

  return (
    <div className="addidea-card">
      <h2>Add a New Idea</h2>
      <form className="addidea-form" onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="text"
          placeholder="Idea title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Author name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          type="url"
          placeholder="GitHub Link"
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
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