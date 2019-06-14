const express = require('express')
const morgan = require('morgan')
const movieListSmall = require('./movies-data-small.json')

const app = express()

app.use(morgan('dev'))
// Users can search for Movies by genre, country or avg_vote
function movieFilter(req, res) {
    let response = movieListSmall;
    if (req.query.name) {
        response = response.filter(movie => 
            movie.film_title.toLowerCase().includes(req.query.name.toLowerCase())
            )
    }
    if (req.query.type) {
        response = response.filter(movie => 
            movie.film_title.toLowerCase().includes(req.query.name.toLowerCase())
            )
        // When theres no name, it means to filter by type: Change the if to an else
        // Take the query.type and check if it .include() genre, country, and avg_vote
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