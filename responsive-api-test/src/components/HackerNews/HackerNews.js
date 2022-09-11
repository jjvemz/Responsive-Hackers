import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from '@mui/material';

import TimeIcon from "../../assets/timeIcon.svg";

import "./HackerNews.css";
import moment from "moment";
import Paginate from "../Paginate/Paginate";


const newsPerPage = 8;

const HackerNews = () => {
  console.log(window.localStorage.getItem('favorites'));

  const [news, setNews] = useState('[]');
  const [favorites, setFavorites] = useState('favorites' in window.localStorage ? JSON.parse(window.localStorage.getItem('favorites')) : []);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [library, setlibrary] = useState("reactjs");

  

  let now = moment();
  console.log(`https://hn.algolia.com/api/v1/search_by_date?query=${library}`);
  
  const getNews = async () => {
    setLoading(true);
    await axios
      .get(`https://hn.algolia.com/api/v1/search_by_date?query=${library}`)
      .then((response) => {
        setNews(JSON.stringify(response.data.hits.filter(({author, story_title, story_url, created_at, ..._}) => author && story_title && created_at && story_url)))
        return news;
      })
      .catch((e) => {
        console.log(e);
      });
    setLoading(false);
  };
  
  useEffect(() => {
    getNews();
  }, [library]);

  return (
    <div className="Front-End-Test---Home-view">
      <div >
        <select
        className="Rectangle-26-Copy-23"
          value={library}
          label="Select your news"
          onChange={(e) => {
            setlibrary(e.target.value);
          }}
        >
          <option value="reactjs">React</option>
          <option value="angular">Angular</option>
          <option value="vuejs">Vue</option>
        </select>
      </div>
      <div>
        {JSON.parse(news).filter((_, index) => (page - 1) * newsPerPage <= index && index < newsPerPage * page).map((item) => {
          return (
            <Grid container spacing={2} columns={2} key={item.objectID}>
              <Grid item xs={8} >
                <div className="Rectangle" >
                  <a href={item.story_url}>
                    <span className="-hours-ago-by-autho">
                      <img src={TimeIcon} alt="TimeIcon"/>{now.diff(item.created_at, "weeks")} days ago by{" "}
                      {item.author}
                    </span>
                    <br />
                    <span className="News-Text">{item.story_title}</span>
                  </a>
                  <div>
                  <button>
                    {!favorites.includes(item.objectID) ? (
                      <img src ='../../assets/iconmonstrfavorite3.svg'
                      alt="Open Heart"
                        onClick={() => {
                          console.log("clickeado");
                          setFavorites([...favorites, item.objectID]);
                          window.localStorage.setItem(
                            "favorites",
                            JSON.stringify(favorites)
                          );
                        }}
                      />
                    ) : (
                      <img src ='../../assets/iconmonstrfavorite2.svg'
                      alt="Empty Heart"
                        onClick={() => {
                          console.log("desclickeado");
                          setFavorites(favorites.filter(id => id !== item.objectID));
                          window.localStorage.setItem('favorites', favorites)
                        }}
                      />
                    )}
                  </button>
                  </div>
                </div>
              </Grid>
            </Grid>
          );
        })}
      </div>
      {console.log("current page:",page)}
      {JSON.parse(news).length <= newsPerPage ? <></> : <Paginate setPage={setPage} numberOfPages={Math.ceil(JSON.parse(news).length / newsPerPage)}/>}
    </div>
  );
};

export default HackerNews;
