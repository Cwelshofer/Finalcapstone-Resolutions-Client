import { Menu } from "evergreen-ui";
import { FormPrevious } from "grommet-icons"
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserProvider";
import { UsersTable } from "./UsersTable.js";
import "./Profile.css"


export const UsersList = () => {
    const { users, getUsers, user, getCurrentUser, setUser } = useContext(UserContext)

    useEffect(() => {
        getUsers()
        getCurrentUser()
            .then(setUser)
    }, [])


    return (
        <>
            <h1>All Users</h1>
            { 
                    <div className="userContainer">
                        <div className="allusers">All Users</div>
                        {/* VIEW FOR AUTHORS */}
                        { /* map through users to generate content */
                            users.map(u => {
                                return <div>
                               
                                    { //different route for current user than other users
                                        u.id === user.id ?
                                        
                                            <Link to={{ pathname: "/profile" }}>
                                                <p className="userContainer">{u.user.first_name} {u.user.last_name}</p>
                                            </Link> :
                                            <Link to={{ pathname: `/profiles/${u.id}` }}>
                                                <p className="userContainer">{u.user.first_name} {u.user.last_name}</p>
                                            </Link>
                                        
                                    }
                                
                                </div>
                            })
                        }
                    </div>
            }
        </>
    )
}