#!/usr/bin/env node
// Supported system check

const os = require('os');
if (os.platform() != 'darwin' && os.platform() != 'linux'){
  console.log("OS support unavailable")
  process.exit(1);
}

// Database import
require('./config/mongoose.js');
var mongoose = require('mongoose');
var Site = mongoose.model('Site');

// Required child_process
const exec = require('child_process').exec;

// // Randomizer
// function random(){
//   return Math.round(Math.random())
// }

// Poll function
function poll(param){
  // Standard method
  exec(`ping -c 5 ${param.ip} | grep 'packets'`, (error, stdout, stderr) => {
    // Execution error
    if (error) {
      console.error(`exec error`);
      return (`exec error: ${error}`);
    }
    // Output Error
    if (stderr) {
      console.log(`stderr`);
      return (`stderr: ${stderr}`);
    }
    var packetlossint = parseFloat(stdout.split(" ")[6])/20

    if (packetlossint > 2){
      Site.findOneAndUpdate({ip:param.ip},{status:"Offline"},function(err, data){
        if (err){
          console.log(err);
        }
        else{
          console.log(data.location + ": Offline");
        }
      })
    }
    else{
      Site.findOneAndUpdate({ip:param.ip},{status:"Online"},function(err, data){
        if (err){
          console.log(err);
        }
        else{
          console.log(data.location + ": Online");
        }
      })
    }
  });

  // // Demo method
  // if (random() == 1) {
  //   Site.findOneAndUpdate({ip:param.ip},{status:"Online"},function(err, data){
  //     if (err){
  //       console.log(err);
  //     }
  //     else {
  //       console.log(data.status);
  //     }
  //   })
  // }
  // else{
  //   Site.findOneAndUpdate({ip:param.ip},{status:"Offline"},function(err, data){
  //     if (err){
  //       console.log(err);
  //     }
  //     else{
  //       console.log(data.status);
  //     }
  //   })
  // }
}

Site.find({}, function(err,result){
  var fromdb = result;
  // Run poll intervals
  for (var listnum in fromdb){
    // Interval is in minutes at this time * 60 seconds in a minute * 1000 milliseconds
    setInterval(poll, (fromdb[listnum].interval * 1000), fromdb[listnum])
  }
})
