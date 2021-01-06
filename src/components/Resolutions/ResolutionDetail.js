/* displays details of a post, lets user add reactions (maximum one of each) to post, 
lets user edit post if they are the author, or see author's profile if it was written by another user */
import React, { useContext, useEffect, useState, useRef } from "react";
import { ResolutionContext } from "./ResolutionProvider";
import { Link } from "react-router-dom";
import { TagResolutionContext } from "../tags/TagResolutionProvider";
import { TagContext } from "../tags/TagProvider";
import { DeleteItem } from "../utils/DeleteItem"
import { Box, Heading } from "grommet"


export const ResolutionDetails = (props) => {
  const { getResolutionById, resolution, setResolution, getTagsByResolution, resolutionTags} = useContext(ResolutionContext);
  const { tag, tags, getTags } = useContext(TagContext)
  const { TagResolutions } = useContext(TagResolutionContext);

  //state variable and variables needed to make tag management work
  const [selectedTagResolutionId, setSelectedTagResolutionId] = useState(0);
  const [filteredTags, setFilteredTags] = useState([])
  const [stateTagIDArr, setTagIDArr] = useState([])

  //other variables defined through useRef and the URL
  const tagResolutionId = useRef(null);
  const resolutionId = parseInt(props.match.params.resolutionId);

  //gets a post by the post ID and gets the tags associated with that post
  useEffect(() => {
    getTags()
    getResolutionById(resolutionId).then(setResolution);
    getTagsByResolution(resolutionId);
  }, [TagResolutions]);

  useEffect(() => {
    //filters tags that haven't been selected yet to be options for adding
    const tagIDs = tags.map(t => t.id)
    const resolutionTagIDs = resolutionTags.map(pt => pt.id)
    const diffIDs = tagIDs.filter(t => !resolutionTagIDs.includes(t))
    const filteredTagObjs = diffIDs.map(id => {
      return tags.find(t => t.id === id)
    })
    setFilteredTags(filteredTagObjs)
  }, [resolutionTags])


  //state variable and functions to show/hide the tag management feature
  const [open, setOpen] = useState();
  
  //takes what is selected in the tag management dropdown and sets the state variable with that value
  const handleChange = (e) => {
    setSelectedTagResolutionId(parseInt(e.target.value));
  };
  
  const handleAddTags = (browserEvent) => {
    const stateCopyID = stateTagIDArr.slice()
    let newTagItem = parseInt(browserEvent.target.value)
    stateCopyID.push(newTagItem)
    //IDs of tags to be added get stored in this variable
    setTagIDArr(stateCopyID)
  }

  return (
    <>
       <Box margin= "medium">
      {/* Post Detail JSX */}
      <section className="container__card">
        <section className="container__cardContent">  
          <section className="container__cardContentLeft"></section>        
          <Heading level = "2">{resolution.title}</Heading>
          
          {/* if current user wrote the post, show an edit button */}
          {resolution.created_by_current_user 
          ? (
              <section className="container__cardContentTop">              
                <button onClick={() => props.history.push(`/resolutions/edit/${resolution.id}`)}>
                  EDIT
                </button>

                {resolution.created_by_current_user ? <DeleteItem resolutionId= {resolution.id}/> : <></>}
              </section>
          )
          : (``)
          }
          
          <img className="resolution__image" src={resolution.image_url} style={{width: `500px`}} alt="article"></img>
          {/* <ReactionList {...props} /> */}
          <div className="resolution__content">{resolution.content}</div>
          <div key={resolution.id} className="resolution__date">
            Published: {new Date(resolution.publication_date).toLocaleDateString("en-US")}
          </div>
          <div>
            {resolution.created_by_current_user 
            ? (
              <section className="container__cardContentBottom">
                <div className="resolution_author">
                  By: {resolution.user.user.first_name} (you)
                </div>
              </section>
            ) 
            : (
              <>
            <section className="container__cardContentBottom">
                <div className="resolution_author">
                  {"By: "} 
                  <Link to={{ pathname: `/profiles/${resolution.user.id}` }}>
                      {resolution.user.user.first_name}
                  </Link>
                </div>
          
        

          {/* If current user did not write the post, show the author name with a link to their profile*/}
         
                
            </section>
            
            <button className="container__cardContentTop" onClick={() => props.history.push(`/resolutions/comments/${resolution.id}`)}>COMMENTS</button>
           
            </>
            
            )
            }
          </div>
        </section>

        <section className="container__cardContentRight">          
          <div>
            {resolutionTags.map((resolutionTag) => {
              return  resolutionTag.tag.label ? <div className="displayedTag"># {resolutionTag.tag.label}</div>  : null      
                      
            })}
          </div>
        </section>


      </section>
      </Box>
  
      
    </>
  );
};
