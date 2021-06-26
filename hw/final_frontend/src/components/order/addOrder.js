import { useState, useContext } from 'react';
import AppContext from 'src/Context';
import OContext from 'src/OContext';

const Form = () => {
  const { insertOrder } = useContext(OContext);
  const { userInf } = useContext(AppContext);
  const [newUser, setNewUser] = useState({});

  // Storing the Insert User Form Data.
  const addNewOrder = (e, field, pid, f) => {
    setNewUser({
      ...newUser,
      [field]: e.target.value,
      [f]: pid,
    });
  };

  // Inserting a new user into the Database.
  const submitOrder = (e) => {
    e.preventDefault();
    insertOrder(newUser);
    e.target.reset();
  };

  return (
    <form className="insertForm" style={{ minwidth: '960px', backgroundColor: 'white', margin: '25px' }} onSubmit={submitOrder}>
      <table style={{ padding: '10px' }}>
        <tr>
          <td>
            <h2>新增訂單</h2>
          </td>
        </tr>
        <tr>
          <td style={{ width: '160px' }}>
            Order ID
          </td>
          <td style={{ width: '160px' }}>
            Customer ID
          </td>
          <td style={{ width: '160px' }}>
            Order Date
          </td>
          <td style={{ width: '160px' }}>
            Descript
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="_id">
              <input
                type="text"
                onChange={(e) => addNewOrder(e, 'OrderId', userInf.EmpId, 'EmpId')}
                style={{
                  width: '150px',
                  height: '30px',
                  border: 'solid 1.5px gray',
                  borderRadius: '5px'
                }}
              />
            </label>
          </td>
          <td>
            <label htmlFor="_name">
              <input
                type="text"
                onChange={(e) => addNewOrder(e, 'CustId', userInf.EmpId, 'EmpId')}
                style={{
                  width: '150px',
                  height: '30px',
                  border: 'solid 1.5px gray',
                  borderRadius: '5px'
                }}
              />
            </label>
          </td>
          <td>
            <label htmlFor="_unitprice">
              <input
                type="text"
                onChange={(e) => addNewOrder(e, 'OrderDate', userInf.EmpId, 'EmpId')}
                style={{
                  width: '150px',
                  height: '30px',
                  border: 'solid 1.5px gray',
                  borderRadius: '5px'
                }}
              />
            </label>
          </td>
          <td>
            <label htmlFor="_cost">
              <input
                type="text"
                onChange={(e) => addNewOrder(e, 'Descript', userInf.EmpId, 'EmpId')}
                style={{
                  width: '150px',
                  height: '30px',
                  border: 'solid 1.5px gray',
                  borderRadius: '5px'
                }}
              />
            </label>
          </td>
        </tr>
        <tr>
          <td>
            Product ID
          </td>
          <td>
            Qty
          </td>
          <td>
            Discount
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="_cost">
              <input
                type="text"
                onChange={(e) => addNewOrder(e, 'ProdId', userInf.EmpId, 'EmpId')}
                style={{
                  width: '150px',
                  height: '30px',
                  border: 'solid 1.5px gray',
                  borderRadius: '5px'
                }}
              />
            </label>
          </td>
          <td>
            <label htmlFor="_cost">
              <input
                type="text"
                onChange={(e) => addNewOrder(e, 'qty', userInf.EmpId, 'EmpId')}
                style={{
                  width: '150px',
                  height: '30px',
                  border: 'solid 1.5px gray',
                  borderRadius: '5px'
                }}
              />
            </label>
          </td>
          <td>
            <label htmlFor="_cost">
              <input
                type="text"
                onChange={(e) => addNewOrder(e, 'Discount', userInf.EmpId, 'EmpId')}
                style={{
                  width: '150px',
                  height: '30px',
                  border: 'solid 1.5px gray',
                  borderRadius: '5px'
                }}
              />
            </label>
          </td>
          <td />
          <td>
            <input
              type="submit"
              value="Add"
              style={{
                width: '50px',
                height: '30px',
                background: 'royalblue',
                color: 'white',
              }}
            />
          </td>
        </tr>
      </table>
    </form>
  );
};

export default Form;
