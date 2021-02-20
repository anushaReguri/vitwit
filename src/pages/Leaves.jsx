import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function Leaves(props) {

    return (
        <div className='leaves-div'>
            <DataTable value={props.leaves} emptyMessage={`No ${props.header} found`}
                    header={props.header} className='m-t-10'>
                        <Column field="description" header="Description"></Column>
                        <Column field="date" header="Date"></Column>
                        <Column field="status" header="Status"></Column>
                        {props.role==='ADMIN'&&<Column field='userName' header='User Name' ></Column> }
                        {props.role==='ADMIN'&& props.header==='Pending Leave Requests'&&<Column body={(e)=>props.approveButton(e)}></Column> }
            </DataTable>
        </div>
      )
}

export default Leaves
