const express = require ('express')
const mongoose = require('mongoose')
const Article= require('./models/mon.js')
const articleRouter = require('./routes/routes')
const methodOverride = require('method-override')


const app = express()

mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true
})


app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))


app.get('/', async (req,res)=>{
const articles = await Article.find().sort({ time: 'desc' });

res.render('home', {posts:articles})
})


app.use('/route',articleRouter)
app.listen(3000)