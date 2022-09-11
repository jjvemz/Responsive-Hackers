import React from 'react';
import './RectangleTitle.css'
import HackerNews from'../../assets/hacker-news.svg'


const RectangleTitle = () =>{
    return(
        <div className="Rectangle-2-Copy">
            <span className="HACKER-NEWS">
                <img src={HackerNews} alt="HACKER-NEWS" className="HACKER-NEWS"/>
            </span>
        </div>
    );
}

export default RectangleTitle;