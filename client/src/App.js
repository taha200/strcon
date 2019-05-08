import React from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from "react-stripe-checkout";
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
    <StripeCheckout
      label="Go Premium" //Component button text
      name="Business LLC" //Modal Header
      description="Upgrade to a premium account today."
      panelLabel="Go Premium" //Submit button in modal
      token={this.onToken}
      stripeKey={"pk_test_bCmXwoxRy8zOJNHtMllynipN001tPiXGnY"}
      image="https://www.vidhub.co" //Pop-in header image
      billingAddress={false}
    />
      </div>
    );
  }
}
export default App;
