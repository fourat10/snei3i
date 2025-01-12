//npm run watch
//git push -u origin maher
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const Worker = require("./models/worker.model");
const Client = require("./models/client.model");
const Admin = require("./models/admin.model");
const Offre = require("./models/offre.model");
const partner = require("./models/partner.model");
const reservation = require('./models/reservation.model')
const searchRoute = require("./routes/search.route");
const rateRoute = require("./routes/rate.route");
const partnerRoute = require('./routes/partner.route');
const workerRoute = require('./routes/worker.route');
const clientRoute = require('./routes/client.route');
const reservationRoute = require('./routes/reservation.route');
const authRoute = require('./routes/auth.route');
const path = require("path");
const cors = require('cors');
app.use(express.json({ limit: '50mb' }));

// Increase the size limit for URL-encoded form data
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
  origin: 'http://localhost:4200', // Replace with your Angular app's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.set('view engine', 'ejs');

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
//routes
//app.use("/api/products",productRoute);
app.use('/search',searchRoute);
app.use('/rate',rateRoute);
app.use('/partner',partnerRoute);
app.use('/worker',workerRoute);
app.use('/client',clientRoute);
app.use('/reservation',reservationRoute);
app.use('/connect',authRoute);
// Auto refresh setup
/*
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
*/
mongoose
  .connect('mongodb+srv://maherkhemakhem:OZXvWbLKbnAZqTpT@cluster0.6gotj.mongodb.net/all-data?retryWrites=true&w=majority')
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

// Routes
app.get('/', async (req, res) => {
  res.send("Hello from node API server updated");
});
app.get('/api/location', async (req, res) => {
  try {
    const uniqueLocations = await Worker.distinct("location");
    res.status(200).json(uniqueLocations);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching locations", error: error.message });
  }
});

//cookies
app.get('/set-cookies',(req,res)=>{

  res.cookie('newUser',false);
  res.cookie('isEmployee',true,{maxAge:1000*60*60*24,httpOnly:true});
  res.send('you got the cookies');
})

app.get('/read-cookies',(req,res)=>{
  const cookies = req.cookies;
  res.json(cookies);
})






