import { useState, useContext } from 'react';
import AppContext from 'src/Context';

const Form = () => {
  const { insertProduct } = useContext(AppContext);
  const [newUser, setNewUser] = useState({});

  // Storing the Insert User Form Data.
  const addNewUser = (e, field) => {
    setNewUser({
      ...newUser,
      [field]: e.target.value,
    });
  };

  // Inserting a new user into the Database.
  const submitProduct = (e) => {
    console.log(newUser);
    e.preventDefault();
    insertProduct(newUser);
    e.target.reset();
  };

  return (
    <form className="insertForm" style={{ minwidth: '960px', backgroundColor: 'white' }} onSubmit={submitProduct}>
      <table style={{ padding: '10px' }}>
        <tr>
          <td>
            <h2>新增產品</h2>
          </td>
        </tr>
        <tr>
          <td style={{ width: '160px' }}>
            Product ID
          </td>
          <td style={{ width: '160px' }}>
            Product Name
          </td>
          <td style={{ width: '160px' }}>
            Unitprice
          </td>
          <td style={{ width: '160px' }}>
            Cost
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="_id">
              <input
                type="text"
                id="_id"
                onChange={(e) => addNewUser(e, 'ProdID')}
                autoComplete="off"
                required
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
                id="_name"
                onChange={(e) => addNewUser(e, 'ProdName')}
                autoComplete="off"
                required
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
                id="_unitprice"
                onChange={(e) => addNewUser(e, 'UnitPrice')}
                autoComplete="off"
                required
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
                id="_cost"
                onChange={(e) => addNewUser(e, 'Cost')}
                autoComplete="off"
                required
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
