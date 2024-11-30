// const LocationModel = require('../model/LocationsModel');

// module.exports.welcome = (req,res)=> {
//     res.send('Welcome to API');
// } 

// module.exports.getRestaurantList = async (req,res) => {
//     let result = await LocationModel.find();
//     res.send({
//         status: true,
//         location:result,
//     });
  
   
// };



const LocationsModel = require('../model/LocationsModel'); // Example model

module.exports.welcome = (req, res) => {
    res.send('Welcome to the API');
};

module.exports.getLocationList = async (req, res) => {
    try {
        const locations = await LocationsModel.find({country_name:"India"}); // Example of fetching data
        res.send({ status: true, locations });
    } catch (error) {
        res.status(500).send({ status: false, message: 'Error fetching locations' });
    }
};
