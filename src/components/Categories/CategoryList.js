//list of categories the user has created
import React, { useEffect, useContext, useState } from "react";
import { CategoryContext } from "./CategoryProvider";
import { UserContext } from "../Profiles/UserProvider"
import { DeleteCategory } from "../utils/DeleteCategory"
import { Link } from "react-router-dom";


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

    <div style={{ marginTop: "2rem" }}>
      <h3>Categories</h3>
      <div className="categoryList">
        {categories.map((categoryObject) => {
          return <>
            <div key={categoryObject.id}>{categoryObject.label}</div>
            { //only shows edit and delete if the user is an admin
              currentUser.user.is_staff ?
                <>
                  <DeleteCategory categoryId={categoryObject.id} />
                  <div className="new_category_btn_container">
                    <Link to={`/editcategory/${categoryObject.id}`}>
                      <button className="new_category_btn" >EDIT</button>
                    </Link>
                  </div>
                </>
                : ""}
          </>
        })}
        <button onClick={toCreateCreateCategory}>+ Category</button>
      </div>
    </div>


  )
};
