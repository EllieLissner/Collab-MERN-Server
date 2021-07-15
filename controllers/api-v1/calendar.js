const router = require('express').Router()
const { format, startOfDay } = require('date-fns')
const db = require('../../models')

//get /users == test api endpoint
router.get('/', (req, res) => {
    res.json({msg: 'hi! the calendar endpoint is ok'})
})

const today = new Date()
const format1 = format(today, 'MM/dd/yyyy')
const format2 = startOfDay(today)
console.log({today, format1, format2: format2.toISOString()})

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

        // create our new calendar
        const newEvent = db.Event({
            title: req.body.title,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            location: req.body.location
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

// router.get('')

//post /user/login -- validate login creds
// router.post('/login', async (req, res) => {
//     try{
//         // try to find the user in the db from the req.body.email
//         const findUser = await db.User.findOne({
//             email: req.body.email
//         })

//         const validationFailedMessage = 'Incorrect username or password 😢'
//         //if the user is not found -- return immediately
//         if(!findUser) return res.status(400).json({msg: validationFailedMessage})

//         // check the users password against what is in the req.body
//         const matchPassword = await bcrypt.compare(req.body.password, findUser.password)

//         //if the password doesnt match -- return immediately
//         if(!matchPassword) return res.status(400).json({msg: validationFailedMessage})
//         // create the jwt payload
//         const payload = {
//             name: findUser.name,
//             email: findUser.email,
//             if: findUser.id
//         }
//         //sign the jwt and send it back
//         const token = await jwt.sign(payload, process.env.JWT_SECRET,{ expiresIn: 60 * 60})
//         res.json({ token })
//     }catch (err) {
//         console.log(error)
//         res.status(500).json({msg: 'internal server error'})
//     }
// })

// get /auth-locked -- will redirect if a bad (or no) jwt is found
// router.get('/auth-locked', authLockedRoute, (req, res) => {
//     // do whatever we like with the user
//     console.log(res.locals.user)
//     // send private data back
//     res.json({msg: 'welcome to the auth-locked route you lucky dog! 🐩'})
// })

module.exports = router