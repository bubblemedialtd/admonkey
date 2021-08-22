import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Title from "./Title";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  root: {
    height: "100%",
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "50%",
    padding: "1 rem",
  },
  centered: {
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export default function Balance({ balance, contract }) {
  const classes = useStyles();
  return (
    <div style={{ padding: "40px" }}>
      <div className={classes.centered}>
        <Typography variant="h5" component="h6" style={{ marginBottom: "15px", fontWeight: "100" }}><span style={{ fontSize: "3.2rem", display: "block", color: "#d4d4d4" }}>{contract}</span> Balance</Typography>
      </div>
      <Typography component="p" variant="h5" className={classes.centered} style={{ fontSize: "32px", marginBottom: "20px" }}>
        {`${balance ? balance : 0}`}
      </Typography>
    </div>
  );
}

Balance.propTypes = {
  balance: PropTypes.number,
};
