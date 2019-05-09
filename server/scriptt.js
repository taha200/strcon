document.getElementById('pay').addEventListener('click',function(){
    fetch('/payment',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(response.id)
      }).then(res=> res.json()).then(data=>{
        console.log(data)
        if(data){
            console.log(data)
          }
          else
          alert('error')
      }).catch(err=>console.error(err));
      }
)