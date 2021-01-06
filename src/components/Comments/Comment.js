//child of HomeList, list of all posts, user can delete only their own post
import React, { useContext, useEffect } from "react"
import {Link} from "react-router-dom"
import { ResolutionContext } from "../Resolutions/ResolutionProvider"
import { CommentContext } from "./CommentProvider"



export const CommentList = (props) => {
    
    const {comments, getComments} = useContext(CommentContext)
    const {resolution} = useContext(ResolutionContext)

    const resolutionId = parseInt(props.match.params.resolutionId)
    
    console.log(comments)
    useEffect(() => {
       getComments(resolutionId)

    },[])

    return (
        <>
        <h2>Comments</h2>
        <div><Link to={{pathname:`/home`}}>Back to Resolutions</Link></div>
        {
            comments !== [] ? comments.map(c => {
                return <>
                <ul>
                    <li>
                <div key={c.id} className="container__card">
                    <p>Subject: {c.subject}</p>
                
                    <p>Content: {c.content}</p>

                    <p>Created On: {c.created_on}</p>

                    <p>Author: {c.author.username}</p>
                    
                </div>
                </li>
                </ul>
                </>
                
            }).reverse() : null
        }
             <Link className="resolutionLink" to={`/resolutions/comments/create/${resolution.id}`}>
            add Comment
       
    </Link>
        </>
    )
}
