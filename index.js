
var express = require('express')
var app = express()
var mongoose = require('mongoose');

//var CONNECTION_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/patient_data"
var CONNECTION_URI = process.env.MONGODB_URI || "mongodb://Someone:database19@ds153775.mlab.com:53775/heroku_7479ctqr"
var port = process.env.PORT || 5000;
engines = require('consolidate');
MongoClient = require('mongodb').MongoClient,
//var session = require('express-session'),
//MongoClient = require('connect-mongodb-session')(session);
assert = require('assert');
var patient = require('./patient');
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//"test": "echo \"Error: no test specified\" && exit 1"
app.get("/" , (req, res) => {
   res.send("Hello Hospital!");  
  });
 
  
   
app.listen(port, () => {
    console.log("Server listening on port " + port);
   });

   
mongoose.connect(CONNECTION_URI,{ useNewUrlParser: true });

   // use case : Add patient 
   app.post("/patients/", function (req, res) {
    console.log("in add");
    var p = new patient();
   
    p.full_name = req.body.full_name;
    p.age = req.body.age;
    p.adress = req.body.adress;
    p.phone = req.body.phone;
    p.disease = req.body.disease;
    p.doctor = req.body.doctor;

    p.status = req.body.status;
    
   
    p.save(function (err) {
        if (err) {
            res.send(err);
        }
        console.log("added");
        res.send({ message: 'Patient added!' })
    })
});

//use case :  view list of patients
app.get("/patients", function (req, res) {
    patient.find(function (err, patients) {
        if (err) {
            res.send(err);
        }
        res.send(patients);
    });
});

// trial shit 


// use case :  delete everyone
app.delete('/patients', function (req,res){
    patient.deleteMany({}, function(err, next){
        if(err) { 
            res.send(err);
        }
    })
    res.json({message: 'Successfully deleted'})
})

// use case : list all patients
app.get('/patients', function (req,res){
    patient.find(function (err, patients){
        if(err){
            res.send(err);
        }
        res.send(patients)
    });
})



// use case: update patient 
app.put('/patients/:patient_id', function (req, res){
    patient.findById(req.params.patient_id, function(err, patient){
        if(err){
            res.send(err);
        }
        patient.full_name = req.body.full_name;
        patient.age = req.body.age;
        patient.adress = req.body.adress;
        patient.number = req.body.number;
        patient.disease = req.body.disease;
        patient.save(function(err){
            if (err)
                    res.send(err);

                    res.json({message: 'Patient data updated!'});

        });
        });
    });

// use case:dicharge patients 
app.delete('/patients/:patient_id', function (req, res){
    patient.findOneAndDelete(req.params.patient_id, function(err, patients){
        if(err){
            res.send(err);
        }
                    res.send(patients);
                   
                   // res.json({message: 'The patient is discharged!'});
        });
       
    });

//use case : view  patient
app.get('/patients/:patient_id', function (req,res){
    patient.findById(req.params.patient_id, function (err, patients){
        if(err){
            res.send(err);
        }
            res.send(patients);        
        });
   
})

// use case: add patient records

app.put('/patients/:patient_id/records', function (req, res){
    patient.findById(req.params.patient_id, function(err, patient){
        if(err){
            res.send(err);
        }
        patient.records = req.body.records;
       
        res.send(patients);        
        patient.save(function(err){
            if (err)
                    res.send(err);

                    res.json({message: 'Patient data updated!'});

        });
        });
    });

// use case: view patient records

app.get('/patients/:patient_id/records', function (req,res){
    patient.findById(req.params.patient_id, function (err, patient){
        if(err){
            res.send(err);
        }
            res.send(patient.records);        
        });
   
})


