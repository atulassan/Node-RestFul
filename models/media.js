var express = require('express');
var router = express.Router();

//show all Customers
router.get('/api/v1/customers', (req, res) => {
    let sql = "SELECT * FROM customers";
    let query = conn.query(sql, (err, results) => {
        if (err) {
            console.log("error ocurred", err);
            res.send(JSON.stringify({ "status": 400, "error": err }));
        } else {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        }
    });
});


//show single Customer
router.get('/api/v1/customers/:id', function (req, res) {
    let sql = "SELECT * FROM customers WHERE ProductID=" + req.params.id;
    let query = conn.query(sql, (err, results) => {
        //if (err) throw err;
        var numrows = results.length;
        console.log(numrows);
        if (err || parseInt(numrows) == 0) {
            console.log("error ocurred", err);
            if (numrows === 0) {
                res.send(JSON.stringify({ "status": 400, "error": "Requrest Data Is not Valid", "response": "No Data" }));
                return;
            }
            res.send(JSON.stringify({ "status": 400, "error": err }));
        } else {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        }

    });
});

//add New Customer 
router.post('/api/v1/customers', (req, res) => {

    let data = {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Phone: req.body.Phone,
        Email: req.body.Email,
        UserName: req.body.UserName,
        PassWord: req.body.PassWord,
        Status: req.body.Status
    };
    let sql = "INSERT INTO customers SET ?";
    let query = conn.query(sql, data, (err, results) => {
        if (err) {
            console.log("error ocurred", err);
            res.send(JSON.stringify({ "status": 400, "error": err }));
        } else {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        }
    });

});

//update Customer
router.put('/api/v1/customers/:id', (req, res) => {
    let sql = "UPDATE customers SET  FirstName='" + req.body.FirstName + "', LastName='" + req.body.LastName + "', Phone='" + req.body.Phone + "', EMail='" + req.body.Email + "', UserName='" + req.body.UserName + "', PassWord='" + req.body.PassWord + "', Status='" + req.body.Status + "' WHERE CustomerID='" + req.params.id + "'";
    //let sql = "UPDATE products SET product_name='" + req.body.product_name + "', product_price='" + req.body.product_price + "' WHERE product_id=" + req.params.id;
    let query = conn.query(sql, (err, results) => {
        if (err) {
            console.log("error ocurred", err);
            res.send(JSON.stringify({ "status": 400, "error": err }));
        } else {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        }
    });
});

//Delete Customer
router.delete('/api/v1/customers/:id', (req, res) => {
    let sql = "DELETE FROM customers WHERE CustomerID=" + req.params.id + "";
    let query = conn.query(sql, (err, results) => {
        if (err) {
            console.log("error ocurred", err);
            res.send(JSON.stringify({ "status": 400, "error": err }));
        } else {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        }

    });
});

module.exports = router;