var express = require('express');
var path = require('path')
var formidable = require('formidable')
var cors = require('cors')
// create an express app
var app = express();
var bodyParser= require('body-parser')
var upload= require('express-fileupload')
var fs = require('fs')
var PDF= require('pdfkit')
var blobStream=require('blob-stream')
var pdfMake = require('pdfmake/build/pdfmake.js');
const hellosign = require('hellosign-sdk')({key:'5f97fffcbcd59c017529de7064ac2bb37319d593cb99100e4d430dd48cc0a985'});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(upload())
app.use(cors())

const stripe = require("stripe")("");

// create an express route for the home page
// http://localhost:8080/
app.get('/', function(req, res) {
res.sendFile('index.html',{root:path.join(__dirname)});
});
// app.post('/users', function(req, res) {
//     let doc= new PDF();
//     let x =0;
//  // var dd;

//  if(req.files){
//     var file=req.files.filestoup

//     if (file.length !== 0) {
      
//         // doc.image('./images/bang.jpg',156,30,{width:300,height:200,align:'center',valign:'center'})
//         // doc.addPage()
//         //     let doc = new PDF();
//         doc.pipe(fs.createWriteStream(`pdfs/${req.body.bioFileName}.pdf`))  

//    var textfromclient =req.body.agree
//    // doc.pipe(fs.createWriteStream(`pdfs/sub.pdf`))
//     doc.image('./images/digi.jpeg', 156, 30, { width: 300, height: 100, align: 'center', valign: 'center' })
//     .moveDown(1.5)    
//     .fontSize(35)
//         .text('Description',40,170, { underline: true, margin:{left:70,right:70}})
//         .moveDown(0.5)
//         .fontSize(20)
//         .text(textfromclient,{align:'justify'})
//         .moveDown(1.5)
//         .text('Plzz Scroll Down to view site images')
//         .addPage()
//         console.log(textfromclient)
//         file.forEach(function (fila, index) {
//             var filename = fila.name
//             fila.mv('./images/' + filename, function (err) {
                
//                 if (err) {
//                     res.send('error')
//                 } else {
//                     //      doc.image('images/'+filename,x,y, {fit: [100, 100]})
//                     //    .rect(320, 15, 100, 100)
//                     //    .stroke()
//                     //    .text('Fit', 320, 0)

//                         doc.image('./images/' + fila.name,0,0,{width:612,height:792})
//                         if(index<file.length-1)
//                         {
//                          doc.addPage()
//                         }
//                         if (index === file.length-1) {
//                             doc.end()
//                             res.send("DONE")
//                         }
//                 }
//             })
//         })

//     }
// // hellosign.account.get().then((resp) => {
// //    console.log(resp)
// //   }).catch((err) => {
// // console.log(err)
// //   });
// //}
// const opts = {
//     test_mode: 1,
//     title: req.body.title,
//     subject: req.body.subject,
//     message: req.body.message,
//     signers: [
//       {
//         email_address:req.body.SignReqto,
//         name: 'Me'
//       }
//     ],
//     files: ['./pdfs/'+req.body.bioFileName+'.pdf']
//   };
  

//     hellosign.signatureRequest.send(opts).then((resp) => {
//         console.log(resp)
//       }).catch((err) => {
//         // handle error
//       })

  
// }
// })
app.post("/charge", (req, res) => {
 console.log(req.body)

 
 stripe.customers.create({
  email:req.body.stripeEmail,
  source:req.body.stripeToken
}).then((customer) => {
  return stripe.charges.create({
    amount: 1500,
    currency: "usd",
    source: "tok_visa",
    application_fee_amount: 150,
  }, {
    stripe_account: "acct_1EXo6WFn9Jy4C90X",
  }).then(function(charge) {
    res.send('success')
  });
});  
});
app.post("/pay",(req,res)=>{
  stripe.payouts.create(
    {
      amount:req.body.amount,
      currency: 'usd',
      method: 'instant',
    },
    {stripe_account: "acct_1EXo6WFn9Jy4C90X"}
  );
});
//start the server on port 8080
app.post('/paym',(req,res)=>{
  var collfeefloat=req.body.amount*0.1
 var collfee= Math.ceil(collfeefloat)
  stripe.customers.create({
    email:req.body.token.email,
    source:req.body.token.id
  }).then((customer) => {
    return stripe.charges.create({
      amount:req.body.amount,
      currency: "usd",
      source: "tok_visa",
      application_fee_amount:collfee,
    }, {
      stripe_account: "acct_1EXo6WFn9Jy4C90X",
    }).then(function(charge) {
      res.send('success')
    });
  });  
})
app.listen(8000)
// send a message
console.log('Server has started!');
