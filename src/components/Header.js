import React from 'react'
import { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Showlist from './Showlist';

const loginAPI = "https://oneassure.ml/login"

export default function Header() {
    const [loginStatus, setLoginStatus] = useState("false"); //logged in or not
    const [formType, setFormType] = useState("login") // login or register
    const [user, setUser] = useState([])  //signed user's details
    const [token, setToken] = useState("") //jwt token
    const [totalUsers, setTotalUsers] = useState(0) //number of users
    const [totalUsersList, setTotalUsersList] = useState([])
    const [pageNo, setPageNo] = useState(1)
    const [totalPages, setTotalPages] = useState()
    const changeStatus = (e) => {
        setLoginStatus(e)
    }

    const UserDetails = (e) => {
        setUser(e);
    }

    const getToken = (e) => {
        setToken(e)
    }
    useEffect(async () => {

        if (token.length !== 0) {
            const res = await (await fetch("https://oneassure.ml/users?token=" + token + "&page=" + pageNo)).json()
            setTotalUsersList(res.data)
            setTotalUsers(res.total_users)
            setTotalPages(res.total_page)
        }

        if (loginStatus === "false") {
            setToken("")
            const list = []
            setTotalUsersList(list)
        }

    }, [loginStatus, user, formType, token, totalUsers, pageNo])
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <span className="navbar-brand me-2" >
                        <img
                            src="https://oneassure-static-files.s3.ap-south-1.amazonaws.com/OneAssure-mobile.png"
                            height="30"
                            alt=""
                            loading="lazy"
                            style={{ marginTop: "-1px" }}
                        />
                        OneAssure
                    </span>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarButtonsExample"
                        aria-controls="navbarButtonsExample"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fas fa-bars"></i>
                    </button>



                    <div className="collapse navbar-collapse" id="navbarButtonsExample">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                            </li>
                        </ul>
                        {loginStatus !== "true" ?
                            <div className="d-flex align-items-center">
                                <button type="button" onClick={() => { setFormType("login") }} className="btn btn-link px-3 me-2"> Login </button>

                                <button type="button" onClick={() => { setFormType("signup") }} className="btn btn-primary me-3">
                                    Sign up for free
                                </button>
                            </div>

                            :

                            <div className="d-flex align-items-center">
                                <button type="button" className="btn btn-link px-3 me-2"> Hi {user.name} </button>
                                <button type="button" onClick={() => { setLoginStatus("false") }} className="btn btn-primary me-3">
                                    Logout
                                </button>
                                <span className="bg-info btn text-white" title="users">{totalUsers}</span>
                            </div>
                        }
                    </div>

                </div>
            </nav>

            {loginStatus === "false" ?

                formType === "login" ? <LoginForm changeStatus={changeStatus} UserDetails={UserDetails} getToken={getToken} /> : <RegisterForm />

                :

                <>
                    <div className="p-4 d-flex justify-content-center">

                        <ul className="list-group" style={{ maxWidth: "800px", width: "700px" }}>
                            {
                                totalUsersList.map((one_user, id) => (
                                    <Showlist key={id} one_user={one_user} />
                                ))
                            }
                        </ul>
                    </div>

                    <nav className="d-flex justify-content-center fixed-bottom mb-3">
                        <ul className="pagination pagination-circle">

                            {pageNo !== 1 ?
                                <li className="page-item">
                                    <span className="btn" onClick={() => { setPageNo(pageNo - 1) }}>Previous</span>
                                </li>
                            :
                                ""
                            }

                            <li className="page-item active mx-3" aria-current="page">
                                <span className="page-link" >{pageNo} <span className="visually-hidden">(current)</span></span>
                            </li>

                            {pageNo !== totalPages ?

                                <li className="page-item">
                                    <span className="btn" onClick={() => { setPageNo(pageNo + 1) }} >Next</span>
                                </li>
                                :
                                ""
                            }

                        </ul>
                    </nav>
                </>
            }
        </>
    )
}
