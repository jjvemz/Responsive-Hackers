import React ,{useState, useEffect} from 'react';
import moment from "moment";
import axios from "axios";




export default function HackerFavourites(){
    let now = moment();
    const [faves, setFaves] = useState('favorites' in window.localStorage ? JSON.parse(window.localStorage.getItem('favorites')) : []);
    const [data, setData] = useState([]);

    const getData = () => {
        const data = [];
        ['reactjs', 'angular', 'vuejs'].forEach(async (lib) => {
            return axios.get(`https://hn.algolia.com/api/v1/search_by_date?query=${lib}`)
                .then(response => {
                    return response.data.hits;
                })
                .catch((error)=>{
                    console.log(error);
                })
                .then(newData => {
                    data.push(...newData);
                })
        })
        console.log(data);
        return data;
    };

    useEffect(() =>{
        setData([...getData()]);
        console.log("data in the columns is: ",data); 
    }, []);
    return(
        <div className="div">
            {data.filter(item => faves.includes(item.objectID)).map((item) =>{
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
                        <button  type="button" onClick={() => faves.includes(item.objectID) ? setFaves(JSON.stringify(faves.filter(fav => fav.objectID !== item.objectID))) : JSON.stringify(setFaves([...faves, item.objectID]))}>añadir</button>
                        </a>
                    </div>
                    );
            })}
        </div>
    )
}