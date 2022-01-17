const user_model = require('../Models/user');

exports.createUser = async (req, res, next) => {
    let data = req.body;
    if (data) {
        await user_model.create(data)
        return res.status(200).json({ "status_code": "200", "message": 'User Added Successfully', "data": data })
    } else {
        return res.status(200).json({ "status_code": "200", "message": 'Please Provide A User Details' })
    }
}


exports.statusChange = async (req, res, next) => {
    let data = await user_model.UpdateStatus()
    if (data) {
        return res.status(200).json({ "status_code": "200", "message": 'Status Updated Successfully' })
    } else {
        return res.status(200).json({ "status_code": "200", "message": 'No Data Found' })
    }
}


exports.getUserDistance = async (req, res, next) => {
    let data = await user_model.findOne({ where: { id: req.id } })
    if (data) {
        let userLat = data.latitude
        let userLong = data.longitute
        let currentLat = req.body.latitude
        let currentLong = req.body.longitute
        let func = distance(userLat, currentLat, userLong, currentLong)
        return res.status(200).json({ "status_code": "200", "message": 'updated Successfully', "data": func })
    } else {
        return res.status(400).json({ "status_code": "404", "message": 'No Data Found' })
    }
}


exports.userList = async (req, res, next) => {
    let data = await user_model.findAll()
    if (data) {
        await user_model
        return res.status(200).json({ "status_code": "200", "message": 'Data Fetch Successfully' })
    } else {
        return res.status(400).json({ "status_code": "200", "message": 'No Data Found' })
    }
}


function distance(lat1, lat2, lon1, lon2) {
    lon1 = lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
    console.log(a);
    let c = 2 * Math.asin(Math.sqrt(a));
    let r = 6371;
    return (c * r).toFixed(2) + " KM"
}