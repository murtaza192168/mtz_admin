// Set up basic routes to add new inventory items and fetch all inventory items

const express = require('express');
// import the exported inventoryModel here.. and stoe it in a literal to be used further
const Inventory = require('../models/Inventory');
const router = express.Router();


// Add a new Item using POST request
router.post('/add', async(req, res) => {
    const {prodBrand, prodCategory, prodName, quantity, weight, gstPercentage, supplierName, costPrice } = req.body;

    try {
        const newInventory = new Inventory({
            prodBrand, 
            prodCategory, 
            prodName, 
            quantity, 
            weight, 
            gstPercentage, 
            supplierName, 
            costPrice 
        })
        // save the inventory when the data is filled in completely (save)
        const savedInventory = await newInventory.save();
        res.status(201).json(savedInventory);
    }catch(error){
        res.status(500).json({message: 'Error adding inventory item', error})
    }
})

// Get all inventory items using GET request
router.get('/', async(req, res) => {
    try{
        // finding the inventory
        const inventory = await Inventory.find();
        res.json(inventory);
    }catch(error){
        res.status(500).json({message: 'Errror fetching inventory', error})
    }
});

// export this route to the main server.js file to integrate it
module.exports = router;