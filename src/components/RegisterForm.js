import React, { useState } from 'react'

let styles = {
    maxWidth: "600px"
}

export default function RegisterFom() {

    const [user, setUser] = useState({
        phone:"",
        email:"",
        password:"",
        name:""
    });

    let name,value;

    const handleInputs =(e)=>{
        name=e.target.name
        value=e.target.value
        setUser({...user,[name]:value});
    }

    const PostData = async(e) =>{
        e.preventDefault();

        const {email,password,name,phone} = user;

        const res = await fetch("https://oneassure.ml/register",{
            method:"POST",
            headers:{
                "content-type" : "application/json"
            },
            body: JSON.stringify({
                name,email,password,phone
            })
        })


        
        const data =await res.json();

        if( data.status === "successful"){
            alert("user registered succesfully!")
        }else{
            alert("user already exists!")
        }
    }
    return (
        <>
            <div className="mt-5 p-4 h-100 w-100 d-inline-block text-center">
                <h1 className="p-4"> Register User </h1>
                <div className="d-inline-blockw-100">
                    <form method="POST" className="row gy-2 gx-3 d-inline-block w-100" style={styles} >
                        <div className="col-auto m-3">
                            <label className="visually-hidden" htmlFor="name">Name</label>
                            <input type="text" className="form-control" onChange={handleInputs} id="name" value={user.name} name="name" placeholder="Name" />
                        </div>
                        <div className="col-auto m-3">
                            <label className="visually-hidden" htmlFor="email">Email</label>
                            <div className="input-group">
                                <input type="Email" className="form-control" onChange={handleInputs} value={user.email} id="email" name="email" placeholder="Email" />
                            </div>
                        </div>

                        <div className="col-auto m-3">
                            <label className="visually-hidden" htmlFor="phone">Phone</label>
                            <input type="text" className="form-control" onChange={handleInputs} value={user.phone} id="phone" name="phone" placeholder="Number" />
                        </div>

                        <div className="col-auto m-3">
                            <label className="visually-hidden" htmlFor="password">Password</label>
                            <input type="password" className="form-control" onChange={handleInputs}  value={user.password} id="password" name="password" placeholder="password" />
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
