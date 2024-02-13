
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
        await axios.delete(`http://localhost:4050/expense/delList/${obj.id}/${obj.ExpAmt}`, {headers: {"Authorization": token}})
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

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

window.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem('token')
    const decodeToken = parseJwt(token)
    console.log(decodeToken)
    const isadmin = decodeToken.ispremiumuser
    if(isadmin){
        showPremiumMessage()
        showLeaderboard()
    }
    const response = await axios.get('http://localhost:4050/expense/getList', {headers: {"Authorization": token}})
    console.log(response.data)
    response.data.resp.forEach(element => {
        display(element)
    });
} )

function showPremiumMessage(){
            document.getElementById('rzp-button1').style.visibility = "hidden"
            document.getElementById('message').innerHTML = " You are a premium user"
}

function showLeaderboard(){
    const inputElement = document.createElement("input")
    inputElement.type = "button"
    inputElement.value = "Show Leaderboard"
    inputElement.onclick = async() => {
        const token = localStorage.getItem('token')
        const leaderboardArray = await axios.get('http://localhost:4050/premium/showLeaderBoard', {headers: {"Authorization": token}})
        console.log(leaderboardArray)
        var leaderboardElem = document.getElementById('leaderboard')
        leaderboardElem.innerHTML = '<h1> Leader Board </h1>'
        console.log(leaderboardArray.data)
        leaderboardArray.data.forEach((userDetails) => {
            leaderboardElem.innerHTML += `<li> Name - ${userDetails.name} Total Expense - ${userDetails.totalExpenses}`
        })
    }
    document.getElementById('message').appendChild(inputElement);
}

document.getElementById('rzp-button1').onclick = async function(e) {
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:4050/purchase/premiummembership', {headers: {"Authorization": token}}) 
    console.log(response);
    var options = {
        "key": response.data.key_id,
        "order_id": response.data.order.id,
        "handler": async function (response) {
            await axios.post('http://localhost:4050/purchase/updatetransactionstatus',{
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
            }, {headers: {"Authorization": token}}).then(res => {
                alert('You are a premium user now')
            showPremiumMessage()
            localStorage.setItem('token', res.data.token)})
            showLeaderboard()
        }
    };
    const rzpl = new Razorpay(options);
rzpl.open();
e.preventDefault();

rzpl.on('payment.failed', function(response){
    console.log(response)
    alert('Something went X')
});
}
