const axios = require('axios');

var api = axios.create({
    baseURL: 'http://localhost:3000/api'
});

module.exports = {
    getAddresses: function() {
        return api.get('/address');
    },  

    sendPayment: function(employees) {
        return api.post('/pay/send', employees)
    }
};
