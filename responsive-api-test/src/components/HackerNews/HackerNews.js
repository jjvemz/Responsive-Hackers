import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

const HackerNews = () => {
  const [news, setNews] = useState([]);
  const [favorites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagecount, setPagecount] = useState(0);
  const [currentpage, setCurrentpage] = useState(1);
  const [postperpage, setPostperpage] = useState(8);
  const [library, Setlibrary] = useState("reactjs");

  let limit = 9;

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      await axios
        .get(
          `https://hn.algolia.com/api/v1/search_by_date?query=${library}&page=${currentpage}`
        )
        .then((response) => {
          console.log("La api es: ", response.data.hits);
          const total = response.data.length;
          setPagecount(Math.ceil(total / limit));
          setNews(response.data.hits);
        })
        .catch((e) => {
          console.log(e);
        });

      setLoading(false);
    };
    getNews();
  }, [limit]);

  const fetchComments = async (currentPage) => {
    await axios
      .get(
        `https://hn.algolia.com/api/v1/search_by_date?query=${library}&page=${currentpage}`
      )
      .then((res) => {
        const data = res.json();
        return data;
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleClickPage = async (data) => {
    console.log(data.selected);
    let currentPage = data.selected + 1;
    const newsFromServer = await fetchComments(currentPage);
    setNews(newsFromServer);
  };

  const handleOptions = (e) =>{
    Setlibrary(e.target.value)
  }

  return (
    <div className="container">
      <div className="select-bar">
        <select 
        value={library}
        onChange={(e) =>{Setlibrary(e.target.value)}}
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
            <div key={item.objectID} className="col-sm-6 col-md-4 v my-2">
              <div className="card shadow-sm w-100" style={{ minHeight: 225 }}>
                <div className="card-body">
                  <h4 className="card-subtitle mb-2 text-muted text-center">
                    {item.story_title}
                  </h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pagecount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handleClickPage}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default HackerNews;
