import React from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from "react-stripe-checkout";
import Routing from './Routing'
class App extends   React.Component 
{

  onToken = (token)=>{
     const bodya={
       amount:999,
       token:token
     }
     fetch("http://localhost:8000/paym",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodya)
    }).then(res=>res.json()).then(data=>{
      console.log(data)
      if(data){
          console.log(data)
        }
        else
        alert('error')
    }).catch(err=>console.error(err));
  }

  // constructor(props) {
  //   super(props)
  // }
  
  render() {
    return (
      <div className="App">
      <Routing />
      </div>
    );
  }
}
export default App;
