import React ,{useState} from 'react'
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Card } from 'primereact/card';


function ApplyLeave(props) {
    const [state, setState] = useState(props.leave);
    
    return(
        <div className='apply-leave'>
        <Card>
          <div className='row'>
    <div className='col-md-4 p-t-10'>
      <b>Note</b>
    </div>
    <div className='col-md-8'>
    <InputTextarea  value={state.description} 
    placeholder='Reason to apply leave'
    rows={3}
    maxLength={100}
    onChange={(e) => setState({...state, description:e.target.value})} />
    </div>
          </div>
          <div className='row'>
    <div className='col-md-4 p-t-10'>
      <b>Date</b>
    </div>
    <div className='col-md-8'>
    <Calendar value={state.date} 
    appendTo={document.body}
    selectionMode="range"
     readOnlyInput
     showButtonBar
    onChange={(e) => setState({...state,date:e.value})}></Calendar>
    </div>
          </div>
          <div className='row p-t-20 justify-content'>
          <Button label="Apply" className='w-20' disabled={state.description.trim()===''||(state.date?.length!==2||state.date.includes(null))} onClick={()=>props.applyLeve(state)} />
          </div>
        </Card>
        </div>
      )
}

export default ApplyLeave
