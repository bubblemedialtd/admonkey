import React, { useState } from "react";
import useWeb3Modal from "../../hooks/useWeb3Modal";
import Dashboard from "./rewardsDashboard/Dashboard";
import AdMonkey from "../../contracts/AdMonkey";
import AdMonkeyV2 from "../../contracts/AdMonkeyV2";
import Migration from "../../contracts/Migration";

export default function RewardsContainer() {
  const [initialized, setInitialized] = useState();
  const [provider, setProvider] = useState();
  const [reward, setBnbReward] = useState();
  const [balance, setBalance] = useState();
  const [adMonkey, setAdMonkey] = useState();
  const [adMonkeyV2, setAdMonkeyV2] = useState();
  const [migration, setMigration] = useState();
  const [invalidChain, setInvalidChain] = useState();
  const [v2Balance, setV2Balance] = useState();
  const [balanceMigration,setBalanceMigration] = useState();
  const [loading, setLoading] = useState(true);
  const [chainId, setChainId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [swapTokensTransactionId, setSwapTokensTransactionId] = useState(null);


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
      loadAdMonkey(provider, selectedAccount);
      loadAdMonkeyV2(provider, selectedAccount);
      loadMigration(provider,selectedAccount);
      setSelectedAddress(selectedAccount);
      setLoading(false);
    },
  });

  const loadAdMonkey = async (provider, account) => {
    setChainId(JSON.stringify(account));
    if (provider) {
      const adMonkeyContract = new AdMonkey(provider.provider, account);
      await setAdMonkey(adMonkeyContract);

      const balance = await adMonkeyContract.getBalance();
  
      setBalance(Math.round((balance / 10 ** 9) * 1000, 6) / 1000);

      console.log(`V1 balance is: ${balance}`);
    }
  };

  const loadAdMonkeyV2 = async (provider, account) => {
    setChainId(JSON.stringify(account));
    if (provider) {
      const adMonkeyContractV2 = new AdMonkeyV2(provider.provider, account);
      await setAdMonkeyV2(adMonkeyContractV2);

      const balanceV2 = await adMonkeyContractV2.getBalance();

      setV2Balance(Math.round((balanceV2 / 10 ** 9) * 1000, 6) / 1000);
      console.log(`V2 balance is: ${balanceV2}`);
    }
  };

  const loadMigration = async (provider, account) => {
    setChainId(JSON.stringify(account));
    if (provider) {

      const migrationContract = new Migration(provider.provider, account);
      await setMigration(migrationContract);

      const balanceMigration = await migrationContract.getBalance();

      setBalanceMigration(Math.round((balanceMigration / 10 ** 9) * 1000, 6) / 1000);
      console.log(`Migration V1 balance: ${balanceMigration}`);
    }
  }

  const onSwapTokens = async () => {
    if(migration) {
      const tx = await migration.transferTokens();

      setSwapTokensTransactionId(tx.transactionHash);

      window.reload();

      console.log(`Transaction hash: ${tx.transactionHash}`);
    }
  }

  return (
    <div>
      <Dashboard
        initialized={initialized}
        balance={balance}
        balanceV2={v2Balance}
        balanceMigration={balanceMigration}
        invalidChain={invalidChain}
        provider={provider}
        loadWeb3Modal={loadWeb3Modal}
        logoutOfWeb3Modal={logoutOfWeb3Modal}
        loading={loading}
        selectedAddress={selectedAddress}
        onSwapTokens={onSwapTokens}
        swapTokensTransactionId={swapTokensTransactionId}
      />
    </div>
  );
}
