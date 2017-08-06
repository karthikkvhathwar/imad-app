var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one': {
        title:'This is Article One - Karthik',
        content:`
            <div>
                <a href="/">home</a>
            </div>
            <hr/>
            <h3>
                Article One
            </h3>
            <div>
                August 6th 2017
            </div>
            <div>
                <p>
                    I love to work on Web based Technologies
                </p>
                <p>
                    I am a geek
                </p>
                <p>
                    And a Passionate learner
                </p> 
            </div>
            <hr/>
            <h3>
                Other Articles
            </h3>
            <div>
                <a href="/article-two">article-two</a>
            </div>
            <div>
                <a href="/article-three">article-three</a>
            </div>`
    },
    'article-two': {
        title:'This is Article Two - Karthik',
        content:`
            <div>
                <a href="/">home</a>
            </div>
            <hr/>
            <h3>
                Article Two
            </h3>
            <div>
                August 6th 2017
            </div>
            <div>
                <p>
                    I am basically from Kundapura
                    
                </p>
                <p>
                    A place known for beautiful beaches and tasty dishes
                </p>
                <p>
                    And very unique art <a href="https://en.wikipedia.org/wiki/Yakshagana">Yakshagana</a>
                </p> 
            </div>
            <hr/>
            <h3>
                Other Articles
            </h3>
            <div>
                <a href="/article-one">article-one</a>
            </div>
            <div>
                <a href="/article-three">article-three</a>
            </div>`
    },
    'article-three': {
        title:'This is Article Three - Karthik',
        content:`
            <div>
                <a href="/">home</a>
            </div>
            <hr/>
            <h3>
                Article Three
            </h3>
            <div>
                August 7th 2017
            </div>
            <div>
                <p>
                    I am an Engineer
                    
                </p>
                <p>
                    I am working in CISCO
                </p>
                <p>
                   Have a nice day
                </p> 
            </div>
            <hr/>
            <h3>
                Other Articles
            </h3>
            <div>
                <a href="/article-one">article-one</a>
            </div>
            <div>
                <a href="/article-two">article-two</a>
            </div>
            `
    }
}

var counter = 0;
app.get('/counter', function (req, res) {
   counter = counter + 1;
   res.send(counter.toString());
});
function createHTMLTemplate(data) {
    var title = data.title;
    var date = data.date;
    var content = data.content;
    var htmlTemplate = `
    <html>
        <head>
            <title>${title}</title>
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class=container>
              ${content}
            </div>
        </body>
    </html>
    `;
    return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName', function (req, res) {
    var articleName = req.params.articleName;
   res.send(createHTMLTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
