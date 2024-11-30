const MenuItemsModel = require('../model/MenuItemsModel');
const RestaurantModel = require('../model/RestaurantModel');
// const { mongoDbError } = require('./Routes/debugger');
module.exports.getRestaurantListByLocID = async (req,res)=> {
   let { loc_id } =req.params;
   try{
   let result = await RestaurantModel.find(
    { location_id: loc_id },
    { locality:1, name: 1, image:1, city:1 },
    
    { locality:2, name: 2, image:2, city:2 }

);
if (result.length === 0){
    res.send({ 
        status: false, 
        message: "No restaurant found" ,
});
   }
else{
    res.send({ 
        status: true, 
        restaurants: result,
    });
}
   }
    catch(error) {
        console.error("MongoDB Error:", error.message);

        res.status(500).send({ 
            status: false, 
            message: "Invalid id is passed",
         });
        }
    }
   

    module.exports.getRestaurantListDetailsByID = async(req,res)=> {
        let { id } = req.params;
        try{
        let result = await RestaurantModel.findById(id);
        res.send({
            status: true,
            restaurants: result,
        });
    } catch (error){
        res.status(500).send({
            status:false,
            message: "Internal Server Error",
            error:error.message,
        });
    }
    };

    module.exports.filter = async (req, res) => {
        //filter
        //mealtype  (mandatory)
        //location 
        //cuisines
        //cost-for-two(500 (Low_Cost)to 1000(High_cost))
        //sort (Ascending / Descending)
        //page(1,2,3,4,5) (pre-page -2 restaurant)
        //sort (ASC / DESC)
        //page(1,2,3,4,5)(pre-page - 2 restaurant)

let { mealtype, location, l_cost, h_cost, sort, cuisine} = req.body;
sort = sort ? sort: 1;
//high to low (DESC) and low to high (ASC)
 const filterData = {};
//  const l_cost = 500;
//  const h_cost = 1000;

 if(mealtype !== undefined) filterData['mealtype_id'] = mealtype;
 if(location !== undefined) filterData['location_id'] = location ;
 if(l_cost !== undefined && h_cost !== undefined) 
     filterData['min_price'] = { $gt: l_cost, $lt: h_cost};
    if(cuisine !== undefined) filterData['cuisine.id'] ={ $in: cuisine};
    console.log(filterData);
 

   try{
   let result = await RestaurantModel.find(filterData, {
    name:1,
    city:1,
    locality: 1,
    location_id:1,
    min_price:1,
    image:1,
    cuisine_id:1,
    cuisine:1,

   }).sort({
    min_price: sort,
   
   });
   //high to low (DESC) -1
   // low to high (ASC) 1

if (result.length === 0){
    res.send({ 
        status: false, 
        message: "No restaurant found" ,
});
   }
else{
    res.send({ 
        status: true, 
        restaurants: result,
    });
}
   }
    catch(error) {
        // mongoDbError(error.message);
          console.error("MongoDB Error:", error.message);
        res.status(500).send({ 
            status: false, 
            message: "Invalid id is passed",
         });
        }
    }
   
     
module.exports.getMenuItems = async (req,res)=>{
    let {_id} = req.params;

    try{
   let result = await MenuItemsModel.find({restaurant:_id});
   res.status(200).send({
    status: true,
    menu_items: result,
   });
    }  
     catch(error) {
        console.error("MongoDB Error:", error.message);

        res.status(500).send({ 
            status: false, 
            message: "Invalid id is passed",
         });
        }
  
}


module.exports.searchRestaurant = async (req,res) => {
   let {restaurant, loc_id} = req.body; 
   
   let result = await RestaurantModel.find({
   name:{ $regex: restaurant+'.*', $options: 'i'},
   location_id: Number(loc_id),

   })
    res.send({
         status: true, 
         message: 'it working ',
         restaurant, 
         loc_id,
         result
        });
}




