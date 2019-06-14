const express = require('express')
const morgan = require('morgan')
const movieListSmall = require('./movies-data-small.json')

const app = express()

app.use(morgan('dev'))
// Users can search for Movies by genre, country or avg_vote
function movieFilter(req, res) {
    let response = movieListSmall;
    if (req.query.name) {
        console.log('name ran')
        response = response.filter(movie => 
            movie.film_title.toLowerCase().includes(req.query.name.toLowerCase())
            )
    }
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
            //  (req.query.type ===  ) {s
            //     responseArr.push(movie)
            // }
            // avg_vote
        // })
        // When theres no name, it means to filter by type: Change the if to an else
        // Take the query.type and check if it .include() genre, country, and avg_vote
        })
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