var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
    "EmployeeName" 	 :  { type: String },
    "EmployeeCode"   :  { type: String },
    "UserImage"      :  { type: String },
});

module.exports = mongoose.model('EmployeeDetails', usersSchema, 'EmployeeDetails')
