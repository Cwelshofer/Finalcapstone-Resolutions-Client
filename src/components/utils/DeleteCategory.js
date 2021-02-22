//deletecategory component with confirmation modal
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { CategoryContext} from "../Categories/CategoryProvider";
import { Button } from "evergreen-ui"

export const DeleteCategory = ({categoryId}) => {
  const { deleteCategory} = useContext(CategoryContext);
  const history = useHistory()
 

  //state variable and functions that change state of the state variable
  const [open, setOpen] = useState();
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);

  //toggles the CSS class name depending on if the modal is open or not
  const showHideClassName = open ? "modal display-block" : "modal display-none";

  //function that is called when the delete button is clicked. 
  //This function deletes an entry in the TagPost table.
  //Lastly the function calls the close function which resets our modal state.
  const deleteThisCategory = () => {
    deleteCategory(categoryId)
     .then(() => {
         history.push("/categories")
     })
  };

  return (
    <>
      <Button onClick={onOpen}>DELETE</Button>
      {open && (
        <div className={showHideClassName}>
          <div className="modal-main">
            <h3>Confirm</h3>
            <p>Are you sure you want to delete?</p>
            <div>
              <Button onClick={deleteThisCategory}>
                {" "}
                <strong>Delete</strong>
              </Button>
              <Button onClick={onClose}> Cancel </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
