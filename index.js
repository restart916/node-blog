const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

const connect = require('./schemas')
connect();

const writtensRouter = require("./routers/written");
app.use("/api",writtensRouter);

const Writtens = require("./schemas/written");

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('homepage')
})

app.get('/create', (req, res) => {
    res.render('create')
})

app.get('/detail', (req, res) => {
    res.render('detail')
})

app.get('/update/:id', async(req, res) => {
  try{
    written = await Writtens.findOne({"writtensId" : req.params.id})
    res.render('update', {written : written});
  } catch(err) {
    console.error(err);
    next(err);
}
})
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})