import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';
const Signup = (props) => {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
    const handleSubmit = async (e)=>{
         e.preventDefault();
         
         const {name,email,password,cpassword} = credentials
         if(password!==cpassword){
            alert("passwords donot match")

        }
         const response = await fetch("http://localhost:5500/api/auth/createuser",{
            method: 'POST',
            headers: {
                'content-type' :'application/json',
                
            },
            body: JSON.stringify({name,email,password})
    
        }); 
        const json = await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem("token",json.authToken)
            props.showAlert("account created successfully","success")
            navigate("/");

        }
        else {
            props.showAlert("invalid credentials","danger")
        }

    }
    const onChange = (e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
   }
    return (
        <div>
            <h2 className="mb-2">Sign up</h2>
            <form onSubmit={handleSubmit}>

            <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">name</label>
          <input type="text" className="form-control" id="name" name="name" onChange = {onChange} aria-describedby="emailHelp" required/>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange = {onChange} aria-describedby="emailHelp" required/>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name ="password" onChange = {onChange} required minLength={5} />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange = {onChange} required minLength={5}/>
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
        </div>
    )
}

export default Signup
