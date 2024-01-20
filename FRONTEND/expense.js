function display(obj) {
    var list= document.querySelector(".list");
    var li = document.createElement("li");
    var del = document.createElement("button");
    del.appendChild(document.createTextNode("Delete"))
    li.textContent= obj.ExpAmt + '-' + obj.Desc + '-' + obj.Catg
    list.appendChild(li);
    li.appendChild(del);
    // const expElmId = `expense-${obj.id}`; 
    // li.innerHTML += <li id=${expElmId}>
    //     ${obj.ExpAmt} - ${obj.Desc} - ${obj.Catg}
    //     <button onclick='deleteExpense(obj.id)'>
    //         Delete Expense
    //     </button>
    // </li>
    // function deleteExpense(id){
    //        const expElmId = `expense-${obj.id}`; 
    //        document.getElementById(expElmId).remove();
    // }

    del.onclick = async () => {
        const token = localStorage.getItem('token')
        await axios.delete(`http://localhost:4050/expense/delList/${obj.id}`, {headers: {"Authorization": token}})
        list.removeChild(li);
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
        const token = localStorage.getItem('token')
        const response = await axios.post('http://localhost:4050/expense/addExpense',expenseDetails, {headers: {"Authorization": token}})
        console.log(response)
        display(response.data.resp)
        
    }catch(err){
        document.body.innerHTML += `<div style="color:red;">${err}<div>`;
    }
}

window.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:4050/expense/getList', {headers: {"Authorization": token}})
    console.log(response.data)
    response.data.resp.forEach(element => {
        display(element)
    });
} )
