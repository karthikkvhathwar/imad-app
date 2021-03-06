var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require('crypto');
var app = express();
var Pool = require('pg').Pool;
var config = {
    user:'karthikhathwar28',
    database:'karthikhathwar28',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};
app.use(morgan('combined'));

var names = [];
app.get('/test-db', function (req, res) {
  pool.query('SELECT * FROM test',function(err,result) {
      if(err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
  });
});

var pool = new Pool(config);
app.get('/submit-name', function (req, res) {
   var name = req.query.name;
   
   names.push(name);
   
   res.send(JSON.stringify(names));
});

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

app.get('/articles/:articleName', function (req, res) {
    var articleName = req.params.articleName;
    pool.query("SELECT * FROM article WHERE title = $1",[articleName],function(err,result) {
        if(err) {
          res.status(500).send(err.toString());
        } else {
          if(result.rows.length === 0) {
              res.status(404).send('Article not found!');
          }else {
             var articleData = result.rows[0];
             res.send(createHTMLTemplate(articleData));
          }
        }
    });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

function hash(input,salt) {
    var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return hashed.toString('hex');
}

app.get("/hash/:input",function(req,res){
    var hashedString = hash(req.params.input,'this-is-some-random-String');
    res.send(hashedString);
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
