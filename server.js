const express = require('express');
const app = express();
const { ROLE, users } = require('./data')
const { authUser, authRole } = require('./basicAuth')
const projectRouter = require('./routes/projects')

app.use(express.json())
app.use(setUser)
app.use('/projects', projectRouter)

//  Get Route
app.get('/', (req, res) => {
    res.send("User Authentication By Role");
})

app.get('/dashboard', authUser, (req, res) => {
    res.send('Dashboard Page')
})

app.get('/admin', authUser, authRole(ROLE.ADMIN),(req, res) => {
    res.send('Admin Page')
})

function setUser(req, res, next) {
    const userId = req.body.userId
    if (userId) {
        req.user = users.find(user => user.id === userId)
    }
    next()
}

// Listening the port
app.listen(5000, () => {
    console.log(`Server is running on http://localhost:5000`)
})
