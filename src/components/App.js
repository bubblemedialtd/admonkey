import React, { Component } from 'react';
import logo from '../logo.png';
import _ from "lodash";
import Routes from "./Routes";
import AppContext from "../services/app-context";
import Dashboard from "./Rewards/rewardsDashboard/Dashboard";
//import './App.css';
import AdMonkeyMigration from '../abis/AdMonkeyMigration.json'
//import Navbar from './Navbar'
import Main from './Main'
import Web3ErrorModal from "./Modals/Web3ErrorModal";
import Web3Modal, { WalletConnectProvider } from "web3modal";


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      initialized: false,
    };
  }

  migrateTokens() {
    this.setState({ loading: false })
  }

  render() {
    return (
      <AppContext.Provider value={this.state.appContext}>
        <Routes />
      </AppContext.Provider>
    );
  }
}

export default App;
