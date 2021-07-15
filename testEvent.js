require('dotenv').config()
const db = require('./models')
db.connect() //test the db connection

const eventTest = async () => {
    try{
        //Create
        // const newEvent = new db.Event({
        //     name: 'testEvent',
        //     email: 'o@c.com',
        //     password: 'oliver'
        // })

        // await newEvent.save()
        // console.log('newEvent:', newEvent)
        //read -- at login
        const createEvent = new db.Event({
            title: 'Whitney School',
            startDate: 'August 21, 2021',
            endDate: 'August 21, 2021',
            startTime: '9:00 AM',
            endTime: '2:30 PM',
            location: 'Elementary School'
        })

        await createEvent.save()
        console.log('created event:', createEvent)

        const foundEvent = await db.Event.findOne({
            name: 'Whitney School'
        })

        console.log('found event:', foundEvent)
    }catch(error) {
        console.log(error)
    }
}

eventTest()