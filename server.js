const express = require('express');
const workoutRoutes = require('./routes/workoutRoutes');
const userRoutes = require('./routes/userRoutes')
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000
// connect to mongoose
mongoose
	.connect(process.env.MONGO_URI)
	.then((res) => {
		// listen for requests
		app.listen(PORT, () => {
			console.log(`connected to db and listening on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});

app.use(express.json());
app.use(cors())

app.use((req, res, next) => {
	console.log(req.ip, req.path, req.method);
	next();
});

app.use('/api/workouts', workoutRoutes);

app.use('/api/user', userRoutes)
