import React from 'react';
import './RectangleTitle.css'
import HackerNews from'../../assets/hacker-news.svg'


const RectangleTitle = () =>{
    return(
        <div className="Rectangle-2-Copy">
            <span className="HACKER-NEWS Text-Style">
                <img src={HackerNews} alt="Hacker News"/>
            </span>
        </div>
    );
}

export default RectangleTitle;