import React from "react";
import Button from "@material-ui/core/Button";

export default function WalletButton({
  provider,
  loadWeb3Modal,
  logoutOfWeb3Modal,
}) {
  return (
    <Button
      style={{
        backgroundColor: "#ffc20d",
        color: "black",
        borderRadius: "20px",
      }}
      className="ml-1"
      onClick={() => {
        if (!provider) {
          loadWeb3Modal();
        } else {
          logoutOfWeb3Modal();
        }
      }}
    >
      {!provider ? "Connect" : "Disconnect"}
    </Button>
  );
}
