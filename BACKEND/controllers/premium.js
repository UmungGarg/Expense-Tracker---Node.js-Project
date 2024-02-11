const User = require('../models/user');
const Expense = require('../models/expense');
const sequelize = require('../util/database');

exports.getLeaderBoard = async (req,res) => {
    try{
        const users = await User.findAll()
        const expenses = await Expense.findAll();
        const AggregatedExp = {}
        expenses.forEach(expense => {
            if(AggregatedExp[expense.userId]){
                AggregatedExp[expense.userId] = AggregatedExp[expense.userId] + expense.ExpAmt
            }else{
                AggregatedExp[expense.userId] = expense.ExpAmt
            }
            console.log(AggregatedExp)
        });
        var leaderboardDetails = [];
        users.forEach(user => {
            leaderboardDetails.push({ name:user.name, total_cost:AggregatedExp[user.id] || 0})
        })
        console.log(leaderboardDetails);
        leaderboardDetails.sort((a,b) => b.total_cost - a.total_cost)
        res.status(200).json(leaderboardDetails)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}