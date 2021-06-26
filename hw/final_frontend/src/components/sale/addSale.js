import { useState, useContext } from 'react';
import AppContext from 'src/Context';

const Form = () => {
  const { selectSales } = useContext(AppContext);
  const [newDate, setNewDate] = useState({});

  const addNewDate = (e, field) => {
    setNewDate({
      ...newDate,
      [field]: e.target.value,
    });
  };

  const submitDate = (e) => {
    console.log(newDate);
    e.preventDefault();
    selectSales(newDate);
    e.target.reset();
  };

  return (
    <form className="insertForm" style={{ width: '960px', backgroundColor: 'white', padding: '10px' }} onSubmit={submitDate}>
      <center>
        <h2>
          銷售報表
        </h2>
        <label htmlFor="_start">
          查詢期間：
          <input
            type="date"
            id="_start"
            onChange={(e) => addNewDate(e, 'start')}
            autoComplete="off"
            required
          />
        </label>
        <label htmlFor="_end">
          －
          <input
            type="date"
            id="_end"
            onChange={(e) => addNewDate(e, 'end')}
            autoComplete="off"
            required
          />
        </label>
        <label htmlFor="_end">
          &ensp;
          <input
            type="submit"
            value="search"
            style={{
              width: '80px',
              height: '23px',
              background: 'royalblue',
              color: 'white'
            }}
          />
        </label>
      </center>
    </form>
  );
};

export default Form;
