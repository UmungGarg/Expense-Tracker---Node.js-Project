async function login(e){
    try{
        e.preventDefault();
        console.log(e.target.email.value);

        const loginDetails = {
            email:e.target.email.value,
            password:e.target.password.value
        }
        console.log(loginDetails)
        const response = await axios.post('http://localhost:4050/user/login',loginDetails)
        if(response.status === 201){
            alert("User logged in successfully");
        } else{
            throw new Error('Failed to login')
        }
    }catch(err){
        document.body.innerHTML += `<div style="color:red;">${err}<div>`;
    }
}