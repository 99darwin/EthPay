const API = require("./api.js");

module.exports = function(app) {
    // Page routes
    app.get('/', (req, res) => {
        API
        .getAddresses()
        .then(result => {
            let renderData = {
                employees: result.data
            };

            res.render('dashboard', renderData);
        })
        .catch(err => console.log(err));
    });

    // API routes
    app.post('/pay', (req, res) => {
        API
        .sendPayment(req.body)
        .then(result => console.log(result))
        .catch(err => console.log(err));
    });
}
