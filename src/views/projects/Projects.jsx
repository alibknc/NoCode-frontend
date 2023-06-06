import React, { useState } from "react";
import axios from "axios";
import "../../css/App.css";

const Projects = () => {
  const [showForm, setShowForm] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Project Name:", projectName);
    setProjects([...projects, projectName]);
    setShowForm(false);
    setProjectName("");

    // Send a POST request to the backend with the submitted project information
    try {
      const response = await axios.post("/your-backend-url-here", {
        projectName: projectName,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setProjectName("");
  };

  return (
    <div className="home-container">
      {!showForm && (
        <div onClick={handleClick} className="add-icon">
          +
        </div>
      )}
      <div className="card-container">
        {projects.map((project) => (
          <div className="card">{project}</div>
        ))}
      </div>
      {showForm && (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <input
              className="nameOfTable"
              type="text"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
          <button type="button" className="close-button" onClick={closeForm}>
            Close Form
          </button>
        </div>
      )}
    </div>
  );
};

export default Projects;
