const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./server/routes/events.routes');


require('./server/config/events.mongoose.config')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


routes(app);

app.listen(5000, () => {
    console.log("events server is running on port 5000")
})