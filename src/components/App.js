import React, { Component } from 'react';
import { Button,  Card, Row, Form, Tab, Col, Nav, ButtonGroup, Navbar} from 'react-bootstrap';
import { MDBDataTableV5 } from 'mdbreact';
import Web3 from 'web3';
import './App.css';
import {RPC, vrtAddress, vrtABI, daoABI,daoAddress, pinata_key, pinata_secret} from './config'
import { FaRegUserCircle } from 'react-icons/fa';

const axios = require('axios');


const web3 = new Web3(new Web3.providers.HttpProvider(RPC));
const vrtContract  = new web3.eth.Contract(vrtABI, vrtAddress)
const daoContract  = new web3.eth.Contract(daoABI, daoAddress)



class App extends Component {
  constructor(props){
    super(props)
    this.state={
      // DASH BOARD
      linkedAccount : '',
      accountType : '',
      totalSupply : '0',
      holders     : [],
      owner       : '',
      holderTable : [],

      // ELECTION STATUS
      electionNumber : 0,
      OpenedNumberElection : 0,
      EndedNumberElection : 0,
      electionTable : [],

      // create Election
      attachment    : [],
      electionContent : '',
      // Vote Table
      voteTable : []
    }
  }

  async walletConnect(){
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: web3.utils.toHex(1) }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: web3.utils.toHex(1) }],
          });
        } catch (addError) {
        }
      }
    }
        if(window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
          const clientWeb3    = window.web3;
          const accounts = await clientWeb3.eth.getAccounts();
          this.setState({
              linkedAccount : accounts[0]
          }) 
        } 

        else if(window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
            const clientWeb3    = window.web3;
            const accounts = await clientWeb3.eth.getAccounts();
            this.setState({
                linkedAccount : accounts[0]
            }) 
        } 

        if(this.state.linkedAccount === ''){
            return
        }

        const { ethereum } = window;
        ethereum.on('accountsChanged',  async(accounts) => {
          try{
            accounts =   web3.utils.toChecksumAddress(accounts + '')
          }catch(err){
          }
          
          this.setState({
            linkedAccount : accounts
          })
          this.checkDashBoard(this.state.linkedAccount)
          this.checkElectionStatus();
        });

        ethereum.on('chainChanged', async(chainId) => {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: web3.utils.toHex(1) }],
          });
        });

  }

 
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-primary" 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>
              <Navbar.Brand href="#home"><h1 className="text-light"  >  <b>&nbsp;&nbsp;VEGAN ROB'S TOKEN(VRT) STAKING</b></h1>
              </Navbar.Brand>
          </div>
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
              paddingRight: '32px'
            }}
          >
            <Button variant='outline-light primary' onClick={()=>this.walletConnect()}  disabled = {this.state.linkedAccount !== ""}>Connect Wallet</Button>
            <h1 style={{color : 'white'}}><FaRegUserCircle/></h1>
            <div>
              <p style={{color : 'white', margin : '2px'}}>{this.state.linkedAccount.slice(0,8) + "..."}</p>
            </div>
          </div>
        </nav><br/><br/>


        <div className='row'>
          <div className='col-1'></div>
          <div className='col-10'>
          <h3>Staking</h3><hr/><br/>
            <div className = "row">
              <div className='col-1'/>          
              <div className='col-2'>
                <Card bg = "light">
                  <Card.Header  bg = "dark" > <h6>Option 1</h6></Card.Header>
                  <Card.Body>
                    <Card.Text>
                      {this.state.totalSupply}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className='col-2'>
                <Card bg = "light">
                  <Card.Header  bg = "dark" > <h6>Option 2</h6></Card.Header>
                  <Card.Body>
                    <Card.Text>
                      {this.state.holders.length}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className='col-2'>
                <Card bg = "light">
                  <Card.Header  bg = "dark" > <h6>Option 3</h6></Card.Header>
                  <Card.Body>
                    <Card.Text>
                      {this.state.owner}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className='col-2'>
                <Card bg = "light">
                  <Card.Header  bg = "dark" > <h6>Option 4</h6></Card.Header>
                  <Card.Body>
                    <Card.Text>
                      {this.state.owner}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className='col-2'>
                <Card bg = "light">
                  <Card.Header  bg = "dark" > <h6>Option 5</h6></Card.Header>
                  <Card.Body>
                    <Card.Text>
                      {this.state.owner}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className='col-1'/>
            </div><br/><br/><br/><br/>
            <h3>Withdraw</h3><hr/>
          </div>
          <div className='col-1'></div>
        </div>
       
      </div>
    );
  }
}

export default App;
