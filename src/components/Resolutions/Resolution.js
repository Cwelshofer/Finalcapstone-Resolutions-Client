import React from "react"
import { Link } from "react-router-dom"
import { Menu } from 'evergreen-ui'
import "./Resolutions.css"


export const Resolution = ({ resolution }) => (
  
    <>
          
        <section className="resolutions">
           
            <Menu>
                <Menu.Item>
                <Link className="resolution" to={`/resolutions/${resolution.id}`}>
                    {resolution.title}
                </Link>
                </Menu.Item>
          
            </Menu>
        </section>
        
    </>
    
)
