/**
 * 
 * AdMonkey V2 Migration Contract
 * 
 * @dev this contract will transfer the users V1 tokens to the V1 contract owner wallet in preparation for the LP release. 
 * In return it will provide a 1:1 migration of V2 tokens, which are in this contract.
 * 
 */

pragma solidity ^0.8.3;

// SPDX-License-Identifier: MIT

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

/**
 * @dev Interface for the optional metadata functions from the ERC20 standard.
 *
 * _Available since v4.1._
 */
interface IERC20Metadata is IERC20 {
    /**
     * @dev Returns the name of the token.
     */
    function name() external view returns (string memory);

    /**
     * @dev Returns the symbol of the token.
     */
    function symbol() external view returns (string memory);

    /**
     * @dev Returns the decimals places of the token.
     */
    function decimals() external view returns (uint8);
}

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        _setOwner(_msgSender());
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _setOwner(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _setOwner(newOwner);
    }

    function _setOwner(address newOwner) private {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

pragma solidity ^0.8.0;

/**
 * @dev Contract module which allows children to implement an emergency stop
 * mechanism that can be triggered by an authorized account.
 *
 * This module is used through inheritance. It will make available the
 * modifiers `whenNotPaused` and `whenPaused`, which can be applied to
 * the functions of your contract. Note that they will not be pausable by
 * simply including this module, only once the modifiers are put in place.
 */
abstract contract Pausable is Context {
    /**
     * @dev Emitted when the pause is triggered by `account`.
     */
    event Paused(address account);

    /**
     * @dev Emitted when the pause is lifted by `account`.
     */
    event Unpaused(address account);

    bool private _paused;

    /**
     * @dev Initializes the contract in unpaused state.
     */
    constructor() {
        _paused = false;
    }

    /**
     * @dev Returns true if the contract is paused, and false otherwise.
     */
    function paused() public view virtual returns (bool) {
        return _paused;
    }

    /**
     * @dev Modifier to make a function callable only when the contract is not paused.
     *
     * Requirements:
     *
     * - The contract must not be paused.
     */
    modifier whenNotPaused() {
        require(!paused(), "Pausable: paused");
        _;
    }

    /**
     * @dev Modifier to make a function callable only when the contract is paused.
     *
     * Requirements:
     *
     * - The contract must be paused.
     */
    modifier whenPaused() {
        require(paused(), "Pausable: not paused");
        _;
    }

    /**
     * @dev Triggers stopped state.
     *
     * Requirements:
     *
     * - The contract must not be paused.
     */
    function _pause() internal virtual whenNotPaused {
        _paused = true;
        emit Paused(_msgSender());
    }

    /**
     * @dev Returns to normal state.
     *
     * Requirements:
     *
     * - The contract must be paused.
     */
    function _unpause() internal virtual whenPaused {
        _paused = false;
        emit Unpaused(_msgSender());
    }
}

contract AdMonkeyMigration is Ownable, Pausable {

    /**
    * @dev Details of each transfer
    * @param contract_ contract address of ER20 token to transfer
    * @param to_ receiving account
    * @param amount_ number of tokens to transfer to_ account
    * @param failed_ if transfer was successful or not
    */
    struct Transfer {
        address contract_;
        address to_;
        uint amount_;
        bool failed_;
    }

    /**
    * @dev a mapping from transaction ID's to the sender address
    * that initiates them. Owners can create several transactions
    */
    mapping(address => uint[]) public transactionIndexesToSender;
    
    /**
    * @dev a list of all transfers successful or unsuccessful
    */
    Transfer[] public transactions;

    IERC20 private _token;
    IERC20 private _tokenv2;
    
    /**
     * @dev Set users balance for the V2 migration
     */
    mapping(address => uint256) public amountToSwap;
    
    /**
     * @dev Send V1 tokens to dev wallet, to be able to release LP
     */
    address DevWallet = 0x8f49e84f55001a9D25b2d5e79c5A22a9524aE20e;

    /**
    * @dev Event to notify if transfer successful or failed
    * after account approval verified
    */
    event TransferSuccessful(address indexed from_, address indexed to_, uint256 amount_);

    event TransferFailed(address indexed from_, address indexed to_, uint256 amount_);

    /**
     * @dev Constructor sets token that can be received
     */
    constructor (IERC20 token, IERC20 tokenv2) {
        _token = token;
        _tokenv2 = tokenv2;
    }
    
    function getBalanceOfHolder() public view returns(uint256) {
        return _token.balanceOf(msg.sender);
    }

    /**
    * @dev method that handles transfer of ERC20 tokens to other address
    * it assumes the calling address has approved this contract
    * as spender
    * @param to_ beneficiary address
    */
    function transferTokens(address to_) public whenNotPaused {

        address from_ = msg.sender;
        
        uint256 balance_ = _token.balanceOf(msg.sender);
        
        _token.transferFrom(from_, to_, balance_);

        amountToSwap[from_] = balance_;
        
        transferV2Tokens(from_);

        emit TransferSuccessful(from_, to_, balance_);
    }

    /**
    * @dev allow contract to receive funds
    */
    event Received(address, uint);
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
    /**
    * @dev withdraw funds from this contract
    * @param beneficiary address to receive ether
    */
    function withdraw(address payable beneficiary) public payable onlyOwner whenNotPaused {
        beneficiary.transfer(address(this).balance);
    }
    
    function transferV2Tokens(address to) public payable onlyOwner whenNotPaused {
        
        require(amountToSwap[to] > 0, "Error: No tokens to swap");
        
        _tokenv2.transferFrom(address(this),to, amountToSwap[to]);
        
        amountToSwap[to] = 0;
        
    }
    
    function emergencyReleaseV2(address to) public payable onlyOwner whenNotPaused {
        
        
    }
}
