//list of categories the user has created
import React, { useEffect, useContext, useState } from "react";
import { CategoryContext } from "./CategoryProvider";
import { UserContext } from "../Profiles/UserProvider"
import { DeleteCategory } from "../utils/DeleteCategory"
import { Link } from "react-router-dom";
import { Menu, Button } from "evergreen-ui"
import "./Category.css"


export const CategoryList = (props) => {
  const { categories, getCategories } = useContext(CategoryContext)
  const { getCurrentUser } = useContext(UserContext)
  const [currentUser, setCurrentUser] = useState({ user: {} })

  //gets the categories from the database
  useEffect(() => {
    getCategories()

  }, []);

  useEffect(() => {
    getCurrentUser()
      .then(setCurrentUser)
  }, []);

  //this function is called on the click of the '+category' button
  // it takes us to a new route where a category creation form is rendered
  const toCreateCreateCategory = () => {
    props.history.push("/categories/create");
  };

  return (
    
    <div className="categoryList">
      <h3 className="category">Categories</h3>
      <div className="categoryList">
        {categories.map((categoryObject) => {
          return <>
      <Menu>
          <Menu.Item>
            <div className="categoryobject" key={categoryObject.id}>{categoryObject.label}</div>
              </Menu.Item>
                </Menu>
            { //only shows edit and delete if the user is an admin
              currentUser.user.is_active ?
                <>
                   <DeleteCategory categoryId={categoryObject.id} />
                  <div className="new_category_btn_container">
                    <Link className="editcategory" to={`/editcategory/${categoryObject.id}`}>
                     <Button className="new_category_btn" >EDIT</Button>
                    </Link>
                 
                  
                  </div>
                 
                </>
                : ""}
              
          </>
        })}
        <Button onClick={toCreateCreateCategory}>+ Category</Button>
      </div>
    </div>


  )
};
