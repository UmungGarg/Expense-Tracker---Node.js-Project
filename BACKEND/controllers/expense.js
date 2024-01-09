const Expense = require('../models/expense');

exports.addExpense = async (req,res) => {
    try{
        const { amount, description, category} = req.body;
        let resp = await Expense.create({ExpAmt:amount,Desc:description,Catg:category})
        res.json(resp);
    }catch(err){
        res.status(500).json(err)
    }
}

exports.getList = async (req,res) => {
    let resp = await Expense.findAll();
    res.json(resp);
}

exports.delList = async (req,res) => {
    const expenseId = req.params.expId;
    let resp = await Expense.findByPk(expenseId);
    resp.destroy();
}