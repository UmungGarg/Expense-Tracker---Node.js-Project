const Expense = require('../models/expense');
const User = require('../models/user');
const sequelize = require('../util/database');


exports.addExpense = async (req,res) => {
    const t = await sequelize.transaction();
    try{
        const { amount, description, category} = req.body;
        const userId = req.user.id;
        console.log(userId);
        if(amount == undefined || amount.length === 0){
            return res.status(400).json({success: false, message: 'Parameters missing'})
        }
        // req.user.createExpense({ExpAmt:amount,Desc:description,Catg:category})                 or(magic fn)
        let resp = await Expense.create({ExpAmt:amount,Desc:description,Catg:category, userId},{transaction:t})
        const totalexp = Number(req.user.totalExpenses) + Number(amount)
        console.log(totalexp);
        await User.update({totalExpenses:totalexp},{where:{id:req.user.id}, transaction:t})
            await t.commit();
            res.status(200).json({resp, success:true});
    }catch(err){
        await t.rollback()
        console.log(err);
        res.status(500).json(err)
    }
}

exports.getList = async (req,res) => {
    try{
        let resp = await Expense.findAll();
    // console.log(resp);
    res.status(200).json({resp, success:true});
} catch(err){
    res.status(500).json(err)
}
    }
    

exports.delList = async (req,res) => {
    const t = await sequelize.transaction();
    try{
    const expenseId = req.params.expId;
    const amount = req.params.expAmt;
    if(expenseId == undefined || expenseId.length === 0){
        return res.status(400).json({success: false, message: 'Parameters missing'})
    }
    const value = await Expense.destroy({where: {id:expenseId, userId:req.user.id}}, {transaction:t})
        if(value === 0){
            return res.status(404).json({success: false, message: 'Expense doesnt belong'})
        }
        const totalexp = Number(req.user.totalExpenses) - Number(amount)
        await User.update({totalExpenses:totalexp},{where:{id:req.user.id}, transaction:t})
            await t.commit();
            res.status(200).json({ success:true});
    }catch(err){
        await t.rollback()
        return res.status(500).json({success:true, message:"Failed"})
    }
}