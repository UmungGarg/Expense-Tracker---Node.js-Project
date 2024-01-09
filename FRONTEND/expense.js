function display(obj) {
    var list= document.querySelector(".list");
    var li = document.createElement("li");
    var del = document.createElement("button");
    del.appendChild(document.createTextNode("Delete"))
    li.textContent= obj.ExpAmt + '-' + obj.Desc + '-' + obj.Catg
    list.appendChild(li);
    li.appendChild(del);

    del.onclick = async () => {
        list.removeChild(li);
        const response = await axios.delete(`http://localhost:4050/expense/delList/${obj.id}`)
    }
}

async function expense(e){
    try{
        e.preventDefault();
        const expenseDetails = {
            amount:e.target.amount.value,
            description:e.target.description.value,
            category:e.target.category.value
        }

        console.log(expenseDetails)
        const response = await axios.post('http://localhost:4050/expense/addExpense',expenseDetails)
        console.log(response)
        display(response.data)
        
    }catch(err){
        document.body.innerHTML += `<div style="color:red;">${err}<div>`;
    }
}

window.addEventListener("DOMContentLoaded", async () => {
    const response = await axios.get('http://localhost:4050/expense/getList')
    console.log(response.data)
    response.data.forEach(element => {
        display(element)
    });
} )
