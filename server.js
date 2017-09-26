const express = require('express')
const next = require('next')
const { join } = require('path')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const redirects = [
  '/slack_invite',
  '/cloud9_setup',
  '/redeem_tech_domain',
  '/hackbot/teams/new',
  '/intake'
]

app.prepare().then(() => {
  const server = express()

  redirects.map(path => {
    server['get'](path, (req, res) => {
      res.redirect('https://hackclub.com' + path)
    })
  })

  server.get('*', (req, res) => handle(req, res))

  server.listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})