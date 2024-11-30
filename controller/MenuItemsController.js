// const mongoose = require('mongoose');


// const MenuItemsModel = require('../model/MenuItemsModel');


//   module.exports.getMenuItemsByRestID = async(req,res)=> {
//          let { rest_id } = req.params;
//          try{
//         //  let result = await MenuItemsModel.findById({restaurantId: rest_id});
//         let result = await MenuItemsModel.find({ restaurantId: new mongoose.Types.ObjectId(rest_id) });
//          res.send({
//              status: true,
//              menu_items: result,
//          });
//      } catch (error){
//          res.status(500).send({
//              status:false,
//              message: "Internal Server Error",
//              error:error.message,
//          })
//      }
//      }
 
 




const MenuItemsModel = require('../model/MenuItemsModel');
const { mongoDbError} = require('../Routes/debugger');


  module.exports.getMenuItemsByRestID = async(req,res)=> {
         let { rest_id } = req.params;
         try{
         let result = await MenuItemsModel.find({restaurantId: rest_id});
        
         res.send({
             status: true,
             menu_items: result,
         });
     } catch (error){
        mongoDbError(error.message);
         res.status(500).send({
             status:false,
             message: "Internal Server Error",
             error:error.message,
         })
     }
     }
 
 



