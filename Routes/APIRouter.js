const express = require('express');
const router = express.Router();
const location = require('../controller/LocationController');
const restaurant = require('../controller/RestaurantController');
const MealType = require('../controller/MealTypeController');
//const { getMenuItemsByID } = require('../controller/MenuItemsController');
const menuitems = require('../controller/MenuItemsController');
const order = require('../controller/ordersController');
const payment = require('../controller/PaymentController');





router.get('/', (req, res) => {
    res.send('Hello, this is Express JS!');
});

router.get('/about', (req, res) => {
    res.send('Hello, this is the Express JS about page');
});

router.get('/contact', (req, res) => {
    res.send('Hello, this is the Express JS contact page');
});


router.get('/api', location.welcome);

// router.get('/api/get-location-list', location.getLocationList);


// router.get('/api/get-restaurant-list/:cityName',restaurant.getRestaurantData);


//  router.get('/api/get-MealType-list/:cityName', MealType.getMealTypeList);

// router.get('/api/get-restaurant-list:cityName',restaurant.getRestaurantList);


router.get('/api/get-location-list', location.getLocationList);

//Restaurant api
router.get('/api/get-restaurant-list-loc-id/:loc_id', restaurant.getRestaurantListByLocID);

router.post('/api/search-restaurant', restaurant.searchRestaurant);



router.get("/api/get-restaurant-details-by-id/:id",restaurant.getRestaurantListDetailsByID);

// router.get('/api/get-menu-items-list-by-rest-id/:rest_id', restaurant.getMenuItems);

 router.get('/api/get-menu-items/:rest_id', restaurant.getMenuItems);


router.post('/api/filter',restaurant.filter);
// router.post('/api/filter', RestaurantController.filter); 
//MealType
router.get('/api/get-MealType-list', MealType.getMealTypeList);

// router.get('/api/get-menuitems-list', menuitems, getMenuItemsByID)
router.get('/api/get-menu-items-list-by-rest-id/:rest_id', menuitems.getMenuItemsByRestID);







//orders
router.post('/api/save-order', order.saveNewOrder );

//payments
router.post('/api/gen-order-id', payment.genOrderId);
// router.post('/api/verify-payment', payment.verifyPayment);


module.exports = router;

    


