import React from 'react';


class Bankinfo extends   React.Component 
{

  constructor(props) {
    super(props);
    this.state ={
        country: '',
        currency: '',
        account_holder_name: '',
        account_holder_type: '',
        routing_number: '',
        account_number:''
      }
  }
  TextBoxVal(e){
    this.setState({
        [e.target.name]:e.target.value
    })
}
async  submitBankInfo(e){
    e.preventDefault()

    const bankAccount=this.state
  
  await fetch('http://localhost:8000/createexternalacc',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bankAccount)
      }).then(res=>res.json()).then(data=>{
        console.log(data)
        if(data){
            console.log(data)
            this.setState({
                type:'',
                email:'',
                country:'',
                
            })
          }
          else
          alert('error')
      }).catch(err=>console.error(err));
      }
  render() {
    return (
      <div>
       <label>Country: </label><input type="text" style={{width:'500px'}} name="country" value={this.state.country} onChange={(e)=>this.TextBoxVal(e)}/>
       <br />
       <label>Currency: </label><input type="text" style={{width:'500px'}} name="currency" value={this.state.currency} onChange={(e)=>this.TextBoxVal(e)}/><br />
       <label>Account Holder Name:</label><input type="text" style={{width:'500px'}} name="account_holder_name" value={this.state.account_holder_name} onChange={(e)=>this.TextBoxVal(e)}/><br />
       <label>Account Holder Type:</label><input type="text" style={{width:'500px'}} name="account_holder_type" value={this.state.account_holder_type} onChange={(e)=>this.TextBoxVal(e)}/><br />
       <label>Routing Number:</label><input type="text" style={{width:'500px'}} name="routing_number" value={this.state.routing_number} onChange={(e)=>this.TextBoxVal(e)}/><br />
       <label>Account Number:</label><input type="text" style={{width:'500px'}} name="account_number" value={this.state.account_number} onChange={(e)=>this.TextBoxVal(e)}/><br />

        <button onClick={this.submitBankInfo.bind(this)}>Submit for Account Details for payout</button>
      </div>
    );
  }
}
export default Bankinfo;