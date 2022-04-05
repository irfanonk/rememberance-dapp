// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Rememberance is Ownable {

    receive() external payable {}

    fallback() external payable {}

    uint public fee = 0.1 ether;
    
    struct Epitaph {
      string firstName;
      string lastName;
      string birthCity;
      string birthCountry;
      string birthDate;
      string deathDate;
      string notes;
  }

    mapping(address => Epitaph[]) public epitaphs;


    event TransferEvent(address indexed to, uint256 value);
    event EpitaphEvent (        
        string indexed firstName,
        string indexed lastName,
        string indexed birthCity,
        string  firstNameStr,
        string  lastNameStr,
        string  birthCityStr,
        string  birthCountry,
        string  birthDate,
        string  deathDate,
        string  notes );

    constructor() {
    }


    function setFee(uint newFee) public onlyOwner returns (bool) {
        fee = newFee;
        return true;
    }

    function createEpitaph (
        string memory _firstName,
        string memory _lastName,
        string memory _birthCity,
        string memory _birthCountry,
        string memory _birthDate,
        string memory _deathDate,
        string memory _notes) public payable {

        require( msg.value == fee,"value should be exact to fee ");

        Epitaph memory newEpitaph = Epitaph({
            firstName:_firstName,
            lastName: _lastName,
            birthCity:_birthCity,
            birthCountry:_birthCountry,
            birthDate :_birthDate,
            deathDate:_deathDate,
            notes:_notes
        });
        epitaphs[msg.sender].push(newEpitaph);

        emit  EpitaphEvent (        
        _firstName,
        _lastName,
        _birthCity,
        _firstName,
        _lastName,
        _birthCity,
        _birthCountry,
        _birthDate,
        _deathDate,
        _notes);

    }

    function getAddressEpitaphCount (address _epitaphOwner) public view returns(uint) {
        return epitaphs[_epitaphOwner].length;
    }

    function getBalance () public view onlyOwner returns(uint) {
        return address(this).balance;
    }

    function transfer(
        address _to,
        uint256 _amount
    ) external virtual onlyOwner {
        require(_to != address(0), "transfer to the zero address");

        require(address(this).balance >= _amount, "transfer amount exceeds balance");

        payable(_to).transfer(_amount);

        emit TransferEvent(_to, _amount);

    }

}