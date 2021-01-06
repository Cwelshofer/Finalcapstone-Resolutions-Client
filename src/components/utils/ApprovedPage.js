import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
export const AdminPostApproval = (props) => {
    const {adminPostApproval, getPostsByCategoryId} = useContext(PostContext)
    const [checked, setChecked] = useState(false)
    const post = props.post
    useEffect(() => {
        let approved = post.approved
        if(approved === true){
            setChecked(true)
        }
    }, [post])
    const checkboxHandler = () => {
        adminPostApproval(post)
        .then(() => {
            if(props.isCategory) {
                const categoryId = parseInt(props.categoryId)
                getPostsByCategoryId(categoryId)
        }})
        setChecked(!checked)
    }
    return (
        <div className="checkbox-container">
            <label>
                <div>Approved ?</div>
                <input className="check-approve" type="checkbox" id="tag" checked={checked} onChange={checkboxHandler} ></input>
            </label>
        </div>
    )
}