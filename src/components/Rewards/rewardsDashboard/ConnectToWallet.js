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
    width: "90%",
    display: "flex",
    flexDirection: "column",
    justifyItems: "center",
    alignItems: "center",
    margin: "40px",
  },
  titleContainer: {
    justifyContent: "center",
    color: "black",
    marginBottom: "40px",
    marginTop: "20px",
  },
  logo: {
    width: "20%",
  },
});

export default function ConnectToWallet({ isInvalidChain }) {
  const classes = useStyles();

  const [provider, setProvider] = useState();
  const [invalidChain, setInvalidChain] = useState();
  const [chainId, setChainId] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(true);

  const [_, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal({
    setChainId: (chainId) => {
      setChainId(chainId);
    },
    setInvalidChain: (isInvalid) => {
      setInitialized(true);
      setInvalidChain(isInvalid);
    },
    onLoad: (provider, selectedAccount) => {
      setInitialized(true);
      setInvalidChain(false);
      setLoading(false);
    },
  });

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
              fontSize: "1.75rem",
              color: "black",
              textAlign: "center",
              marginBottom: "20px",
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
              fontSize: "1.25rem",
              color: "black",
              width: "100%",
              textAlign: "center",
            }}
          >
            {isInvalidChain
              ? "Please switch to BSC Network on your Metamask or TrustWallet"
              : "Please connect your wallet to be able to migrate your V1 tokens to the new V2 contract"}

              <WalletButton
            provider={provider}
            loadWeb3Modal={loadWeb3Modal}
            logoutOfWeb3Modal={logoutOfWeb3Modal}
          />
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
