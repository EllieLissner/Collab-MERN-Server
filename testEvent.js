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
            kind: "calendar-event",
            title: "Dinner with Dad",
            description: "Dinner at that cool resturaunt",
            location: "Charlie Gittos",
            creator: {
              name: "Ellie",
              userId: "01",
            },
            start: {
              date: '2021-07-15T05:00:00.000Z',
              time: { hours: null, minutes: null, ap: null, allday: false },
            },
            end: {
              date: '2021-07-15T05:00:00.000Z',
              time: { hours: null, minutes: null, ap: null, allday: false },
            }
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