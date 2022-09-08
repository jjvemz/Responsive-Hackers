import React, { useState, useEffect } from "react";
import NewsCard from "../NewsCard/NewsCard";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./HackerNews.css";
import moment from "moment";

const HackerNews = () => {
  const [news, setNews] = useState([]);
  const [favoritesArr, setFavouritesArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagecount, setPagecount] = useState(1);
  const [currentpage, setCurrentpage] = useState(0);
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
          console.log("La api es: ", response.data.hits);
          const total = response.data.hits.length;
          console.log("Total es: ", total);
          setPagecount(Math.ceil(total / limit));
          console.log(response.data.hits);
          console.log("(antes) SetNews es: ", news);
          setNews(response.data.hits);
          console.log("(despues) SetNews es: ", news);
          console.log("La URL es: ", URL);
          return news;
        })
        .catch((e) => {
          console.log(e);
        });

      setLoading(false);
    };
    getNews();
  }, [limit]);

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

  const addFave = (fave) => {
    setFavouritesArr(prev => [...prev, fave])
  }

  useEffect(() => {
    axios.get(URL);
  }, [library]);

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
              <a href={item.url}>
                <span className="-hours-ago-by-autho">
                  {now.diff(item.created_at, "days")} days ago by {item.author}
                </span>
                <br />
                <span className="Yes-React-is-taking">
                  {item.story_title}
                </span>
                <button onClick={() => addFave(item)} type="button">añadir</button>
                {console.log("Los favoritos son: ",favoritesArr)}
              </a>
            </div>
          );
        })}
      </div>
      <ReactPaginate
        pageCount={pagecount}
        pageRange={6}
        marginPagesDisplayed={2}
        onPageChange={handleClickPage}
        containerClassName={"container"}
        previousLinkClassName={"page"}
        breakClassName={"page"}
        nextLinkClassName={"page"}
        pageClassName={"page"}
        disabledClassName={"disabled"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default HackerNews;
