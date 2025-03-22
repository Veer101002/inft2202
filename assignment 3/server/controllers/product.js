/*
Name: Virendrasinh Chauhan
Filename: product.js
Course: INFT 2202
Date: March 20, 2025
Description: Product controller with CRUD operations
*/

import dataService from '../service/dataService.js';

const productService = dataService('product');
const product = {
    index: async function (req, res) {
        try {
            let result;
            const user = req.headers['user'];
            if(req.params.name) {
                result = await productService.query(req.params.name);
            } else {
                result = await productService.load(req.query);
            }
            res.json(result);
        }
        catch(err) {
            res.status(400).json({ error: err.message });
        }
    },

    add: async function (req, res) {
        try {
            const user = req.headers['user'];
            const userData = req.body.map(item => ({
                _id: item.name,  // Critical for update functionality
                ...item,
                user,
                createTime: Math.floor(Date.now() / 1000),
                updateTime: null
            }));

            const result = await productService.add(userData);
            res.status(201).json({ 
                message: 'Products created successfully',
                insertedCount: result.insertedCount 
            });
        }
        catch(err) {
            res.status(400).json({ error: err.message });
        }
    },

    update: async function (req, res) {
        try {
            const userData = req.body;
            delete userData.createTime;
            userData.updateTime = Math.floor(Date.now() / 1000);
            
            // Directly return the MongoDB update result
            const result = await productService.update(userData);
            res.status(200).json({
                message: {
                    acknowledged: result.acknowledged,
                    modifiedCount: result.modifiedCount,
                    upsertedId: result.upsertedId,
                    upsertedCount: result.upsertedCount,
                    matchedCount: result.matchedCount
                }
            });
        }
        catch(err) {
            res.status(400).json({ 
                error: err.message,
                // Add stack trace for development
                ...(process.env.NODE_ENV === 'development' && { stack: err.stack }) 
            });
        }
    },    
    
    delete: async function (req, res) {
        try {
            const user = req.headers['user'];
            if(req.params.name) {
                const result = await productService.delete(req.params.name);
                res.status(200).json({
                    message: {
                        acknowledged: result.acknowledged,
                        deletedCount: result.deletedCount
                    }
                });
            } else {
                res.status(406).json({ error: 'Product name required' });
            }   
        }
        catch(err) {
            res.status(400).json({ 
                error: err.message,
                ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
            });
        }     
    }
};

export default product;