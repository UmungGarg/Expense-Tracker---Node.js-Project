const User = require('../models/user');
const Expense = require('../models/expense');
const sequelize = require('../util/database');

exports.getLeaderBoard = async (req,res) => {
    try{
        const leaderboardDetails = await User.findAll({
            attributes:['id','name',[sequelize.fn('sum', sequelize.col('expenses.ExpAmt')),'total_cost']],
            include: [
                {
                    model:Expense,
                    attributes:[]
                }
            ],
            group:['user.id'],
            order:[['total_cost', 'DESC']]
        })
        res.status(200).json(leaderboardDetails)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}