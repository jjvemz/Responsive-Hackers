import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles,createStyles  } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(1)
    },
    "& .MuiPaginationItem-icon": {
      backgroundColor: "grey"
    },
    "& .MuiPaginationItem-textPrimary":{
      color: "black"
    }
  }
}));

const Paginate = ({ setPage, numberOfPages }) => {
  const classes = useStyles();

  const handleChange = (value) => {
    setPage(parseInt(value));
    window.scroll(0, 0);
  };

  return (
        <Pagination
          class={classes.root}
          className="pagination"
          onChange={(_, value) => handleChange(value)}
          style={{
            display: "flex",
            justifyContent: "center"
          }}
          showFirstButton
          showLastButton
          color="primary"
          variant="text"
          shape="circular"
          type="start-ellipsis"
          count={numberOfPages}
        />
  );
};

export default Paginate;
