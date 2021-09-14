//Stock market portfolio app by Andreas Sjöstedt madmud.studio

//ctr+shift +arrow
//ctrl+alt+arrow+type
//ctrl+k+b
//ctrl+m

const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

// use body parser middleware
//it calls the bodyparser, and unencodes what gets sent in the form,
app.use(bodyParser.urlencoded({extended: false}));

//API key pk_6ded30f6c7564793b858a3460f3aee5a
// create call_api function
function call_api(finishedAPI, ticker) {
    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_6ded30f6c7564793b858a3460f3aee5a', { json: true }, (err, res, body) => {
        if (err) {return console.log(err);}
        if (res.statusCode === 200){       
            finishedAPI(body);    //will fire whenever it's finnished          
        };
    });
};

// Set Handlebars Middleware
app.engine('handlebars', exphbs());  //use the engine handlebars, which is an extension of exphbs
app.set('view engine', 'handlebars'); //set view engine to handlebars

// Set handlebar index GET routes (GET route for handlebar index) Set routing for our dynamic content (handlebar routes)
app.get('/', function (req, res) {	// / means home
    call_api(function(doneAPI) {
        res.render('home', {
        stock: doneAPI
        });
    }, "fb");
});

// Set handlebar index POST route
app.post('/', function (req, res) {  // / means home
    call_api(function(doneAPI) {
            //posted_stuff = req.body.stock_ticker;
            res.render('home', {
            stock: doneAPI,
        });
    }, req.body.stock_ticker);  //call_api(function(){}, req.body.stock_ticker)
});

// create about page route
app.get('/about.html', function (req, res) {
    res.render('about', {
    })
});

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server listening on port ' + PORT));