import React, { useState } from 'react'

let styles = {
    maxWidth: "600px"
}

export default function LoginForm(props) {

    const [user, setUser] = useState({
        email:"",password:""
    });

    let name,value;
    const handleInputs =(e)=>{
        name=e.target.name
        value=e.target.value
        setUser({...user,[name]:value});
    }

    const PostData = async(e) =>{
        e.preventDefault();

        const {email,password} = user;
        const res = await fetch("https://oneassure.ml/login",{
            method:"POST",
            headers:{
                "content-type" : "application/json"
            },
            body: JSON.stringify({
                email,password
            })
        })

        const data =await res.json();

        if(data.status === "successful"){
            props.changeStatus("true")
            props.UserDetails(data.data.user);
            props.getToken(data.data.token)
        }
    }

    return (
        <>
            <div className="mt-5 p-4 h-100 w-100 d-inline-block text-center">
            <h1 className="p-4"> Login User </h1>
            <div className="d-inline-blockw-100">
                <form method="POST"  className="row gy-2 gx-3 d-inline-block w-100" style={styles} >
               
                    <div className="col-auto m-3">
                        <label className="visually-hidden" htmlFor="email">Email</label>
                        <div className="input-group">
                            <input type="Email" name="email" className="form-control" value={user.email} onChange={handleInputs}  id="email" placeholder="Email" />
                        </div>
                    </div>

                    <div className="col-auto m-3">
                        <label className="visually-hidden" htmlFor="password">Password</label>
                        <input type="password" name="password" className="form-control" value={user.password} onChange={handleInputs}  id="password" placeholder="password" />
                    </div>

                    <div className="col-auto end-0 m-3 text-center">
                        <button type="submit" className="btn btn-primary" onClick={PostData}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}
