import React from "react";
import Button from "@material-ui/core/Button";
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';

export default function WalletButton({
  provider,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  selectedAddress
}) {

  const handleClick = () => {
      if (!provider) {
        loadWeb3Modal();
      } else {
        logoutOfWeb3Modal();
      }
  };

  const message = !provider ? "Connect" : selectedAddress

  return (
    <Chip
      style={{
        backgroundColor: "#ffc20d",
        color: "black",
        borderRadius: "36px",
        fontSize: "0.9em",
        padding: "1%",
        lineHeight: "1.2",
        fontWeight: "100",
        width: "13%"
      }}
      onClick={handleClick}
      label={message}
      />
  );
}
