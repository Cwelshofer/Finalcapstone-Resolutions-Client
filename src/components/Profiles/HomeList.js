
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserProvider";
import { UsersTable } from "./UsersTable.js"
import { Heading, Pane } from "evergreen-ui"
import clock from "./Clock.png"
import "./Profile.css"
 <div className="Channel2"></div>


export const HomeList = () => {
    const { users, getUsers, user, getCurrentUser, setUser } = useContext(UserContext)

    useEffect(() => {
        getUsers()
        getCurrentUser()
            .then(setUser)
    }, [])


    return (
        <>
        <Pane>
        <Heading className="channel2" Clas></Heading></Pane>
      
        
        <img src={clock} />
         <Pane
    elevation={4}
  background="overlay"
 
  >

    <h3 className="Channel3">History of Resolutions</h3>
            <div className="Channel">According to the History Channel, New Year’s resolutions date back roughly 4,000 years, to when the Babylonians -- a population living in what was then Mesopotamia -- commemorated the new year in March, when the season’s crops were planted. The celebration consisted of a 12-day festival called Akitu, when either a new king was crowned, or loyalty to the existing monarchy was renewed.

But it was also a time for the Babylonians to make certain promises -- things like settling debts and returning anything that wasn’t theirs to its proper owner. Maintaining these resolutions, they believed, came with karmic retribution, in that kept promises would be rewarded with good fortune in the following year.

The Romans are said to be the first to create the concept of January 1 and designate it the first day of the year, beginning around 46 B.C. The name of the month is rooted in Janus, a god of particular importance to the Romans, due to his two-faced nature. It was believed that Janus could use his two faces to both look back on the outgoing year, and forward to the next one. Similar to the Babylonians, Romans made vows of good deeds to Janus before the new year arrived.</div>
           
            </Pane>
        </>
       
    )
}