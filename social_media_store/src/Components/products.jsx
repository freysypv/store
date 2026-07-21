//app is the parent of the product, catalog is the parent of product.
import "./product.css";
import QuantityPicker from "../QuantityPicker"

function Product(props) {
  return (
    <div className="Product card text-center  mb-4 bg- success text-white">
      <img src={"/public/" + props.data.image} alt="product "></img>
      <h5>{props.data.title}</h5>
      <div className="price">
        <label>Price</label>
        {
          <label>
            {[props.data.price.toFixed(2)]}
          </label> 
        }
       

        {/* comment */}
      </div>
    </div>
  );
};

export default Product;
