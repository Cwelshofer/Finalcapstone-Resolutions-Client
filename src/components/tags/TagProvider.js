//handles all tag data- getTags, createTag
import React, { useState } from "react";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState({});
  
  const getTags = () => {
    return fetch("http://localhost:8000/tags", {
      headers: {
        Authorization: `Token ${localStorage.getItem("resolution_user_id")}`,
      },
    })
      .then((res) => res.json())
      .then(setTags);
  };

  const createTag = (tag) => {
    return fetch("http://localhost:8000/tags", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("resolution_user_id")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tag),
    })
      .then((res) => res.json())
  };

  
  const deleteTag = (tagId) => {
    return fetch(`http://localhost:8000/tags/${tagId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.getItem("resolution_user_id")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tagId),
    })
    .then(getTags)
}

const getTagById = (id) => {
  return fetch(`http://localhost:8000/tags/${id}` , {
      headers: {
        Authorization: `Token ${localStorage.getItem("resolution_user_id")}`,
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
}

const updateTag = tag => {
  return fetch(`http://localhost:8000/tags/${tag.id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("resolution_user_id")}`
      },
      body: JSON.stringify(tag)
  })
      .then(getTags)
}



  return (
    <TagContext.Provider
      value={{
        tag,
        setTag,
        tags,
        getTags,
        setTags,
        createTag,
        deleteTag,
        getTagById,
        updateTag
      }}
    >
      {props.children}
    </TagContext.Provider>
  );
};