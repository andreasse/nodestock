//Stock market portfolio app by Andreas Sjöstedt madmud.studio

//ctr+shift +arrow
//ctrl+alt+arrow+type
//ctrl+k+b
//ctrl+m

const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');

const PORT = process.env.PORT || 5000;

// Set Handlebars Middleware
app.engine('handlebars', exphbs());  //use the engine handlebars, which is an extension of exphbs
app.set('view engine', 'handlebars'); //set view engine to handlebars

const otherstuff= "this is other stuff!";

// Set routing for our dynamic content (handlebar routes)
app.get('/', function (req, res) {	// / means home
    res.render('home', {
//        stuff: "This is some good stuff..."
        stuff: otherstuff
    });	//we will call home home
});

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server listening on port ' + PORT));