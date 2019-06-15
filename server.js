require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const movieListSmall = require('./movies-data-small.json')
const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(helmet())
app.use(validateRequest)

function validateRequest(req, res, next) { 
  const apiToken = process.env.API_TOKEN 
  const authToken = req.get('Authorization')

if (!authToken || authToken.split(' ')[1] !== apiToken) { 
  return res.status(401).json({ error: 'Unauthorized request' }) } 
    next() 
}


// Users can search for Movies by genre, country or avg_vote
// When theres no name, it means to filter by type: Change the if to an else
    // Take the query.type and check if it .include() genre, country, and avg_vote
function movieFilter(req, res) {
    let response = movieListSmall;
    if (req.query.name) {
        console.log('name ran')
        response = response.filter(movie => 
            movie.film_title.toLowerCase().includes(req.query.name.toLowerCase())
            )
    }
    // submit feedback for number 1.2 in assignment
    else {
        console.log('type ran')
        let responseArr = [];
        response.forEach(movie => {
            // genre
            if (movie.genre.toLowerCase() === req.query.type.toLowerCase()) {
                responseArr.push(movie)
            }
            // country
            else if (movie.country.toLowerCase() === req.query.type.toLowerCase()) {
                responseArr.push(movie)
            }
            // avg_vote
            else {
                let numOfType = Number(req.query.type)
                if (numOfType <= movie.avg_vote) {
                    responseArr.push(movie)
            }            
        }})
        response = responseArr
    }
    res.json(response)
}
    
app.get('/movies', movieFilter)

// function(req, res) {
//     console.log(movieListSmall[0]);
//     res.send('Hi');
// })

const PORT = 8000

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})