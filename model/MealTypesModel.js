const {Schema,model} = require('mongoose');

const MealTypesSchema = new Schema({
    
        
            name: {type: String},
            content: {type: String},
            image: {type: String},
            meal_type: {type: Number },
            
        
    })

const MealTypesmodel = model('mealtype',MealTypesSchema);

module.exports = MealTypesmodel;