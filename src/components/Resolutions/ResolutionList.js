//child of HomeList, list of all posts, user can delete only their own post
import {Link} from "react-router-dom"
import React, { useContext, useEffect } from "react"
import { ResolutionContext } from "./ResolutionProvider"
import { Resolution } from "./Resolution"

export const ResolutionList = () => {
    // This state changes when `getLocations()` is invoked below
    const { resolutions, getFalseResolutions } = useContext(ResolutionContext)

    /*
        What's the effect this is reponding to? Component was
        "mounted" to the DOM. React renders blank HTML first,
        then gets the data, then re-renders.
    */
    useEffect(() => {
        getFalseResolutions()
    }, [])

    /*
        This effect is solely for learning purposes. The effect
        it is responding to is that the location state changed.
    */
    useEffect(() => {
    }, [resolutions])

    return (
        <div className="resolutions">
           
        {
            resolutions.map(res => <Resolution key={res.id} resolution={res} />)
        }
         <Link className="resolutionLink" to={'/resolutions/create'}>
            add Resolution
       
    </Link>
        </div>
    )
}