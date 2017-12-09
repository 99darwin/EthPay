const API = require("./api.js");

module.exports = function(app) {
    // Page routes
    app.get('/', (req, res) => {
        API
        .getAddresses()
        .then(result => {
            let renderData = {
                employees: result.data,
                active: { dashboard: true }
            };

            res.render('dashboard', renderData);
        })
        .catch(err => console.log(err));
    });

    app.get('/employees', (req, res) => {
        API
        .getAddresses()
        .then(result => {
            let renderData = {
                employees: result.data,
                count: result.data.length,
                total: 0,
                active: { employees: true }
            };

            // 2+2 is 4 - quik mafs
            for(let s = 0; s < result.data.length; s++)
            {
                renderData.total += result.data[s].salary;
            }

            res.render('employees', renderData);
        })
        .catch(err => console.log(err));
    });

    // API routes
    app.post('/pay', (req, res) => {
        API
        .sendPayment(req.body)
        .then(result => res.json(result.data))
        .catch(err => console.log(err));
    });
}
