//renders nav links that redirect user to various paths
import React, { useContext, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { UserContext } from "../Profiles/UserProvider"


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
        <ul className="navbar">
            {/* <li className="navbar__item">
                <img className="navbar__logo" src={Logo} />
            </li> */}
            <li className="navbar__item">
                <Link className="navbar__link" to="/home">Home</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/resolutions">Resolutions</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/myresolutions">My Resolutions</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/users">All Users</Link>
            </li >
            <li className="navbar__item">
                <Link className="navbar__link" to="/tags">Tag Management</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/categories">Category Management</Link>
            </li >
            {currentUser.user.is_staff ? 
            <li className="navbar__item">
                <Link className="navbar__link" to="/profile">My Profile</Link>
            </li >
             : null}
            <li className="navbar__item">
                <Link className="navbar__link" to="/mycompletedresolutions">My Completed Resolutions</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/allcompletedresolutions">All Completed Resolutions</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/profile">My Profile</Link>
            </li>
            {
                (localStorage.getItem("resolution_user_id") !== null) ?
                    <li className="navbar__item">
                        <button className="navbar__item__fakeLink"
                            onClick={() => {
                                localStorage.removeItem("resolution_user_id")
                                history.push({ pathname: "/" })
                            }}
                        >Logout</button>
                    </li> :
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
