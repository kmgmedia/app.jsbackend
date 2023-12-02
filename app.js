const Joi = require('joi')
const config = require('config');
const express = require('express');
const app = express ();
app.set('view engine', 'pug');
// The app.use is called middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const courses =[
    {id:1, name:"html"},
    {id:2, name:"csss"},
    {id:3, name:"javaScript"},
    
]

console.log('Aplication Name' + config.get('name'));
console.log('Mail Server' + config.get('mail.host'));
console.log('Mail Password' + config.get('mail.password'));


// app.get('/api/course', (req, res) =>{
//     res.send([1,2,3])
// });

// app.get('/api/posts/:year/:month', (req, res) =>{
//     res.send(req.params)
// });

app.get('/api/courses', (req, res) => {
    res.send(courses)
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id ===
        parseInt(req.params.id));
        if(!course) res.status(404).send('the course with the id not found');
    res.send(course)
});

app.post('/api/courses', (req, res)=>{
    
    const {error}= validateCourse(req.body);
    
    if (error){
        res.status(400).send(error.details[0].message)
        return;
    }
    const course = {
        id : courses.length + 1 ,
        name: req.body.name
    };
    courses.push(course);
    res.send(course)
});

app.put('/api/courses/:id', (req, res)=>{
    const course = courses.find(c => c.id ===
        parseInt(req.params.id));
        if(!course) res.status(404).send('the course with the id not found');

            const {error} = validateCourse(req.body);
        
        if (error){
            res.status(400).send(error.details[0].message)
            return;
        }

        course.name = req.body.name
        res.send(course)
        
});
app.get('/api/course/:id', (req, res) =>{
    res.send(req.params.id)
});
function validateCourse(course) {
    const schema = {
    name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema)
    }

    app.delete('/api/courses/:id', (req, res) => {
        const course = courses.find(c => c.id === parseInt(req.params.id));

        if (!course) res.status(404).send("the course with the id not found")
        const index = courses.indexOf(course);
        courses.splice(index, 1);
        res.send(course)

})

app.use(function(req, res, next) {
    console.log("Login...");
    next();
    });

    // app.use(function(req, res, next) {
    //     console.log("Authenticating...");
    //     next();
    //     });
        
    

    

    
const port = process.env.PORT || 3000;

app.listen (port, () => {console.log(`listening on port ${port}...`)});