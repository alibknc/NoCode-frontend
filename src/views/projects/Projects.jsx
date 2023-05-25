import React, { useState } from "react";
import "../../css/App.css"

const Projects = () => {
  const [showForm, setShowForm] = useState(false);
  const [projectName, setProjectName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Project Name:", projectName);
    setShowForm(false);
    setProjectName("");
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
