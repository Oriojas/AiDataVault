import React from "react";
import { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { ethers } from "ethers";
const provider = new ethers.providers.Web3Provider(window.ethereum);

export default function Connection() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const connectwalletHandler = () => {
    if (provider) {
      provider.send("eth_requestAccounts", []).then(async () => {
        await accountChangedHandler(provider.getSigner());
      });
    } else {
      setErrorMessage("Please Install Metamask!!!");
    }
  };
  const accountChangedHandler = async (newAccount) => {
    const address = await newAccount.getAddress();
    setDefaultAccount(address);
    const balance = await newAccount.getBalance();
    setUserBalance(ethers.utils.formatEther(balance));
    await getuserBalance(address);
  };
  const getuserBalance = async (address) => {
    const balance = await provider.getBalance(address, "latest");
    return balance;
  };

  return (
    <div>
      <Row>
        <Col className="mt-2">
          <h2>Connection</h2>
          <h4 className="walletAddress">Add:{defaultAccount}</h4>
        </Col>
        <Col>
          <Button
            className="btn btn-primary mt-3 mb-2 fw-light"
            onClick={connectwalletHandler}
            size="lg"
          >
            {defaultAccount ? "🦊 Connected!" : "🦊 Connect"}
          </Button>
          <h3>{userBalance}</h3>
          <h3>{errorMessage}</h3>
        </Col>
      </Row>
    </div>
  );
}
