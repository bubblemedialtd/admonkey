import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Logo from "../../logo.png";
import WebFont from 'webfontloader';
import WalletButton from "./buttons/WalletButton";
import useWeb3Modal from "../../../hooks/useWeb3Modal";

WebFont.load({
  google: {
    families: ['Rubik:300,400,700', 'sans-serif']
  }
});

const useStyles = makeStyles({

  root: {
    display: "flex",
    backgroundColor: "#eaeaea",
    height: "100%",
    fontFamily: "Rubik",
  },
  messageContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyItems: "center",
    alignItems: "center",
    margin: "40px",
  },
  titleContainer: {
    justifyContent: "center",
    color: "#000000",
    marginBottom: "20px",
    marginTop: "20px",
  },
  logo: {
    width: "25%",
    maxWidth: "50%"
  },
});

export default function ConnectToWallet({ isInvalidChain }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.messageContainer}>
        <img src={Logo} className={classes.logo} />

        <div className={classes.titleContainer}>
          <h1>
            Welcome to <b style={{ color: "#ffc20d" }}>Ad</b>Monkey
          </h1>
        </div>
        <div
          style={{ fontSize: "1.75rem", color: "#ffc20d", textAlign: "center" }}
        >
          {isInvalidChain ? "Are you on BSC?" : null}
        </div>
        <div>
          <div
            style={{
              fontSize: "1.2rem",
              color: "black",
              textAlign: "center",
              marginBottom: "10px",
              fontWeight: "bold"
            }}
          >
            {isInvalidChain
              ? "You have not connected to Binance Smart Chain network yet"
              : "You are not connected to your wallet!"}
          </div>
        </div>
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            color: "black",
          }}
        >
          <div
            style={{
              fontSize: "1.05rem",
              color: "black",
              width: "100%",
              textAlign: "center",
            }}
          >
            {isInvalidChain
              ? "Please switch to BSC Network on your Metamask or TrustWallet"
              : "Please connect your wallet to be able to migrate your V1 tokens to the new V2 contract"
            }

          </div>
          <div
            style={{
              textAlign: "center",
              display: "block",
              marginTop: "20px",
              width: "100%"
            }}
          >
 
          </div>
        </div>
      </div>
    </div>
  );
}

ConnectToWallet.defaultProps = {
  disabled: true,
  reward: null,
};

ConnectToWallet.propTypes = {
  isInvalidChain: PropTypes.bool,
};
