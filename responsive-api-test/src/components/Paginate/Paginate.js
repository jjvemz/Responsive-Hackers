import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import './Paginate.css'

const Paginate = ({ setPage, numberOfPages }) => {
    //handle change
    const handleChange = (value) => {
      setPage(parseInt(value));
      window.scroll(0, 0);
    };
    return (
      <Pagination
        className="pagination"
        onChange={(_, value) => handleChange(value)}
        showFirstButton 
        showLastButton 
        color="secondary"
        variant="outlined" 
        shape="rounded"
        count={numberOfPages}
      />
    );
  };
  
  export default Paginate;
