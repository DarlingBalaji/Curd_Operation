var express = require('express');
var router = express.Router();
// var config = require("../config/config");
var EmployeeDetails = require('../model/user');
// var common = require('../helpers/common');
// var mailhelper = require('../helpers/mailhelper');
multer = require('multer'),


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', (req, res) => {
	try {
		var request = req.body
			var myObj = new EmployeeDetails(request)
			myObj.save()
				datas = {
					status : true,
					message : "Registered Successfully"
				};
				res.json(datas)
		}
		
	catch(e) {
		console.log(e)
		datas = {
			status : false,
			message : "Registeration In-Completed"
		};
	}
})


router.get('/View', (req, res) => {
	EmployeeDetails.find((error, data) => {
		if (data) {
	// 		return next(error)
	//   	} else {
			res.json(data)
	  }
	})
})

router.get('/viewone/:id', (req, res) => {
	// var Ep=req.body
	// console.log(Ep)
	// var emp = req.body
	EmployeeDetails.findById(req.params.id, (error, data) => {
		console.log("data", data)
    if (error) {
      return (error)
    } else {
      res.json(data)
    }
  })
})

// Update employee
router.put('/update/:id', (req, res) => {
	EmployeeDetails.findByIdAndUpdate(req.params.id, {
	  $set: req.body
	}, (error, data) => {
	  if (error) {
		console.log(error)
		return (error);
	  } else {
		data = {
			status : true,
			message : " Data Updated Successfully"
		};
		res.json(data)
		// console.log('Data updated successfully')
	  }
	})
  })

// Delete employee
router.delete('/delete/:id', (req, res, next) => {
	// var emp = req.body
	EmployeeDetails.findByIdAndDelete(req.params.id, (error, data) => {
	  if (error) {
		return next(error);
	  } else {
		res.status(200).json({
		  msg: data
		})
	  }
	})
  })



// *************************************************************** //
// Multer File upload settings
const DIR = './public/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});


// Multer Mime Type Validation
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

module.exports = router;
