//renders each imported component depending on the URl path 
import React from "react";
import { Route } from "react-router-dom";
import { ResolutionProvider } from "./Resolutions/ResolutionProvider";
import { ResolutionList } from "./Resolutions/ResolutionList";
import { ResolutionDetails } from "./Resolutions/ResolutionDetail";
import { ResolutionForm } from "./Resolutions/ResolutionForm";
import { TagProvider } from "./tags/TagProvider";
import { TagResolutionProvider } from "./tags/TagResolutionProvider";
import { UsersResolutions } from "./Resolutions/UserResolutions";
import { CategoryProvider } from "./Categories/CategoryProvider";
import { TagForm } from "./tags/TagForm";
import { TagList } from "./tags/TagList";
import { UserProvider } from "./Profiles/UserProvider";
import { CategoryList } from "./Categories/CategoryList";
import { UsersTable } from "./Profiles/UsersTable";
import { CategoryForm } from "./Categories/CategoryForm";
import { UserDetail } from "./Profiles/UserDetail";
import { UsersList } from "./Profiles/UserList";
import { SubscriptionProvider } from "./Subscriptions/SubscriptionProvider";
import { CommentProvider } from "./Comments/CommentProvider";
import { CommentForm } from "./Comments/CommentForm"
import { CommentList } from "./Comments/Comment"
import { MyCompletedResolutionList } from "./Resolutions/MyCompletedResolutions"
import { CompletedResolutionList } from "./Resolutions/CompletedResolutions"
import { HomeList } from "./Profiles/HomeList"
import { AllUsersResolutions } from "./Resolutions/AllUsersResolutions"
import { UsersProfileResolutions } from "./Profiles//ProfileResolutions"


export const ApplicationViews = (props) => {
  return (
    <>
      <main
        style={{
          margin: "5rem 2rem",
          lineHeight: "1.75rem",
        }}
      >
        {/****** HOME ***** POST FORM & DETAILS ******* MY POSTS ******* */}

        <ResolutionProvider>
          <CategoryProvider>
            <TagResolutionProvider>
              <TagProvider>
                <SubscriptionProvider>
                  <CommentProvider>
                    <Route exact path="/home"
                          render={(props) => <HomeList {...props} />}
                          />
                    <Route exact path="/resolutions"
                      render={(props) => <ResolutionList {...props} />}
                    />
                    <Route path="/profiles/:userId(\d+)"
                      render={props => <UserDetail {...props} />}
                    />
                    <Route exact path="/resolutions/create"
                      render={(props) => <ResolutionForm {...props} />}
                    />
                    <Route exact path="/resolutions/edit/:resolutionId(\d+)"
                      render={(props) => <ResolutionForm {...props} />}
                    />
                    <Route exact path="/resolutions/comments/:resolutionId(\d+)"
                      render={(props) => <CommentList {...props} />}
                    />
                    <Route exact path="/myresolutions"
                      render={(props) => <UsersResolutions {...props} />}
                    />
                    <Route path="/resolutions/comments/create/:resolutionId(\d+)"
                      render={(props) => <CommentForm {...props} />}
                    />
                    <Route path="/resolutions/:resolutionId(\d+)"
                      render={(props) => <ResolutionDetails {...props} />}
                    />
                    <Route path="/mycompletedresolutions"
                      render={(props) => <MyCompletedResolutionList {...props} />}
                    />
                         <Route path="/allcompletedresolutions"
                      render={(props) => <CompletedResolutionList {...props} />}
                    />
                        <Route path="/usersresolutions/:userId(\d+)"
                      render={(props) => <UsersProfileResolutions {...props} />}
                    />

                  </CommentProvider>
                </SubscriptionProvider>
              </TagProvider>
            </TagResolutionProvider>
          </CategoryProvider>
        </ResolutionProvider>


        <TagProvider>
          <UserProvider>

            <Route exact path="/tags/create" render={(props) => {
              return <TagForm {...props} />
            }}
            />
            <Route exact path="/tags/edit/:tagId(\d+)"
              render={(props) => <TagForm {...props} />}
            />
            <Route exact path="/tags" render={(props) => {
              return <TagList {...props} />
            }}
            />
          </UserProvider>
        </TagProvider>

        <UserProvider>
          <SubscriptionProvider>
            <Route exact path="/profile" render={
              props => <UserDetail {...props} />} />
            <Route exact path="/users"><UsersList /></Route>
          </SubscriptionProvider>
        </UserProvider>



        <UserProvider>
          <CategoryProvider>
            <Route exact path="/categories" render={
              (props) => <CategoryList {...props} />} />
            <Route exact path="/categories/create" render={
              (props) => <CategoryForm {...props} />} />
            <Route exact path="/editcategory/:categoryId(\d+)" render={
              (props) => <CategoryForm {...props} />} />
          </CategoryProvider>
        </UserProvider>

      </main>
    </>

  );
};
