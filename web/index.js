const express = require('express')
const app = express()

app.use("/js", express.static('web/js'));
app.use('/css',express.static('web/css'));
app.use('/html',express.static('web/html'));
app.use('/img',express.static('web/img'));

app.get('/', (request, response) => {
  response.sendfile(__dirname + '/index.html')
})

app.get('/index.html', (request, response) => {
  response.sendfile(__dirname + '/index.html')
})

app.get('/stats_teams.html', (request, response) => {
  response.sendfile(__dirname + '/stats_teams.html')
})

app.get('/stats_hacks.html', (request, response) => {
  response.sendfile(__dirname + '/stats_hacks.html')
})

app.get('/stats_hr.html', (request, response) => {
  response.sendfile(__dirname + '/stats_hr.html')
})

app.get('/vote.html', (request, response) => {
  response.sendfile(__dirname + '/vote.html')
})

app.listen(3000)