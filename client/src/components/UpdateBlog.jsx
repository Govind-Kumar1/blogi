import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../config";

const UpdateBlog = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send updated blog data to the backend
      const res = await axios.put(`${config.BASE_URL}/api/blogs/update`, inputs);
      if (res.status === 200) {
        toast.success("Blog updated successfully!");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update the blog. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Blog Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="Enter blog title"
            value={inputs.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            placeholder="Enter blog description"
            value={inputs.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            placeholder="Enter image URL"
            value={inputs.image}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;