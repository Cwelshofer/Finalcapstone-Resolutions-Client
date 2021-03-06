//form to create a new tag
import React, { useContext, useEffect, useState } from "react"
import { TagContext } from "./TagProvider"
import { Button, TextInput } from "evergreen-ui"




export const TagForm = (props) => {
    // Use the required context providers for data
    const { createTag, updateTag, getTagById } = useContext(TagContext)
    const editMode = props.match.params.hasOwnProperty("tagId")

    //state variable and functions that change state of the state variable
    const [open, setOpen] = useState();
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(undefined);

    //toggles the CSS class name depending on if the modal is open or not
    const showHideClassName = open ? "modal display-block" : "modal display-none";

    const [tagObj, setTagObj] = useState({})

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newTag = Object.assign({}, tagObj)          // Create copy
        newTag[event.target.name] = event.target.value    // Modify copy
        setTagObj(newTag)                                 // Set copy as new state
    }

    useEffect(() => {
        if (editMode) {
            getTagById(parseInt(props.match.params.tagId))
                .then(tag => {
                    setTagObj({
                        label: tag.label
                    })
                })
        }
    }, [props.match.params.tagId])

    return (
        <fieldset className="tagForm">
            <h2 className="tagForm__title">Tag form</h2>
            <div className="form-group">

                <label htmlFor="label">Enter tag name: </label>
                <TextInput type="text" name="label" required autoFocus className="form-control"
                    placeholder="ex: sports, politics, etc"
                    value={tagObj.label}
                    onChange={handleControlledInputChange}
                />

            </div>
            {editMode ? <Button onClick={onOpen}>EDIT</Button> : "" }

            {open && (
                <div className={showHideClassName}>
                    <div className="modal-main">
                        <h3 className="are">
                            Confirm
            </h3>
                        <p className="are">Are you sure you want to make these changes?</p>
                        <div>
                            <Button onClick={() => {
                                updateTag({
                                    id: parseInt(props.match.params.tagId),
                                    label: tagObj.label
                                })
                                    .then(() => {
                                        props.history.push(`/tags`)
                                    })
                            }}> Edit</Button>
                            <Button onClick={onClose}> Cancel </Button>
                        </div>
                    </div>
                </div>
            )}
            {editMode ? "" : <Button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    createTag({
                        label: tagObj.label
                    })
                        .then(() => props.history.push("/tags"))
                }}

                className="btn btn-primary">
                Create Tag
                </Button>}
        </fieldset>
    )
}