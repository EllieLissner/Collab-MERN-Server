const router = require('express').Router()
const { format, startOfDay } = require('date-fns')
const db = require('../../models')


//get route to render events for today
router.get('/event', async (req, res) => {
    try{
        const events = await db.Event.find({"start.date": startOfDay( new Date()).toISOString()})
        if(events) {
            res.send(events)
        } else {
            res.send({
                message: "Nothing Scheduled today!"
            })
        }
    }catch(error) {
        console.log(error)
        
        res.status(500).send(error)
    }
})


// post /users == create a new user
router.post('/createEvent', async (req, res) => {
    try{
        console.log(req.body)
        // create our new calendar
        const newEvent = db.Event({

            kind: req.body.kind,
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            creator: {
              name: req.body.name,
              userId: req.body.userId,
            },
            start: {
              date: req.body.start.date,
              time: { hours: req.body.start.time.hours, minutes: req.body.start.time.minutes, ap: req.body.start.time.ap, allday: req.body.start.time.allday },
            },
            end: {
              date: req.body.end.date,
              time: { hours: req.body.end.time.hours, minutes: req.body.end.time.minutes, ap: req.body.end.time.ap, allday: req.body.end.time.allday },
            }
        
        })
        
        await newEvent.save()
        res.json('Event created!')
        console.log(newEvent)

        // const foundEvent = await db.Event.findOne({
        //     name: req.body.name,
        //     _id: req.body._id
        // }).populate('users')
        // res.json({ msg: 'Users Populated!'})
        // console.log(foundEvent)
    }catch(error) {
        console.log(error)
        res.status(500).json({msg: 'Event creation failed!'})
    }
})

router.put('/editevent/:id', async (req, res) => {
    try {
        const updateEvent = await db.Event.findById(req.params.id)
        updateEvent.kind = req.body.kind
        updateEvent.title = req.body.title
        updateEvent.description = req.body.description
        updateEvent.location = req.body.location
        updateEvent.creator.name = req.body.name
        updateEvent.creator.userId = req.body.userId
        updateEvent.start.date = req.body.start.date
        updateEvent.start.time.hours = req.body.start.time.hours
        updateEvent.start.time.minutes = req.body.start.time.minutes
        updateEvent.start.time.ap = req.body.start.time.ap
        updateEvent.start.time.allday = req.body.start.time.allday
        // updateEvent.start = {
        //       date = req.body.start.date,
        //       time = { hours = req.body.start.time.hours, minutes = req.body.start.time.minutes, ap = req.body.start.time.ap, allday = req.body.start.time.allday },
        //     },
        updateEvent.end.date = req.body.end.date
        updateEvent.end.time.hours = req.body.end.time.hours
        updateEvent.end.time.minutes = req.body.end.time.minutes
        updateEvent.end.time.ap = req.body.end.time.ap
        updateEvent.end.time.allday = req.body.end.time.allday
        // updateEvent.end = {
        //       date = req.body.end.date,
        //       time = { hours = req.body.end.time.hours, minutes = req.body.end.time.minutes, ap = req.body.end.time.ap, allday = req.body.end.time.allday },
        //     }

        await updateEvent.save()
        res.send(updateEvent)

    } catch (error) {
        res.status(500).send(error)
    }
})



module.exports = router