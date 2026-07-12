import "./QuantityPicker.css";
import { useState, useEffect } from "react";


function QuantityPicker({ price }) {
  //state varieble
  //function to set the value of the quantity and update it when the buttons are clicked
  const [quantity, setQuantity] = useState(1); //initial value of the quantity is set to 1

  function handleDecrease() {
    let nextval = quantity - 1; //decrease the quantity by -1

    //quantity=quantity-1;

    if (nextval > 0) {
      //check if the next value is greater than 0
      setQuantity(nextval);
    } //update the quantity state variable with the new value
  }
  //quantity=quantity+1;
  //setQuantity(quantity + 1);

  function handleIncrease() {
    let nextval = quantity + 1; //increase the quantity by 1
    setQuantity(nextval); //update the quantity state variable with the new value
  }

  const total = (quantity * price).toFixed(2);

  return (
    <div className="QuantityPicker">
      <div className="controls">
        <button
          className="btn-minus"
          onClick={handleDecrease}
          disabled={quantity === 1}
        >
          -
        </button>
        <label>{quantity}</label>
        <button className="btn-plus" onClick={handleIncrease}>
          +
        </button>
      </div>

      <div className="price-total">
        <span>Total: ${total}</span>
      </div>
    </div>
  );
}

export default QuantityPicker;
