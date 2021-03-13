const cloudinary = require('cloudinary');

cloudinary.config({
	cloud_name: 'curd-operation-site',
	api_key: '869856864277279',
	api_secret: 'Tfh6NMOfwwjt2KKHwHikSiBN3LA'
});

exports.uploads  = (file) =>{
	return new Promise(resolve => {
		console.log('File', file);
	cloudinary.uploader.upload(file, (result) =>{
	resolve({url: result.url, id: result.public_id})
	}, {resource_type: "auto"})
	})
	}

if(process.env.NODE_ENV == 'devel')
{
	var environ = 'devel';
}
else
{
	var environ = 'prod';
}

// module.exports = require("./"+environ+".js");