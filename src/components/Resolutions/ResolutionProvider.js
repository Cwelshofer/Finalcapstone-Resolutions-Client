//handles all Post data- getPosts, getPostsById, getPostsByUser, getPostByTag, getTagsByPost, getPostByCat, addPost, updatePost, deletePost
import React, { useState } from "react"

export const ResolutionContext = React.createContext()

export const ResolutionProvider = (props) => {
    const [resolutions, setResolutions] = useState([{user:{user:{first_name: ""}}, category:{label:""}}])  
    const [resolution, setResolution] = useState({user:{user:{}}})
    const [resolutionTags, setResolutionTags] = useState([{tag:{}}])
    const [completed, setCompleted] = useState([{completed:{}}])

    const getResolutions = () => {
        return fetch("http://localhost:8000/resolutions" , {
            headers: {
              Authorization: `Token ${localStorage.getItem("resolution_user_id")}`,
              "Content-Type": "application/json",
            }
          })
            .then(res => res.json())
            .then(setResolutions)
    }

    const getResolutionById = (id) => {
        return fetch(`http://localhost:8000/resolutions/${id}` , {
            headers: {
              Authorization: `Token ${localStorage.getItem("resolution_user_id")}`,
              "Content-Type": "application/json",
            }
          })
            .then(res => res.json())
    }

    const getResolutionByUser = (userId) => {
        return fetch(`http://localhost:8000/resolutions?user_id=${userId}` , {
            headers: {
              Authorization: `Token ${localStorage.getItem("resolution_user_id")}`,
              "Content-Type": "application/json",   
            }
           
          })
            .then(res => res.json())
    }

    const getResolutionByTag = (tagId) => {
        return fetch(`http://localhost:8000/resolutions?tag_id=${tagId}` , {
            headers: {
              Authorization: `Token ${localStorage.getItem("resolution_user_id")}`,
              "Content-Type": "application/json",   
            }
          })
            .then(res => res.json())
            .then(setResolutionTags)
    }

    const getTagsByResolution = (resolutionId) => {
        return fetch(`http://localhost:8000/resolutiontags?resolution_id=${resolutionId}` , {
            headers: {
              Authorization: `Token ${localStorage.getItem("resolution_user_id")}`,
              "Content-Type": "application/json",   
            }
          })
            .then(res => res.json())
            .then(setResolutionTags)
    }

    const getResolutionByCat = (categoryId) => {
        return fetch(`http://localhost:8000/resolutions?category_id=${categoryId}` , {
            headers: {
              Authorization: `Token ${localStorage.getItem("resolution_user_id")}`,
              "Content-Type": "application/json",   
            }
          })
            .then(res => res.json())
            //.then(setResolutions)
    }

    const addResolution = resolution => {
        return fetch("http://localhost:8000/resolutions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("resolution_user_id")}`
              },
            body: JSON.stringify(resolution)
        })
           .then(res => res.json())     
    }

    const updateResolution = resolution => {
        return fetch(`http://localhost:8000/resolutions/${resolution.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("resolution_user_id")}`
            },
            body: JSON.stringify(resolution)
        })
            .then(getResolutions)
    }

    const deleteResolution = (resolutionId) => {
        return fetch(`http://localhost:8000/resolutions/${resolutionId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("resolution_user_id")}`,
            },
        body: JSON.stringify(resolutionId)
        })
            .then(getResolutions)
    }
    const completeResolutions = (resolutionId) => {
      return fetch(`http://localhost:8000/resolutions/${resolutionId}/completed`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("resolution_user_id")}`,  
        },
      })
      .then(getResolutions)
    }

    const getCompletedResolutions = () => {
      return fetch(`http://localhost:8000/resolutions?completed=True` , {
          headers: {
            Authorization: `Token ${localStorage.getItem("resolution_user_id")}`,
            "Content-Type": "application/json",   
          }
         
        })
          .then(res => res.json())
          .then(setResolutions)
  }

  const getCompletedResolutionsByUser = (userId) => {
    return fetch(`http://localhost:8000/resolutions?user_id=${userId}&completed=True` , {
        headers: {
          Authorization: `Token ${localStorage.getItem("resolution_user_id")}`,
          "Content-Type": "application/json",   
        }
       
      })
        .then(res => res.json())
}


const getFalseResolutions = () => {
  return fetch(`http://localhost:8000/resolutions?completed=False` , {
      headers: {
        Authorization: `Token ${localStorage.getItem("resolution_user_id")}`,
        "Content-Type": "application/json",   
      }
     
    })
      .then(res => res.json())
      .then(setResolutions)
}

    return (
        <ResolutionContext.Provider value={{
            resolution, setResolution, resolutions, addResolution, getResolutions, setResolutions,
            getResolutionById, updateResolution, getResolutionByTag, getResolutionByCat, getResolutionByUser,
            deleteResolution, resolutionTags, getTagsByResolution, completeResolutions, getCompletedResolutions, completed, setCompleted, getCompletedResolutionsByUser, getFalseResolutions
        }}>
            {props.children}
        </ResolutionContext.Provider>
    )
}