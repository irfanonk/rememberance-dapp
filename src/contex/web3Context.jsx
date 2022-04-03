import React, { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";

import { formatUntis, fromBNtoEth, parseUnits } from "../utils/etherUtils";
import { rememberanceAddress, rememberanceAbi } from "../contracts/constants";
import { formatBalance } from "../utils/helperUtils";

export const web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState();
  const [userBalance, setUserBalance] = useState();
  const [networkId, setNetworkId] = useState();
  const [isSupportMetaMask, setIsSupportMetaMask] = useState(false);

  let provider;
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
  } else {
    provider = undefined;
  }

  const contract = new ethers.Contract(
    rememberanceAddress,
    rememberanceAbi,
    provider
  );

  const requestAccount = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
  };
  const getAccBalance = async () => {
    if (provider) {
      if (account) {
        let balance = await provider.getBalance(account);
        return ethers.utils.formatEther(balance.toString()).toFixed(2);
      }
    }
  };

  const getBalance = async (address) => {
    if (provider) {
      let balance = await provider.getBalance(address);
      return fromBNtoEth(balance);
    }
  };

  const loadWeb3 = async () => {
    if (window.ethereum) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      setIsSupportMetaMask(true);
    } else {
      setIsSupportMetaMask(false);
    }
  };
  const handleStartUp = async () => {
    if (typeof window.ethereum != undefined) {
      const acc = await provider.listAccounts();
      if (acc.length > 0) {
        setAccount(acc[0]);
        const balance = await getBalance(acc[0]);
        setUserBalance(balance);
      }
      setNetworkId(window.ethereum.networkVersion);
      window.ethereum.on("chainChanged", function (networkId) {
        // Time to reload your interface with the new networkId
        window.location.reload();
        // setNetworkId(networkId);
      });
      window.ethereum.on("accountsChanged", async function (acc) {
        if (acc.length > 0) {
          // changed account
          setAccount(acc[0]);
          const balance = await getBalance(acc[0]);
          setUserBalance(balance);
        } else {
          // disconnect
          setAccount([]);
        }
      });
    }
  };

  useEffect(() => {
    (async () => {
      await loadWeb3();
      await handleStartUp();
    })();

    return () => {};
  }, [account]);

  return (
    <web3Context.Provider
      value={{
        requestAccount,
        account,
        provider,
        networkId,
        isSupportMetaMask,
        userBalance,
      }}
    >
      {children}
    </web3Context.Provider>
  );
};
