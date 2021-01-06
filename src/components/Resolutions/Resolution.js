import React from "react"
import { Link } from "react-router-dom"

export const Resolution = ({ resolution }) => (
    <>
        <section className="resolutionList">
        </section>
        <section className="resolution">
<ul>
            <li className="resolution__name">
                <Link to={`/resolutions/${resolution.id}`}>
                    {resolution.title}
                </Link>
            </li>
            </ul>
        </section>
    </>
)
