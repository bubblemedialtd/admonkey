import React, { useState } from "react";
import useWeb3Modal from "../../hooks/useWeb3Modal";
import Dashboard from "./rewardsDashboard/Dashboard";
import { getTokenTransactionsForWallet } from "../../services/bscscan";

export default function RewardsContainer() {
  const [initialized, setInitialized] = useState();
  const [provider, setProvider] = useState();
  const [reward, setBnbReward] = useState();
  const [balance, setBalance] = useState();
  const [nextAvailableClaimDate, setNextAvailableClaimDate] = useState();
  const [transactions, setTransactions] = useState([]);
  const [invalidChain, setInvalidChain] = useState();
  const [v2Balance, setV2Balance] = useState();
  const [loading, setLoading] = useState(true);
  const [chainId, setChainId] = useState(null);
  const [claimedRewardTransaction, setClaimedRewardTransaction] =
    useState(null);

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
      setProvider(provider);
      setLoading(false);
    },
  });

  const isClaimButtonDisabled = () => {
    if (null != reward && parseFloat(reward, 10) !== 0) {
      return false;
    }
    return true;
  };


  return (
    <div>
      <Dashboard
        initialized={initialized}
        reward={reward}
        isClaimButtonDisabled={isClaimButtonDisabled()}
        balance={balance}
        nextAvailableClaimDate={nextAvailableClaimDate}
        transactions={transactions}
        invalidChain={invalidChain}
        provider={provider}
        loadWeb3Modal={loadWeb3Modal}
        logoutOfWeb3Modal={logoutOfWeb3Modal}
        loading={loading}
        claimedRewardTransaction={claimedRewardTransaction}
      />
    </div>
  );
}
