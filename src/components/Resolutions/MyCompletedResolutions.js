//shows user their own posts in MyPosts view, allows them to delete a post
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ResolutionContext } from "./ResolutionProvider";
import { UserContext } from "../Profiles/UserProvider"
import { Menu } from "evergreen-ui";


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
      <h2 className="my">My Completed Resolutions</h2>
      {usersResolutions.map((r) => {
        return (
            <Menu>
                <Menu.Item>
          <div key={r.id} className="container__card">
            <div className="container__cardContent">
            
                <Link to={{ pathname: `resolutions/${r.id}` }}>
                  {r.title}
                </Link>
              
              -----{r.user.user.first_name}
              {r.category==null? "" :<p>{r.category.label}</p>}
            </div>
          </div>
          </Menu.Item>
          </Menu>
        )
       
      }).reverse()}
    </>
  )
}
