const user_model = require('../Models/user');
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res, next) => {
    let data = req.body;
    if (data) {
        let done = await user_model.create(data)
        const token = jwt.sign(
            { id: done.id, latitude: done.Latitude, longitude: done.Longitude },
            process.env.JWT_KEY,
            {
                expiresIn: "12000h",
            }
        );
        let data1 = { ...done.dataValues, token: token }
        return res.status(200).json({ "status_code": "200", "message": 'User Added Successfully', "data": data1 })
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
        let userLong = data.longitude
        let currentLat = req.latitude
        let currentLong = req.longitude
        let func = distance(userLat, currentLat, userLong, currentLong)
        return res.status(200).json({ "status_code": "200", "message": 'Data Get Successfully', "data": func })
    } else {
        return res.status(200).json({ "status_code": "200", "message": 'No Data Found' })
    }
}


exports.userList = async (req, res, next) => {
    let data = await user_model.findAll()
    let request = req.body.days
    let arr = []
    if (data) {
        for (let i of request) {
            data.forEach((ele) => {
                if (ele.createdAt.getDay() == i) {
                    arr.push(ele)
                }
            })
        }
        return res.status(200).json({ "status_code": "200", "message": 'Data Fetch Successfully', data: arr })
    } else {
        return res.status(200).json({ "status_code": "200", "message": 'No Data Found' })
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