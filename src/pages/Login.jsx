import React,{useState} from 'react'
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useHistory } from 'react-router-dom';
import {userData} from './UsersData';

function Login() {
const [state, setState] = useState({userName:'',password:'',inValidCred:false})
let history=useHistory();

const login =(e)=>{
     e.preventDefault()  
    let loginUser=   userData.find(user=> user.userName.toLowerCase()===state.userName.toLowerCase()&&user.password===state.password);
    if(!loginUser) {
     setState({...state,inValidCred:true});
     return;
    }
     setState({...state,inValidCred:false});
     localStorage.setItem('isLoggedin', JSON.stringify(true));
     localStorage.setItem('userInfo', JSON.stringify(loginUser));
     if(loginUser.role==='ADMIN') {
      let currentdate=new Date();
      localStorage.setItem('currentLogin', JSON.stringify( currentdate.toLocaleDateString('en-US',{
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
         minute: '2-digit'
  })));
                              }
     history.push('/home');
}

  return (
    <div className='login'>
      <Card title='Login' className='login-card'>
        <form onSubmit={login}>
      <div className='col-md-8 margin-auto p-b-20'> 
      <span className="p-float-label">
    <InputText id="in" value={state.userName} 
    type='text'
    required
     onChange={(e)=>setState({...state,userName:e.target.value})} />
    <label htmlhtmlFor="in">User Name</label>
</span>
</div>
<div className='col-md-8 margin-auto p-b-10 p-t-10'> 
<span className="p-float-label">
    <InputText id="ps"
     value={state.password} 
     required
    type='password'
     onChange={(e)=> setState({...state,password:e.target.value})} />
    <label htmlhtmlFor="in">Password</label>
</span>
{state.inValidCred&& <small className='color-red'>Invalid User name/Password entered</small>}

</div>
     <Button label="Login" disabled={state.userName.trim()===''||state.password.trim()===''}
      ></Button>
      </form>
</Card>
    </div>
  )
  
}

export default Login
