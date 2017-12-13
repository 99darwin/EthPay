const axios = require('axios');

var api = axios.create({
    baseURL: 'http://localhost:3000/api'
});

module.exports = {
    getEmployees: function() {
        return api.get('/employee/list');
    },

    newEmployee: function(employee) {
        return api.post('/employee/new', employee);
    },

    removeEmployee: function(address) {
        return api.post('/employee/remove', address);
    },

    sendPayment: function(employees) {
        return api.post('/pay/send', employees)
    }
};
