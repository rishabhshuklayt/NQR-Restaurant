import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button"; // Ensure you import the Button from 
import DMenu from "../../assets/images/DMenu.jpg"

function MenuModel() {
  const [visible, setVisible] = useState(false); // Manage visibility of the Dialog
  const [position, setPosition] = useState("top-right"); // Set default position

  const show = (pos) => {
    setPosition(pos);
    setVisible(true);
  };

  const footerContent = (
    <div className="flex justify-between ">
      <Button
        label="Hide"
        className="py-2 px-10  bg-green-500 text-white font-semibold rounded-lg"
        icon="pi pi-check"
        onClick={() => setVisible(false)}
      />
      <Button
        label="Hide"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-secondary px-6 py-2 bg-green-600 text-white font-semibold rounded-lg"
      />
    </div>
  );

  return (
    <div>
      <Button
        label="Menu"
        icon="pi pi-arrow-up"
        onClick={() => show("top-right")}
        className=" px-2 py-1 text-sm bg-green-500 first-letter:text-black font-medium rounded-md "
        
      />
      <Dialog
        header="MenuCard"
        visible={visible}
        position={position}
        // style={{ width: '50vw' }}
        onHide={() => setVisible(false)}
        footer={footerContent}
        draggable={false}
        resizable={false}
        // className='bg-zinc-100 rounded-md p-4 h-screen w-full'
        className="bg-yellow-50 p-4 rounded-md shadow-lg max-w-md mx-auto"
      >
        <div>
          <img
            // src="https://picsum.photos/400/800"
            src={DMenu}
            className=" bg-zinc-500 w-full h-screen rounded-md"
            alt=""
            srcset=""
          />
        </div>
       

       

       
        
      </Dialog>
    </div>
  );
}

export default MenuModel;
