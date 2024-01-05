async function login(e){
    try{
        e.preventDefault();
        console.log(e.target.email.value);

        const loginDetails = {
            email:e.target.email.value,
            password:e.target.password.value
        }
        console.log(loginDetails)
        const response = await axios.post('http://localhost:4050/user/login', loginDetails)
        // response.data.forEach(element => {
        //     if(element.email == loginDetails.email){
        //         if(element.password == loginDetails.password){
        //             alert("User logged in");
        //         }
        //         else{
        //             alert("Wrong password")
        //         }
        //     }
        //     else{
        //         alert("User not found")
        //     }
        // });
    }catch(err){
        document.body.innerHTML += `<div style="color:red;">${err}<div>`;
    }
}