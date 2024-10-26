import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button"; // Ensure you import the Button from PrimeReact

function Model({title, image, about , ingrediant , type }) {
  const [visible, setVisible] = useState(false); // Manage visibility of the Dialog
  const [position, setPosition] = useState("bottom"); // Set default position

  const show = (pos) => {
    setPosition(pos);
    setVisible(true);
  };

  const footerContent = (
    <div className="flex justify-between ">
      <Button
        label="Hide"
        className="py-2 px-10 bg-yellow-500 text-white font-semibold rounded-lg"
        icon="pi pi-check"
        onClick={() => setVisible(false)}
      />
      <Button
        label="Add To Plate"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-secondary px-6 py-2 bg-green-600 text-white font-semibold rounded-lg"
      />
    </div>
  );

  return (
    <div>
      <Button
        label="know more!"
        icon="pi pi-arrow-up"
        onClick={() => show("bottom")}
        className=" px-2 py-1 text-sm bg-green-500 first-letter:text-black font-medium rounded-md "
        
      />
      <Dialog
        header="Details"
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
            src={image}
            className=" bg-zinc-500 w-full h-36 rounded-md object-cover"
            alt=""
            srcset=""
          />
        </div>
        <div>
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold text-black">{title}</h2>

            <h2 className="text-2xl font-bold text-black">$192.9</h2>
          </div>
          <hr />
          <p className="m-0 text-xl font-semibold inline-flex items-center gap-2">
            Type: {type}
            <span>
            <img 
              src={type === "Vegetarian" ? "https://i.pinimg.com/736x/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.jpg" : "https://spaces-cdn.clipsafari.com/j1ijpx8yuw3ev0rmtwipup22p0a4"}
              alt="Meal icon"
              className="w-4 h-4 "
            />
            </span>
          </p>
          <hr />
        </div>
        <h1 className="   text-xl font-bold text-green-800 mb-3">
          {" "}
          Know More About Our {title}
        </h1>
        <hr />

        <p className="text-smtext-gray-700 mb-4">
          {/* Samosa, a popular snack from the Indian subcontinent, is a crispy,
          golden-brown pastry filled with a savory mix of potatoes, peas, and
          flavorful spices. Perfect as an appetizer or quick snack, our samosas
          are freshly made to ensure each bite is packed with authentic taste. */}
          {about}
        </p>

        <h1 className="text-3xl text-black">Ingredients:</h1>

        <ul class="list-disc pl-5 text-sm text-orange-700">
          <li>Flour (Maida)</li>
          <li>Potatoes</li>
          <li>Green Peas</li>
          <li>Spices (Cumin, Coriander, Garam Masala)</li>
          <li>Green Chilies & Ginger</li>
          <li>Fresh Coriander</li>
          <li>Fried in Oil or Ghee</li>
        </ul>
        
      </Dialog>
    </div>
  );
}

export default Model;
