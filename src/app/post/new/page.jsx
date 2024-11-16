"use client";
import { url } from "@/utils/api";
import React, { useState } from "react";

const NewPost = () => {
  const [postContent, setPostContent] = useState("");
  const [formData, setFormData] = useState({
    topic: "",
    keyword: "",
  });
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${url}/api/post`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.log(response.message);
      }
      const data = await response.json();

      console.log(data.parsedData);

      setPostContent({
        title: data.parsedData.title,
        metaDescription: data.parsedData.metaDescription,
        postContent: data.parsedData.postContent,
      });
    } catch (error) {
      console.log(error, "something went wrong");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">
            <strong>Generate a blog post on the topic of: </strong>
          </label>
          <textarea
            onChange={handleChange}
            name="topic"
            value={formData.topic}
            className="resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm outline-none"
          />
        </div>
        <div>
          <label htmlFor="">
            <strong>Targetting the following keywords:</strong>
          </label>
          <textarea
            onChange={handleChange}
            value={formData.keyword}
            name="keyword"
            className="resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm outline-none"
          />
        </div>
        <button type="submit" className="btn">
          click me sucker
        </button>
      </form>
      <div dangerouslySetInnerHTML={{ __html: postContent.postContent }} />
    </div>
  );
};

export default NewPost;
