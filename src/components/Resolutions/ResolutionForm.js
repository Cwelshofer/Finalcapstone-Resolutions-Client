//form that allows users to create and edit a post
import React, { useEffect, useContext, useState } from "react";
import { ResolutionContext } from "./ResolutionProvider";
import { CategoryContext } from "../Categories/CategoryProvider";
import { TagContext } from "../tags/TagProvider";
import { TagResolutionContext } from "../tags/TagResolutionProvider"
import { Grommet, Box, DataTable } from 'grommet';
import { columns } from '../Profiles/Columns'
import { Button, SelectMenu, Select, TextInput, Checkbox } from 'evergreen-ui'


const controlledColumns = columns.map(col => ({ ...col }));

export const ResolutionForm = (props) => {
    const { addResolution, updateResolution, getResolutionById, resolutionTags, getTagsByResolution, getResolutions, resolutions, completeResolution } = useContext(ResolutionContext)
    const { categories, getCategories } = useContext(CategoryContext)
    const { tag, tags, getTags } = useContext(TagContext)
    const { createTagResolution, deleteTagResolution } = useContext(TagResolutionContext)

    const [resolutionObj, setResolutionObj] = useState({completed:false}) //defines and sets the state of the postObj in this module
    const [checkedState, setCheckedState] = useState([])
    const [checked, setChecked] = useState([]);

    const editMode = props.match.url.split("/")[2] === "edit" //checks url to see if editMode
    const resolutionId = parseInt(props.match.params.resolutionId)
    let filteredTrue = []
    let checkedTagsArray = []
    const resolutionTagsArrayToObj = {}

    useEffect(() => {
        
        getCategories()
        getTags()
        if (editMode) {
            getResolutionById(resolutionId)
                .then(setResolutionObj)

            getTagsByResolution(resolutionId)
                .then(resolutionTags.forEach(pt => {
                    resolutionTagsArrayToObj[pt.tag_id] = true
                }))
                .then(setCheckedState(resolutionTagsArrayToObj))
        }
    }, [])


    const handleControlledInputChange = (browserEvent) => {
        const newResolution = Object.assign({}, resolutionObj)
        newResolution[browserEvent.target.name] = browserEvent.target.value
        setResolutionObj(newResolution)
    }


    function handleTagChange(event) {
        const value = event.target.checked

        setCheckedState({
            ...checkedState,
            [event.target.name]: value
        })
    }


    function handleResolutionChange(event) {
        
        const newResolution = Object.assign({}, resolutionObj)
        newResolution.completed = !newResolution.completed
        setResolutionObj(newResolution)
    }


    const constructResolution = (evt) => {
        evt.preventDefault()

        if (editMode) {
            updateResolution({
                id: resolutionObj.id,
                title: resolutionObj.title,
                content: resolutionObj.content,
                category_id: parseInt(resolutionObj.category_id),
                publication_date: resolutionObj.publication_date,
                image_url: resolutionObj.image_url,
                completed: resolutionObj.completed
            })
                .then(
                    resolutionTags.forEach(tagResolutionObj => {
                        deleteTagResolution(tagResolutionObj.id, tagResolutionObj.resolution_id)
                    }))
                .then(() => {
                    const tagResolutionPromises = [] //empty array of possible TagPosts

                    Object.keys(checkedState).forEach(key =>
                        checkedTagsArray.push({
                            tagId: parseInt(key),
                            checked: checkedState[key]
                        }))

                    filteredTrue = checkedTagsArray.filter(t => t.checked === true)

                    checkedTagsArray.filter(filteredObj => {
                        return filteredObj.tagId
                    })

                    filteredTrue.map(t => {
                        tagResolutionPromises.push(
                            createTagResolution({
                                tag_id: parseInt(t.tagId),
                                resolution_id: resolutionObj.id
                            })
                        ) //push any newly created tags to promises array
                    })

                    Promise.all(tagResolutionPromises)
                        .then(() => {
                            props.history.push(`/resolutions/${resolutionId}`)
                        })
                })
        } else {
            const jsonDate = ((new Date(Date.now())).toJSON()).slice(0, 10)
            addResolution({
                title: resolutionObj.title,
                content: resolutionObj.content,
                category_id: parseInt(resolutionObj.category_id),
                publication_date: jsonDate,
                image_url: resolutionObj.image_url,
                completed: resolutionObj.completed
                
            })
                .then((resolutionObj) => {
                    const tagResolutionPromises = [] //empty array of possible TagPosts

                    Object.keys(checkedState).forEach(key =>
                        checkedTagsArray.push({
                            tagId: key,
                            checked: checkedState[key]
                        }))

                    filteredTrue = checkedTagsArray.filter(t => t.checked === true)

                    filteredTrue.map(t => {
                        tagResolutionPromises.push(
                            createTagResolution({
                                tag_id: parseInt(t.tagId),
                                resolution_id: resolutionObj.id
                            })
                        ) //push any newly created tags to promises array
                    })

                    Promise.all(tagResolutionPromises)
                        .then(() => {
                            props.history.push(`/resolutions/${resolutionObj.id}`)
                        })
                })
        }
    }

    

    return (
        <>
            {editMode
                ? <h2>Edit Resolution</h2>
                : <h2>New Resolution</h2>
            }

            <form>
                <fieldset>
                    <div className="form-group">
                        <TextInput type="text" name="title" className="form-control"
                            placeholder="Title" value={resolutionObj.title}
                            onChange={handleControlledInputChange}
                        >
                        </TextInput>
                    </div>
                </fieldset>


                <fieldset>
                    <div className="form-group">
                        <TextInput type="text" name="content" className="form-control"
                            placeholder="Article content" value={resolutionObj.content}
                            onChange={handleControlledInputChange}
                        >
                        </TextInput>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        
                    <Select
                         name="category_id" className="form-control"
                            value={resolutionObj.category_id}
                            onChange={handleControlledInputChange}
                        >
                    
                            <option value="0">Category Select</option>
                            {
                                categories.map(c => {
                                    return <option key={c.id} value={c.id}>{c.label}</option>
                                })
                            }
                             
                        </Select>
                        

                    </div>
                    


                </fieldset>
         


                {editMode   //if in edit mode, displays a Save button, otherwise displays a Publish button
                    ?
                    
                    <Button onClick={(evt) => { constructResolution(evt) }}>
                        Save
                        </Button>
                    :
                    <Button marginRight={16} appearance="primary" intent="Publish" onClick={(evt) => { constructResolution(evt) }}>
                        Publish
                        </Button>
                }

                <div className="Tags">Tags</div>
                <div className="container--checkboxes">
                    {tags.map((t) => (
                        <div className="checkboxGroup">
                          <label>
                                {" #"}{t.label}
                            </label>
                            <Checkbox
                                type="checkbox"
                                name={t.id}
                                value={t.id}
                                checked={checkedState[t.id]}
                                onChange={handleTagChange}
                            />
                          
                        </div>
                    ))}
                </div>

                <div className="container--checkboxes">
                <div className="completed">Completed Resolution?</div>

                    <div className="check">
                            <label>
                        Completed?
                </label>
                    <Checkbox className="check-approve"
                        defaultValue = "false"
                        type="checkbox"
                        name="completed"
                        checked={resolutionObj.completed}
                        onChange={handleResolutionChange} ></Checkbox>
            
                </div>


                </div>








            </form>
        </>
    )

}