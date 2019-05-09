import React from 'react';


class Connectform extends   React.Component 
{

  constructor(props) {
    super(props);
    this.state ={
        type:'',
        email:'',
        country:'',
        requested_capabilities: ['card_payments']
    }
  }
  TextBoxVal(e){
    this.setState({
        [e.target.name]:e.target.value
    })
}
async  submitPost(e){
    e.preventDefault()

    const account=this.state
    this.props.history.push('/bankinfo')
  await fetch('http://localhost:8000/createacc',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(account)
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
routeToBankInfo(path){
    this.props.history.push(path)
}
  render() {
    return (
      <div>
       <label>Type:</label><input type="text" style={{width:'500px'}} name="type" value={this.state.type} onChange={(e)=>this.TextBoxVal(e)}/> <br />
       <label>Email:</label><input type="text" style={{width:'500px'}} name="email" value={this.state.email} onChange={(e)=>this.TextBoxVal(e)}/><br />
       <label>Country:</label><input type="text" style={{width:'500px'}} name="country" value={this.state.country} onChange={(e)=>this.TextBoxVal(e)}/><br />
        <button onClick={this.submitPost.bind(this)}>Submit for connected Account</button>
      </div>
    );
  }
}
export default Connectform;