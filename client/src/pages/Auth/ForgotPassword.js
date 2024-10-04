import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom"
import axios from "axios";
import "../../index.css";
const ForgotPassword = () => {
    const [newpassword, setNewPassword] = useState("");
    const [email, setEmail] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/forgot-password",
                 { email, newpassword,answer});
            if (res && res.data.success) {
                toast.success(" Successfully Changed Password");
                navigate("/login");
            }
        } catch (e) {
            console.log(e);
            toast.error("something went wrong")
        }
    };
  return (
    <Layout title={"forgot-password"}>

              <div className='register'>
                  <div className='glass'>
                      <h1><center>
                         ForgotPassword
                      </center>

                      </h1>
                      <form onSubmit={handleSubmit}>
                          
                          <div className="mb-3">
                              <input
                                  type="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  className="form-control"
                                  id="exampleInputemail"
                                  placeholder='Email'
                                  required
                              />
                          </div>
                      <div className="mb-3">
                          <input
                              type="text"
                              value={answer}
                              onChange={(e) => setAnswer(e.target.value)}
                              className="form-control"
                              id="exampleInputans"
                              placeholder=' What is your best Best Friend Name?'
                              required
                          />
                      </div>
                          <div className="mb-3">
                              <input
                                  type="password"
                                  value={newpassword}
                                  onChange={(e) => setNewPassword(e.target.value)}
                                  className="form-control"
                                  id="exampleInputpass"
                                  placeholder='New Password'
                                  required
                              />
                          </div>
                          
                         
                          <div className="mb-3">
                              <button type="submit" className="btn btn-primary">Submit</button>
                          </div>

                      </form>
                  </div>

              </div>

    </Layout>
  )
}

export default ForgotPassword
