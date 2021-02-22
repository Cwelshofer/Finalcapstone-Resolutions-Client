//Form to let user create a new category
import React, { useEffect, useContext, useState, useHistory } from "react";
import { CategoryContext } from "./CategoryProvider";
import { TextInput, Button } from "evergreen-ui"



export const CategoryForm = (props) => {
  const { getCategories, createCategory, editCategory, getCategoryById } = useContext(CategoryContext)
  
  const editMode = props.match.url.split("/")[1] === "editcategory" //checks url to see if editMode

  const [currentCategory, setCurrentCategory] = useState({})

  //state variable and functions that change state of the state variable
  const [open, setOpen] = useState();
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);

  const showHideClassName = open ? "modal display-block" : "modal display-none";

  //gets the categories from the database
  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    if (editMode) {
      getCategoryById(parseInt(props.match.params.categoryId))
        .then(category => {
          setCurrentCategory({
            label: category.label
          })
        })
    }
  }, [props.match.params.categoryId])

  //function that is called when a change happens in the form. It sets the state variable that is imported via context.
  //whatever the value that goes in the input (the evt) is being written as single property object with a key of 'type'
  //and the value of the form input
  const handleChange = (event) => {
    const newCategoryState = Object.assign({}, currentCategory)
    newCategoryState[event.target.name] = event.target.value
    setCurrentCategory(newCategoryState)
  }

  return (

    <fieldset>
      <label htmlFor="label">
        <div className="label">Category</div>
        <TextInput
          type="text"
          name="label"
          value={currentCategory.label}
          onChange={handleChange}
        />
      </label>
      {editMode ? <Button className="new_category_btn" onClick={onOpen}>EDIT</Button> : ""}

      {open && (

        <div className={showHideClassName}>
          <div className="modal-main">
            <h3 className="p">Confirm</h3>
            <p className="c">Are you sure you want to make these changes?</p>
            <div>
              <Button onClick={() => {
                editCategory({
                  id: props.match.params.categoryId,
                  label: currentCategory.label
                }).then(() => {
                  props.history.push("/categories")
                })
              }}>
                Edit
              </Button>
              <Button onClick={onClose}> Cancel </Button>
            </div>
          </div>
        </div>


      )}
      {editMode ? "" :
        <Button
          type="submit"
          onClick={(evt) => {
            evt.preventDefault();
            createCategory({
              label: currentCategory.label
            })
              .then(() => props.history.push("/categories"))
          }}
          className="btn btn-primary"
        >Create New Category</Button>
      }
    </fieldset>

  );
};
