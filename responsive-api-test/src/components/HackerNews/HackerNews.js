import React, { useState, useEffect } from "react";
import NewsCard from "../NewsCard/NewsCard";
import axios from "axios";
import ReactPaginate from "react-paginate";

import {IoIosHeart, IoIosHeartEmpty} from 'react-icons/io'
import "./HackerNews.css";
import moment from "moment";

const HackerNews = () => {
  const [news, setNews] = useState([]);
  const [favoritesArr, setFavouritesArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagecount, setPagecount] = useState(1);
  const [currentpage, setCurrentpage] = useState(0);
  const [itemPerPage, SetItemPerPage] = useState([...news].splice(0,8))
  const [library, Setlibrary] = useState("reactjs");

  let now = moment();
  let limit = 9;
  let URL = `https://hn.algolia.com/api/v1/search_by_date?query=${library}&page=${currentpage}`;

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      await axios
        .get(URL)
        .then((response) => {
          const total = response.data.hits.length;
          setPagecount(Math.ceil(total / limit));
          console.log(response.data.hits);
          setNews(response.data.hits);
          console.log("La URL es: ", URL);
          console.log("hola mundo");
          return news;
        })
        .catch((e) => {
          console.log(e);
        });

      setLoading(false);
    };
    getNews();
  }, [limit, news, URL]);
  console.log("El cambio de URL es: ", URL);
  const fetchComments = async (library, currentPage) => {
    await axios
      .get(
        `https://hn.algolia.com/api/v1/search_by_date?query=${library}&page=${currentPage}`
      )
      .then((res) => {
        const data = res.json();
        return data;
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const addFave = (props) => {
    let array = favoritesArr;
    let addArray = true;
    array.map((item, key) =>{
      if (item === props.i){
        array.splice(key, 1);
        addArray= false;
      }
    });
    if(addArray){
      array.push(props.i)
    }
    setFavouritesArr([...array])
  }

  useEffect(() => {
    axios.get(URL);
  });

  const handleClickPage = async (data) => {
    console.log("Data is", data);
    console.log(data.selected);
    let currentPage = data.selected + 1;
    const newsFromServer = await fetchComments(library, currentPage);
    setNews(newsFromServer);
  };


  return (
    <div className="Front-End-Test---Home-view">
      <div className="Rectangle-26-Copy-23">
        <select
          value={library}
          onChange={(e) => {
            Setlibrary(e.target.value);
          }}
        >
          {console.log(library)}
          <option value="reactjs">React</option>
          <option value="angular">Angular</option>
          <option value="vuejs">Vue</option>
        </select>
      </div>
      <div>
        {news.map((item) => {
          
          return (
            <div className="Rectangle" key={item.objectID}>
              <a href={item.story_url}>
                <span className="-hours-ago-by-autho">
                  {now.diff(item.created_at, "hours")} days ago by {item.author}
                </span>
                <br />
                <span className="Yes-React-is-taking">
                  {item.story_title}
                </span>
                </a>
                {favoritesArr.includes(item) ?(
                  <IoIosHeart 
                    onClick={()=> addFave({item, })}
                  />
                ):(
                  <IoIosHeartEmpty 
                  onClick={()=> addFave({item, })}
                  /> 
                )}
            </div>
          );
        })}
      </div>
      <ReactPaginate

					pageCount={10}
					pageRange={2}
					marginPagesDisplayed={2}
					onPageChange={handleClickPage}
					containerClassName={'container'}
					previousLinkClassName={'page'}
					breakClassName={'page'}
					nextLinkClassName={'page'}
					pageClassName={'page'}
					disabledClassNae={'disabled'}
					activeClassName={'active'}

				/>
    </div>
  );
};

export default HackerNews;
