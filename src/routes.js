const express = require('express');
const routes = express.Router();

const citiesController = require('./controllers/CitiesController')
const customersController = require('./controllers/CustomersController')

routes.get('/', citiesController.getCities)
routes.get('/customers', customersController.getCustomers)
routes.get('/customers/:id', customersController.getCustomers)
routes.post('/cities/register', citiesController.registerNewcity)
routes.post('/customers/register', customersController.registerNewCustomer)
routes.delete('/customers/delete/:id', customersController.deleteCustomer)
routes.put('/customers/edit/:id', customersController.editCustomer)
module.exports = routes;