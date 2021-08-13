/**
 * @design by milon27
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors')
const cookieparser = require('cookie-parser')
//const ratelimiter = require('express-rate-limit')
const helmet = require('helmet');

const AuthMid = require('./routers/middleware/AuthMid');
const ErrorMid = require('./routers/middleware/ErrorMid');

const app = express();
/**
 * @middleware
 */
//url encode + json encode
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieparser());
app.use(helmet());
//enable cros 
app.use(cors({ origin: true, credentials: true }))

//connect db
require('./models')

//routers
app.get('/', (req, res) => res.send('home'))
app.use('/auth', require('./routers/authRouter'))
app.use('/client', AuthMid, require('./routers/clientRouter'))


//catch all error
app.use(ErrorMid);

const port = process.env.PORT || 2828;
app.listen(port, () => console.log(`running at http://localhost:${port} `))