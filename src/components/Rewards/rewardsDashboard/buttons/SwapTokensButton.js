import React from "react";
import Button from "@material-ui/core/Button";
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';

export default function SwapTokensButton({
  balance
}) {
  const handleClick = () => {
    console.log("Starting token migration")
  };
  return (
    <Button
      style={{
        backgroundColor: "#ffc20d",
        color: "black",
        borderRadius: "36px",
        fontSize: "20px",
        padding: "4px 40px",
        fontWeight: "100",
        marginTop: "40px"
      }}
      size="large"
      onClick={handleClick}
      endIcon={<SwapHorizIcon />}
    >
      {balance == 0 ? "Not Available" : "Swap Tokens"}
    </Button>
  );
}
