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

  const getFee = async () => {
    const fee = await contract.fee();
    return fee;
  };

  const getEpitaphs = async (address, order) => {
    const epitaps = await contract.epitaphs(address, order);
    return epitaps;
  };

  const getAddressEpitaphCount = async (address) => {
    const count = await contract.getAddressEpitaphCount(address);
    return count;
  };
  const createEpitaph = async (data) => {
    const {
      firstName,
      lastName,
      birthCity,
      birthCountry,
      birthDate,
      deathDate,
      notes,
    } = data;
    const fee = await getFee();
    const options = { value: fee };
    const tx = await contract
      .connect(provider.getSigner())
      .createEpitaph(
        firstName,
        lastName,
        birthCity,
        birthCountry,
        birthDate,
        deathDate,
        notes,
        options
      );
    const result = await tx.wait();
    return result;
  };

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

  const filterEpitaphs = async (firstNaame, lastName, birthCity) => {
    let eventFilter = contract.filters.EpitaphEvent(
      firstNaame || null,
      lastName || null,
      birthCity || null
    );
    let events = await contract.queryFilter(eventFilter);
    return events;
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
        window.location.reload();
        if (acc.length > 0) {
          // changed account
          // setAccount(acc[0]);
          // const balance = await getBalance(acc[0]);
          // setUserBalance(balance);
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
        getEpitaphs,
        getAddressEpitaphCount,
        createEpitaph,
        filterEpitaphs,
      }}
    >
      {children}
    </web3Context.Provider>
  );
};
