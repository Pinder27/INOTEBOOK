import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';
const Login = (props) => {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({email:"",password:""})
    const handleSubmit = async (e)=>{
         e.preventDefault();
         const response = await fetch("http://localhost:5500/api/auth/login",{
            method: 'POST',
            headers: {
                'content-type' :'application/json',
                
            },
            body: JSON.stringify({email: credentials.email, password:credentials.password})
    
        }); 
        const json = await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem("token",json.authToken)
            //console.log("logintoken "+ localStorage.getItem("token"))
           props.showAlert("you are logged in","success")
            navigate("/");

        }
        else {
            props.showAlert("invalid credentails","danger")
        }

    }
    const onChange = (e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
   }
    return (
        <div>
            <h2 className="mb-2">Login</h2>
             <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email"  className="form-control" value = {credentials.email} onChange = {onChange} id="email" name="email" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" value = {credentials.password} onChange = {onChange} className="form-control" id="password" name="password" />
        </div>
       
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
        </div>
    )
}

export default Login

