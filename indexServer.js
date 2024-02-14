const express = require('express');
const serverless = require('serverless-http')
const app = express();
const env = require('dotenv');
const path = require('path');
const connection = require('./Config/Connection');
const handler = require('./MiddleWare/ErrorHandle');
const cors = require('cors')
env.config()
connection()
app.get('/', (req, res) => {
    return res.status(200).send("This is pitzon API on Node js")
})
app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }))
app.use('/public', express.static(path.join(__dirname, "public")));
app.use('/api', require("./Routes"));
app.use(handler.invalidRoute, handler.errorHandler);
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    if (err.status) {
        console.log(err);
        console.log('error middleware');
        return res.status(err.status).json({
            msg: err.message
        })

    } else {

        console.log(err);
        console.log('error middleware status not given');
        return res.status(500).json({
            msg: err.message
        })
    }

})
app.listen(process.env.PORT, () => {
    console.log(`Your server is Running on port ${process.env.PORT}`)
})
module.exports = {
    handler: serverless(app)
}