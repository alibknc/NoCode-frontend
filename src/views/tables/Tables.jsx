import React, { useState } from "react";
import axios from "axios";
import "../../css/App.css";

const Tables = () => {
  const [showForm, setShowForm] = useState(false);
  const [formFields, setFormFields] = useState([{ name: "", type: "" }]);
  const [tableName, setTableName] = useState("");
  const [fieldTypes, setFieldTypes] = useState(["INT", "VARCHAR", "DATE"]);
  const [tables, setTables] = useState([]);

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Table Name:", tableName);
    console.log("Form Fields:", formFields);
    setTables([...tables, { tableName: tableName, formFields: formFields }]);
    setShowForm(false);
    setFormFields([{ name: "", type: "" }]); // Reset form fields to empty
    setTableName(""); // Reset table name to empty

    // Send a POST request to the backend with the submitted table information
    try {
      const response = await axios.post("/your-backend-url-here", {
        tableName: tableName,
        formFields: formFields,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addFields = () => {
    let object = {
      name: "",
      type: "",
    };

    setFormFields([...formFields, object]);
  };

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

  const handleClick = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setFormFields([{ name: "", type: "" }]); // Reset form fields to empty
    setTableName(""); // Reset table name to empty
  };

  return (
    <div className="home-container">
      {!showForm && (
        <div onClick={handleClick} className="add-icon">
          +
        </div>
      )}
      <div className="card-container">
        {tables.map((table) => (
          <div className="card">{table.tableName}</div>
        ))}
      </div>
      {showForm && (
        <div className="form-container">
          <input
            className="nameOfTable"
            type="text"
            placeholder="Table Name"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            required
          />
          <form onSubmit={handleSubmit}>
            {formFields.map((form, index) => {
              return (
                <div key={index} className="input-field">
                  <input
                    name="name"
                    className="input-box"
                    placeholder="Name"
                    onChange={(event) => handleFormChange(event, index)}
                    value={form.name}
                    required
                  />
                  <select
                    name="type"
                    className="drop-btn"
                    onChange={(event) => handleFormChange(event, index)}
                    value={form.type}
                    required
                  >
                    <option value="" className="drop-menu">
                      Select Type
                    </option>
                    {fieldTypes.map((type, idx) => (
                      <option key={idx} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <button
                    className="remove-button"
                    onClick={() => removeFields(index)}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
            <button type="button" className="add-button" onClick={addFields}>
              Add More..
            </button>
            <br />
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

export default Tables;
