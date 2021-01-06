//shows user their own posts in MyPosts view, allows them to delete a post
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ResolutionContext } from "./ResolutionProvider";
import { UserContext } from "../Profiles/UserProvider"


export const MyCompletedResolutionList = () => {
  const { getResolutionByUser, getCompletedResolutions, getCompletedResolutionsByUser   } = useContext(ResolutionContext);
  const { getCurrentUser } = useContext(UserContext)

  const [usersResolutions, setUsersResolutions] = useState([]);
 
  useEffect(() => {
    getCurrentUser()
    //returns res.json() that is immediately passed to the next .then()
    //res.json() is the current user object
     
      .then((user) => getCompletedResolutionsByUser(user.id))
      .then(setUsersResolutions)
  }, [])

  return (
    <>
      <h2>My Resolutions</h2>
      {usersResolutions.map((r) => {
        return (
          <div key={r.id} className="container__card">
            <div className="container__cardContent">
              <p>
                <Link to={{ pathname: `resolutions/${r.id}` }}>
                  <strong>{r.title}</strong>
                </Link>
              </p>
              <p>{r.user.user.first_name}</p>
              {r.category==null? "" :<p>{r.category.label}</p>}
            </div>
          </div>
        )
      }).reverse()}
    </>
  )
}
