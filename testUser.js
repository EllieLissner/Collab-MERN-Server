require('dotenv').config()
const db = require('./models')
db.connect() //test the db connection

const userTest = async () => {
    try{
        // const newUser = new db.User({
        //     name: 'shawn',
        //     email: 's@s.com',
        //     password: 'shawn',
        //     events: []
        // })

        // await newUser.save()
        // console.log('newuser:', newUser)
        
        //read -- at login
        const foundUser = await db.User.findOne({
            _id:  '60ef79a37df1cf1a66e4f687'
        })
        User.events.push('60ef9a2603e10c25518e0f03')
            console.log('Event pushed!')
            console.log(foundUser)

        console.log('found user', foundUser)
    }catch(error) {
        console.log(error)
    }
}

userTest()