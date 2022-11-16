const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//connection with mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zbie1as.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const appointmentOptionCollection = client.db('doctorsPortal').collection('appointmentOptions');

        app.get('/appointmentOptions', async (req, res) => {
            // const date = req.query.date;
            const query = {};
            const options = await appointmentOptionCollection.find(query).toArray();

            // get the bookings of the provided date
            // const bookingQuery = { appointmentDate: date }
            // const alreadyBooked = await bookingsCollection.find(bookingQuery).toArray();

            // code carefully :D
            // options.forEach(option => {
            //     const optionBooked = alreadyBooked.filter(book => book.treatment === option.name);
            //     const bookedSlots = optionBooked.map(book => book.slot);
            //     const remainingSlots = option.slots.filter(slot => !bookedSlots.includes(slot))
            //     option.slots = remainingSlots;
            // })
            res.send(options);
        });

    }
    finally {

    }
}

run().catch(console.log)

app.get('/', async (req, res) => {
    res.send('Doctors portal server is running')
});

app.listen(port, () => {
    console.log(`Doctors portal running on ${port}`)
});