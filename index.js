const express = require('express');
const mongoose  = require('mongoose');
const userRoutes = require('./routes/Users');
const taskRoutes = require('./routes/Orders');
const db = require('./config/key').MongoURL;
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;



mongoose.connect(db,{useNewUrlParser:true})
.then(() => console.log('Successfully Connected to MongoDB')).catch(error => {
console.log(error);
});

app.use(express.json());
app.use(cors());


app.use('/', userRoutes);
app.use('/', taskRoutes);


app.listen(PORT, () => {
    console.log(`Server Running On PORT ${PORT}`)
});

module.exports = app;