import MigrationAbi from "./MigrationAbi.json";
import Web3 from "web3";

export default class Migration {
  constructor(provider, account) {
    this.provider = new Web3(provider);
    this.account = account;
    this.contract = new this.provider.eth.Contract(
      MigrationAbi.abi,
      process.env.REACT_APP_MIGRATION_ADDRESS
    );
  }

  async getBalance() {
    if (!this.provider) return;
    return await this.contract.methods.balanceOf(this.account).call();
  }
}