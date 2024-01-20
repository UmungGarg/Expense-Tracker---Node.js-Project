const Expense = require('../models/expense');

exports.addExpense = async (req,res) => {
    try{
        const { amount, description, category} = req.body;
        const userId = req.user.id;
        console.log(userId);
        if(amount == undefined || amount.length === 0){
            return res.status(400).json({success: false, message: 'Parameters missing'})
        }
        // req.user.createExpense({ExpAmt:amount,Desc:description,Catg:category})                 or(magic fn)
        let resp = await Expense.create({ExpAmt:amount,Desc:description,Catg:category, userId})
        res.status(201).json({resp, success:true});
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}

exports.getList = async (req,res) => {
    try{
        let resp = await Expense.findAll();
    console.log(resp);
    res.status(200).json({resp, success:true});
} catch(err){
    res.status(500).json(err)
}
    }
    

exports.delList = async (req,res) => {
    const expenseId = req.params.expId;
    if(expenseId == undefined || expenseId.length === 0){
        return res.status(400).json({success: false, message: 'Parameters missing'})
    }
    Expense.destroy({where: {id:expenseId, userId:req.user.id}}).then((value) => {
        if(value === 0){
            return res.status(404).json({success: false, message: 'Expense doesnt belong'})
        }
        return res.status(200).json({success: true, message: 'Deleted successfuly'})
    }).catch(err => {
        return res.status(500).json({success:true, message:"Failed"})
    })
}