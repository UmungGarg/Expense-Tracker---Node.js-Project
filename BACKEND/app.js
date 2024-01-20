
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database'); 
// const errorController = require('./controllers/error');

const app = express();
var cors = require('cors');

const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const Expense = require('./models/expense');
const User = require('./models/user');

app.use(bodyParser.json());
// app.use(express.urlencoded());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize.sync()
.then(result => {
    app.listen(4050);
})
.catch(err => {
    console.log(err);
});
