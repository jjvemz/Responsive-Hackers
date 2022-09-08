import React ,{useState, useEffect} from 'react';
import moment from "moment";


export default function HackerFavourites(props){
    let now = moment();
    
    return(
        <div className="div">
            {props.map((item) =>{
                return(
                    <div className="Rectangle" key={item.objectID}>
                        <a href={item.url}>
                        <span className="-hours-ago-by-autho">
                            {now.diff(item.created_at, "days")} days ago by {item.author}
                        </span>
                            <br />
                        <span className="Yes-React-is-taking">
                            {item.story_title}
                        </span>
                        <button  type="button">añadir</button>
                        </a>
                    </div>
                    );
            })}
        </div>
    )
}