async function forgotpassword(e){
    e.preventDefault();
    const form = new FormData(e.target);

    const userDetails = {
        email: form.get("email")
    }
    console.log(userDetails)
    axios.post('http://localhost:4050/user/sendmail',userDetails).then(response => {
        if(response.status === 202){
            document.body.innerHTML += '<div> Mail sent </div>'
        }else{
            throw new Error('Something went wrong')
        }
    }).catch(err => {
        document.body.innerHTML += `<div>${err}</div>`
    })
}