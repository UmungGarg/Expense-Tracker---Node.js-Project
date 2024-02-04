
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sequelize = require('./util/database'); 
// const errorController = require('./controllers/error');

const app = express();
var cors = require('cors');

const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');

const Expense = require('./models/expense');
const User = require('./models/user');
const Order = require('./models/orders');


app.use(bodyParser.json());
// app.use(express.urlencoded());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
dotenv.config();

app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);
app.use('/purchase', purchaseRoutes);


User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync()
.then(result => {
    app.listen(4050);
})
.catch(err => {
    console.log(err);
});
