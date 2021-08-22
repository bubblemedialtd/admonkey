import React from "react";
import Button from "@material-ui/core/Button";
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import Migration from "../../../../contracts/Migration";

export default function SwapTokensButton({
  balance,
  onSwapTokens
}) {

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
      onClick={() => {
          onSwapTokens();
        }}      endIcon={<SwapHorizIcon />}
    >
      {balance == 0 ? "Not Available" : "Swap Tokens"}
    </Button>
  );
}
