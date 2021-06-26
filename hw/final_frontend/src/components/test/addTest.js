import { useState, useContext } from 'react';
import AppContext from 'src/Context';

const Form = () => {
  const { insertOrder } = useContext(AppContext);
  const [newUser, setNewUser] = useState({});

  // Storing the Insert User Form Data.
  const addNewOrder = (e, field) => {
    setNewUser({
      ...newUser,
      [field]: e.target.value,
    });
  };

  // Inserting a new user into the Database.
  const submitOrder = (e) => {
    console.log(newUser);
    e.preventDefault();
    insertOrder(newUser);
    e.target.reset();
  };

  const moreDetail = (e) => {
    console.log('+++');
    e.preventDefault();
  };

  return (
    <form className="insertForm" onSubmit={submitOrder}>
      <table>
        <tr>
          <td colSpan="2">
            <center><h3>Add Order</h3></center>
          </td>
        </tr>
        <tr>
          <td>
            Order ID
          </td>
          <td>
            <label htmlFor="_id">
              <input
                type="text"
                onChange={(e) => addNewOrder(e, 'OrderId')}
                required
              />
            </label>
          </td>
        </tr>
        <tr>
          <td>
            Customer ID
          </td>
          <td>
            <label htmlFor="_name">
              <input
                type="text"
                onChange={(e) => addNewOrder(e, 'CustId')}
                required
              />
            </label>
          </td>
        </tr>
        <tr>
          <td>
            Order Date
          </td>
          <td>
            <label htmlFor="_unitprice">
              <input
                type="text"
                onChange={(e) => addNewOrder(e, 'OrderDate')}
                required
              />
            </label>
          </td>
        </tr>
        <tr>
          <td>
            Descript
          </td>
          <td>
            <label htmlFor="_cost">
              <input
                type="text"
                onChange={(e) => addNewOrder(e, 'Descript')}
              />
            </label>
          </td>
        </tr>
        <tr>
          <td>
            Product ID
          </td>
          <td>
            <label htmlFor="_cost">
              <input
                type="text"
                onChange={(e) => addNewOrder(e, 'ProdId')}
                required
              />
            </label>
          </td>
          <td>
            Qty
          </td>
          <td>
            <label htmlFor="_cost">
              <input
                type="text"
                onChange={(e) => addNewOrder(e, 'Qty')}
                required
              />
            </label>
          </td>
          <td>
            Discount
          </td>
          <td>
            <label htmlFor="_cost">
              <input
                type="text"
                onChange={(e) => addNewOrder(e, 'Discount')}
              />
            </label>
          </td>
          <td>
            <input
              type="button"
              value="+"
              required
              style={{
                width: '20px',
                background: 'royalblue',
                color: 'white'
              }}
              onClick={(e) => moreDetail(e)}
            />
          </td>
        </tr>
        <tr>
          <td colSpan="2">
            <input
              type="submit"
              value="Add"
              style={{
                width: '100%',
                background: 'royalblue',
                color: 'white'
              }}
            />
          </td>
        </tr>
      </table>
    </form>
  );
};

export default Form;
