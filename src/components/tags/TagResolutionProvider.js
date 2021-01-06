//handles all TagPost object data- getTagPosts, createTagPost, deleteTagPost
import React, { useContext, useState } from "react";
import {ResolutionContext} from "../Resolutions/ResolutionProvider"

export const TagResolutionContext = React.createContext();


export const TagResolutionProvider = (props) => {
  const [TagResolutions, setTagResolutions] = useState([]);
  const [TagResolution, setTagResolution] = useState({}); 
  
  const {getTagsByResolution} = useContext(ResolutionContext)

  const getTagResolutions = () => {
    return fetch("http://localhost:8000/resolutiontags", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("resolution_user_id")}`
      }
    })
      .then((res) => res.json())
      .then(setTagResolutions);
  };

  const getResolutionTagsByTags = (tagId) => {
    return fetch(`http://localhost:8000/resolutiontags?tag_id=${tagId}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("resolution_user_id")}`
      }
    })
      .then((res) => res.json())
      //.then(setTagPosts)
  };

  const createTagResolution = (TagResolution) => {
    return fetch("http://localhost:8000/resolutiontags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("resolution_user_id")}`
      },
      body: JSON.stringify(TagResolution),
    })
      .then((res) => res.json())
  };

  const deleteTagResolution = (tagResolutionId, resolutionId) => {
    return fetch(`http://localhost:8000/resolutiontags/${tagResolutionId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Token ${localStorage.getItem("resolution_user_id")}`
        }
    })
    .then(getTagResolutions)
    .then(getTagsByResolution(resolutionId))
}




  return (
    <TagResolutionContext.Provider
      value={{
        TagResolution,
        setTagResolution,
        TagResolutions,
        getTagResolutions,
        setTagResolutions,
        createTagResolution,
        deleteTagResolution,
        getResolutionTagsByTags
      }}
    >
      {props.children}
    </TagResolutionContext.Provider>
  );
};
