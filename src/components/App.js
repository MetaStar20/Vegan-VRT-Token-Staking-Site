import React, { Component } from 'react';
import { Button,  Card, Row, Form, Tab, Col, Nav, ButtonGroup, Navbar, InputGroup, FormControl} from 'react-bootstrap';
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
      firstStakeAmount : 0,
      secondStakeAmount : 0,
      thirdStakeAmount : 0,
      fourthStakeAmount : 0,
      fifthStakeAmount : 0,
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

    const firstHandleAmount =  (e) => {
      let addLabel  = e.target.value
      this.setState({
        walletAddress : addLabel
      }) 
    }
    const secondHandleAmount =  (e) => {
      let addLabel  = e.target.value
      this.setState({
        walletAddress : addLabel
      }) 
    }
    const thirdHandleAmount =  (e) => {
      let addLabel  = e.target.value
      this.setState({
        walletAddress : addLabel
      }) 
    }
    const fourthHandleAmount =  (e) => {
      let addLabel  = e.target.value
      this.setState({
        walletAddress : addLabel
      }) 
    }
    const fifthHandleAmount =  (e) => {
      let addLabel  = e.target.value
      this.setState({
        walletAddress : addLabel
      }) 
    }


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
                <Card border="primary">
                  <Card.Header > <h6>Option 1</h6></Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <p>15 days / 1% ROI</p>
                    </Card.Text>
                    <InputGroup className="mb-3">
                        <FormControl id="basic-url" aria-describedby="basic-addon3" defaultValue = {this.state.firstStakeAmount} onChange={firstHandleAmount} />
                    </InputGroup>
                    <Button className='depositButton'  variant="success" onClick={()=>this.stake(1, this.state.firstStakeAmount)}>Deposit</Button>
                  </Card.Body>
                </Card>
              </div>
              <div className='col-2'>
                <Card border="primary">
                  <Card.Header > <h6>Option 2</h6></Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <p>30 days / 2% ROI</p>
                    </Card.Text>
                    <InputGroup className="mb-3">
                        <FormControl id="basic-url" aria-describedby="basic-addon3" defaultValue = {this.state.secondStakeAmount} onChange={secondHandleAmount} />
                    </InputGroup>
                    <Button className='depositButton'  variant="success" onClick={()=>this.stake(2, this.state.secondStakeAmount)}>Deposit</Button>
                  </Card.Body>
                </Card>
              </div>
              <div className='col-2'>
                <Card border="primary">
                  <Card.Header > <h6>Option 3</h6></Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <p>90 days / 9% ROI</p>
                    </Card.Text>
                    <InputGroup className="mb-3">
                        <FormControl id="basic-url" aria-describedby="basic-addon3" defaultValue = {this.state.thirdStakeAmount} onChange={thirdHandleAmount} />
                    </InputGroup>
                    <Button className='depositButton'  variant="success" onClick={()=>this.stake(3, this.state.thirdStakeAmount)}>Deposit</Button>
                  </Card.Body>
                </Card>
              </div>
              <div className='col-2'>
                <Card border="primary">
                  <Card.Header > <h6>Option 4</h6></Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <p>180 days / 20% ROI</p>
                    </Card.Text>
                    <InputGroup className="mb-3">
                        <FormControl id="basic-url" aria-describedby="basic-addon3" defaultValue = {this.state.fourthStakeAmount} onChange={fourthHandleAmount} />
                    </InputGroup>
                    <Button className='depositButton'  variant="success" onClick={()=>this.stake(4, this.state.fourthStakeAmount)}>Deposit</Button>
                  </Card.Body>
                </Card>
              </div>
              <div className='col-2'>
                <Card border="primary">
                  <Card.Header > <h6>Option 5</h6></Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <p>365 days / 50% ROI</p>
                    </Card.Text>
                    <InputGroup className="mb-3">
                        <FormControl id="basic-url" aria-describedby="basic-addon3" defaultValue = {this.state.fifthStakeAmount} onChange={fifthHandleAmount} />
                    </InputGroup>
                    <Button className='depositButton'  variant="success" onClick={()=>this.stake(5, this.state.fifthStakeAmount)}>Deposit</Button>
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
