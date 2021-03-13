var express = require('express');
var router = express.Router();
// var config = require("../config/config");
var EmployeeDetails = require('../model/user');
// var common = require('../helpers/common');
// var mailhelper = require('../helpers/mailhelper');
var multer = require('multer');
var cloudinary = require('../helpers/cloudconfig');


// Multer
var storage = multer.diskStorage({
	destination:function(req, file,cb){
	if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
		cb(null, './public/stylesheets/assets/');
	} else {
		cb({message: 'this file is neither a video or image file'}, false)
	}
	},
	filename: function(req, file, cb){
	cb(null, file.originalname);
	}
	})
	var upload = multer({storage:storage});


	
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/uploads',upload.single('image'), (req, res) => {
	let file_s = req.file;
	console.log('Files', file_s);
	cloudinary.uploads(file_s.path).then(data=>{
		console.log('data',data);
	}).catch(err=>{
		c;onsole.log('err',err)
	});
	console.log(req.file);
});

router.post('/register', (req, res) => {
	try {
		var request = req.body;
		console.log('Add Profile', request);
			var myObj = new EmployeeDetails(request)
			myObj.save()
				datas = {
					status : true,
					message : "Profile added"
				};
				res.json(datas)
		}
		
	catch(e) {
		console.log(e)
		datas = {
			status : false,
			message : "Profile not added"
		};
	}
})


router.get('/View', (req, res) => {
	EmployeeDetails.find((error, data) => {
		console.log('View all', data);
		if (data) {
			res.json(data)
	  }
	})
})

router.get('/viewone/:id', (req, res) => {
	console.log('req', req.params.id);
	EmployeeDetails.findById(req.params.id, (error, data) => {
		console.log("data", data)
    if (error) {
      return (error)
    } else {
      res.json(data);
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

module.exports = router;
