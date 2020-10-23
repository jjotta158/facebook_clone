import React from 'react';
import './style.css'
import {useFormik} from 'formik';
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:3333';
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default function LoginPage() {
    const history = useHistory()
    const form = useFormik({
        initialValues: {
            email:'',
            password:''
        },
        onSubmit: async values => {
            console.log(values)
            await axios.post('/signin',{
            data:{
                email:values.email,
                password:values.password
            }
            }).then(response => {
                console.log(response)
                localStorage.setItem('_user_data_', response.data);
            }).catch(response => {
                console.log(response)
                alert('algo de errado não está certo');
            })
        }
    })
    return (
        <div id="loginPage">
            <section className="leftBox">
                <h1>facebook</h1>
                <h3>O Facebook ajuda você a se conectar e compartilhar com as pessoas que fazem parte da sua vida.</h3>
            </section>
            <section>
                <div className="formBox">
                    <form onSubmit={form.handleSubmit}>
                        <input type="text" id="email" name="email" value={form.values.email} placeholder="E-mail" onChange={form.handleChange}/>
                        <input type="password" id="pass3word" name="password" value={form.values.password} placeholder="Senha" onChange={form.handleChange} />
                        <button type="submit">Log In</button>
                    </form>
                    <Link to="/forgot-password">Forgot Password ?</Link>
                    <button type="button" onClick={() => history.push('./signup')}>Create New Account</button>
                </div>
            </section>
        </div>
    )
}