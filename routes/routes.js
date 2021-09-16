const express = require ('express')
const Article= require('./../models/mon.js')

const router= express.Router()

router.get('/compose',(req,res)=>{
    res.render('compose', {post:new Article()})
    })

    router.get('/edit/:id', async (req, res) => {
        const article = await Article.findById(req.params.id)
        res.render('edit', { post: article })
      })
      

    router.get('/:slug', async (req, res) => {
        const article = await Article.findOne({ slug: req.params.slug })
        if (article == null) res.redirect('/')
        res.render('show', { post : article,  title: article.title,
            content: article.description })
      })

 router.post('/', async (req, res, next) => {
        req.article = new Article()
        next()
}, saveArticleAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
  }, saveArticleAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

function saveArticleAndRedirect(path) {
    return async (req, res) => {
      let article = req.article
      article.title = req.body.title
      article.description = req.body.description
      article.markdown = req.body.markdown
      try {
        article = await article.save()
        res.redirect(`/route/${article.slug}`)
      } catch (e) {
        res.render(`${path}`, { post: article })
      }
    }
  }
  

module.exports=router