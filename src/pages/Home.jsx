import React,{useState} from 'react'
import { TabMenu } from 'primereact/tabmenu';
import Leaves from './Leaves';
import ApplyLeave from './ApplyLeave';
import { useHistory } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

function Home() {
    let userInfo=JSON.parse(localStorage.getItem('userInfo'));
    const items = userInfo.role==='ADMIN'? [
        {label: 'Dashboard', icon: 'pi pi-fw pi-home'},
        {label: 'Pending Leave Requests', icon: 'pi pi-fw pi-bell'},
        {label: 'Approved Leaves', icon: 'pi pi-fw pi-check-circle'},
        {label: 'Logout', icon: 'pi pi-fw pi-power-off'}  ]: 
        [ {label: 'My Leaves', icon: 'pi pi-fw pi-home'},
        {label: 'New Leave', icon: 'pi pi-fw pi-pencil'},
        {label: 'Logout', icon: 'pi pi-fw pi-power-off'}];
    const [state, setState] = useState({activeItem:items[0]});
    const [newLeave, setNewLeave] = useState({ description:'',date:null});
    let stordLeaves= JSON.parse(localStorage.getItem('leaves'));
    const [leaves, setLeaves] = useState(stordLeaves? [...stordLeaves]:[]);
    let history=useHistory();
    const [growl, setGrowl] = useState();

    const onChangeTab=(e)=>{      
        setState({...state,activeItem:e.value});
        if(e.value.label==='Logout'){
          localStorage.setItem('isLoggedin', JSON.stringify(false));
          localStorage.setItem('userInfo', JSON.stringify(''));
          let currentLogin=JSON.parse(localStorage.getItem('currentLogin'));
          localStorage.setItem('lastLogin', JSON.stringify(currentLogin));
          history.push('/');
        }
    }

    const applyLeve=(appliedLeave)=>{
      appliedLeave.status='pending';
      appliedLeave.userId= userInfo.userId;
      appliedLeave.date=   `${appliedLeave.date[0].toLocaleDateString('en-US',{
        year: 'numeric',
        month: 'short',
        day: 'numeric'
          })} - ${appliedLeave.date[1].toLocaleDateString('en-US',{
      year: 'numeric',
      month: 'short',
      day: 'numeric'         })}`
      appliedLeave.id= Math.random();
      appliedLeave.userName=userInfo.name;
      setLeaves([...leaves,appliedLeave]);  
      setNewLeave({description:'',date:null});
      growl.show({ life: 6000, severity: 'success', summary: 'Applied Leave successfully' });
      setState({...state,activeItem:items[0]}); 
      localStorage.setItem('leaves', JSON.stringify([...leaves,appliedLeave]));     
    }

    const approveLeave = (record) => {
      leaves.forEach(leave=> {
        if(leave.id===record.id) leave.status='approved';
      })
      setLeaves([...leaves]);
      localStorage.setItem('leaves', JSON.stringify([...leaves]));     
    }

    const approveButton=(e) => <Button label='Approve' onClick={()=> approveLeave(e)} />
    const dashBoard=()=> {
      let lastLogin=JSON.parse(localStorage.getItem('lastLogin'));
    return <div className='dashboard'>
      <Card >
      <div className='row'>
    <div className='col-md-6'>
      <b>Number of Pending Leaves :</b>
    </div>
  <b className='col-md-6'>    {leaves.filter(leave=> leave.status==='pending').length}   </b>
          </div>
          <div className='row p-t-10'>
    <div className='col-md-6'>
      <b>Number of Approved Leaves :</b>
    </div>
  <b className='col-md-6'>    {leaves.filter(leave=> leave.status==='approved').length}   </b>
          </div>
       {lastLogin&&   <div className='row p-t-10'>
    <div className='col-md-6'>
      <b>Last login time :</b>
    </div>
  <b className='col-md-6'>    {lastLogin}   </b>
          </div>}
        </Card>
    </div>
    }
    
  return (
    <div className=' home-div m-t-10'>
                  <Toast ref={(el) => setGrowl(el)} />
      <TabMenu model={items} activeItem={state.activeItem} onTabChange={ onChangeTab}/>
    {state.activeItem.label==='Dashboard'&& dashBoard()}
    {state.activeItem.label==='My Leaves'&&  <Leaves leaves={leaves.filter(leave=> leave.userId===userInfo.userId)} header='Leaves' />}
    {state.activeItem.label==='New Leave'&& <ApplyLeave leave={newLeave} applyLeve={applyLeve}/>}
    {state.activeItem.label==='Pending Leave Requests'&&  <Leaves leaves={leaves.filter(leave=> leave.status==='pending')} header='Pending Leave Requests'
    role={userInfo.role}  approveButton={approveButton} />}
    {state.activeItem.label==='Approved Leaves'&&  <Leaves leaves={leaves.filter(leave=> leave.status==='approved')} header='Approved Leaves' role={userInfo.role} />}
    </div>
  )
}

export default Home
