//renders nav links that redirect user to various paths
import { Tab, Button, Heading, Pane } from "evergreen-ui"
import React, { useContext, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { UserContext } from "../Profiles/UserProvider"
import "./NavBar.css"
import fireworks from "./fireworks.png"
import { MenuIcon, PersonIcon, WrenchIcon, EndorsedIcon, SmallTickIcon, PeopleIcon, HomeIcon, LogOutIcon, PropertiesIcon } from "evergreen-ui"


export const NavBar = () => {
    const history = useHistory()

    const { getCurrentUser, setCurrentUser, currentUser } = useContext(UserContext)

    useEffect(() => {
        getCurrentUser().then( res =>
            setCurrentUser(res)
        )
    }, [])

    return (
        <section className="container--navbar">
            <div className="friends">
                <div className="fireworks">
                <img src={fireworks} />
            </div>
            <div className="star">
        Friends and Family Resolutions
        </div>
            <div className="fireworkz">
                <img src={fireworks} />
            </div>
          
 
        </div>          
        <ul className="navbar">
            {/* <li className="navbar__item">
                <img className="navbar__logo" src={Logo} />
            </li> */}
      
            <Button marginRight={16} appearance="primary">
           <HomeIcon />
                <Link className="navbar__link" to="/home">Home</Link>
            </Button>
            <Button marginRight={16} appearance="primary" intent="danger">
             <MenuIcon />
          
                <Link className="navbar__link" to="/resolutions">Resolutions</Link>
            </Button>
            <Button marginRight={16} appearance="primary" intent="warning">
            <PropertiesIcon />
                <Link className="navbar__link" to="/myresolutions">My Resolutions</Link>
            </Button>
            
            <Button marginRight={16} appearance="primary" intent="success">
            <PeopleIcon />
                <Link className="navbar__link" to="/users">All Users</Link>
           </Button>
           <Button marginRight={16} appearance="primary" intent="default">
           <WrenchIcon />
                <Link className="navbar__link" to="/tags">Tag Management</Link>
            </Button>
            <Button marginRight={16} appearance="primary" intent="danger">
             <WrenchIcon />
                <Link className="navbar__link" to="/categories">Category Management</Link>
               
            </Button>
            
             <Button marginRight={16} appearance="primary" intent="success">
             <SmallTickIcon />
                <Link className="navbar__link" to="/mycompletedresolutions">My Completed Resolutions</Link>
            </Button>
            <Button marginRight={16} appearance="primary" intent="warning">
            <EndorsedIcon />
                <Link className="navbar__link" to="/allcompletedresolutions">All Completed Resolutions</Link>
            </Button>
            <Button marginRight={16} appearance="primary" intent="default">
            <PersonIcon />
                <Link className="navbar__link" to="/profile">My Profile</Link>
            </Button>
            {
                (localStorage.getItem("resolution_user_id") !== null) ?
                 
                        <Button className="navbar__item__fakeLink"
                        
                            onClick={() => {
                                localStorage.removeItem("resolution_user_id")
                                history.push({ pathname: "/" })
                            }}
                        ><LogOutIcon />Logout</Button>:
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
        </section>
    )
}
