// const MealTypeList = require('../model/MealType.json'); 
// module.exports.getMealTypeList = (req, res) => {
//     let data = req.params;

//     let result = MealTypeList.filter(function (MealType) {
//         return MealType.city.toLowerCase() === data.cityName.toLowerCase(); // Direct comparison without toLowerCase()

//     });

//     res.send({
//         status: true,
//         MealType: result,
//     });
// };
// module.exports.getMealTypeList= (req,res) => {
//   res.send ({
//         status: true,
//         MealType: MealTypeList,
//     });
// }

   

const MealTypesModel = require('../model/MealTypesModel');

module.exports.getMealTypeList =  async (req,res)=> {
    let result = await MealTypesModel.find();

    res.send({
        status: true,
        meal_types: result,
    })

}

