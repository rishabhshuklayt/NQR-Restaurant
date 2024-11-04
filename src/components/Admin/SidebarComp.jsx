import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
// import { Button } from '../Button/Button';
import { Button } from 'primereact/button'; 
import { NavLink } from 'react-router-dom';

 function SidebarComp() {
    
    const [visibleRight, setVisibleRight] = useState(false);
   

    return (
        <div className="card">
            <div className="flex gap-2 justify-content-center">
               
                {/* <Button value="Sidebar" style="bg-yellow-500" onClick={() => setVisibleRight(true)} /> */}
                <Button label="hello" onClick={() => setVisibleRight(true)} />

               
            </div>

           

            <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
               <ul>
                <li >
                    <NavLink >
                        <h1>Home</h1>
                    </NavLink>
                
                
                    <NavLink to="/admin/add-items">
                    <h1>Add Items</h1>
                    </NavLink>
                </li>
                <li>
                    <NavLink>
                    <h1>Delete Items</h1>
                    </NavLink>
                </li>
                <li>
                    <NavLink></NavLink>
                </li>
                <li>
                    <NavLink></NavLink>
                </li>
               </ul>
            </Sidebar>

           
        </div>
    )
}
export default SidebarComp;  