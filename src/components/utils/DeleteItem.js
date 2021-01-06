//delete button component with confirmation modal
import React, { useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ResolutionContext } from "../Resolutions/ResolutionProvider";


export const DeleteItem = ({ resolutionId }) => {
  const { deleteResolution } = useContext(ResolutionContext);
  const history = useHistory()
  
  //state variable and functions that change state of the state variable
  const [open, setOpen] = useState();
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);

  //toggles the CSS class name depending on if the modal is open or not
  const showHideClassName = open ? "modal display-block" : "modal display-none";

  //function that is called when the delete button is clicked. 
  //This function deletes an entry in the Post table.
  //Lastly the function calls the close function which resets our modal state.
  const deleteThisResolution = () => {
    deleteResolution(resolutionId)
    .then(() => {
      history.push("/home")
    })
  };

  return (
    <>
      <button onClick={onOpen}>DELETE</button>
      {open && (
        <div className={showHideClassName}>
          <div className="modal-main">
            <h3>
              Confirm
            </h3>
            <p>Are you sure you want to delete?</p>
            <div>
              <button onClick={deleteThisResolution}> <strong>Delete</strong></button>
              <button onClick={onClose}> Cancel </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
