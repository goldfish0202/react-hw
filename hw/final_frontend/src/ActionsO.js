import { useEffect, useState } from 'react';

const ActionsP = () => {
  const [orders, setOrders] = useState([]);
  const [sorder, setSOrder] = useState([]);
  const [orderdetail, setOrderdetail] = useState([]);
  const [orderLength, setOrderLength] = useState(null);
  const [orderdetailLength, setOrderdetailLength] = useState(null);
  const [press, setPress] = useState(false);

  useEffect(() => {
    fetch('http://localhost/php-react/DoSelectOrder.php')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrders(data.order);
          setOrderLength(true);
        } else {
          setOrderLength(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const orderSelect = (OrderId) => {
    fetch('http://localhost/php-react/DoSelectOrderdetail.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(OrderId),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrderdetail(data.orderdetail);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const pressSet = (set) => {
    setPress(set);
  };

  const searchOrder = (OrderId) => {
    fetch('http://localhost/php-react/DoSelectOrderdetail.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(OrderId),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSOrder(data.order);
          setOrderdetail(data.orderdetail);
          setPress(true);
          setOrderdetailLength(true);
        } else {
          setOrderdetailLength(0);
          setPress(false);
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editMode = (OrderId) => {
    const order1 = orders.map((order) => {
      if (order.OrderId === OrderId) {
        const a = order;
        a.isEditing = true;
        return a;
      }
      const a = order;
      a.isEditing = false;
      return a;
    });
    setOrders(order1);
  };

  const cancelEdit = (OrderId) => {
    const order1 = orders.map((order) => {
      if (order.OrderId === OrderId) {
        const a = order;
        a.isEditing = false;
        return a;
      }
      return order;
    });
    setOrders(order1);
  };

  const editMode1 = (seq) => {
    const order1 = orderdetail.map((orderdetails) => {
      if (orderdetails.seq === seq) {
        const a = orderdetails;
        a.isEditings = true;
        return a;
      }
      const a = orderdetails;
      a.isEditings = false;
      return a;
    });
    setOrderdetail(order1);
  };

  const cancelEdit1 = (seq) => {
    const order1 = orderdetail.map((orderdetails) => {
      if (orderdetails.seq === seq) {
        const a = orderdetails;
        a.isEditings = false;
        return a;
      }
      return orderdetails;
    });
    setOrderdetail(order1);
  };

  const updateOrder = (update) => {
    fetch('http://localhost/php-react/DoUpdateOrder.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(update),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const order1 = orders.map((order) => {
            if (order.OrderId === update.OrderId) {
              const a = order;
              a.isEditing = false;
              a.EmpId = update.EmpId;
              a.CustId = update.CustId;
              a.OrderDate = update.OrderDate;
              a.Descript = update.Descript;
              return a;
            }
            return order;
          });
          setOrders(order1);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateOrderdetail = (update) => {
    fetch('http://localhost/php-react/DoUpdateOrder.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(update),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const order1 = orderdetail.map((orderdetails) => {
            if (orderdetails.seq === update.seq) {
              const a = orderdetails;
              a.isEditings = false;
              a.ProdId = update.ProdId;
              a.Qty = update.Qty;
              a.Discount = update.Discount;
              return a;
            }
            return orderdetails;
          });
          setOrderdetail(order1);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteOrder = (OrderId) => {
    const orderDeleted = orders.filter((order) => (order.OrderId !== OrderId));
    fetch('http://localhost/php-react/DoDeleteOrder.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ OrderId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrders(orderDeleted);
          if (orders.length === 1) {
            setOrderLength(0);
          }
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteOrderdetail = (seq) => {
    const orderDeleted = orderdetail.filter((orderdetails) => (orderdetails.seq !== seq));
    fetch('http://localhost/php-react/DoDeleteOrder.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ seq }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrderdetail(orderDeleted);
          if (orders.length === 1) {
            setOrderdetailLength(0);
          }
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const insertOrder = (newOrder) => {
    console.log(newOrder);
    fetch('http://localhost/php-react/add-order.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newOrder),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const o = {};
          o.seq = data.orderSeq[0].seq;
          o.OrderId = newOrder.OrderId;
          o.EmpId = newOrder.EmpId;
          o.CustId = newOrder.CustId;
          o.OrderDate = newOrder.OrderDate;
          o.Descript = newOrder.Descript;
          /* 要抓主檔跟明細的seq */
          console.log(o);
          setOrders([
            o,
            ...orders,
          ]);
          setOrderLength(true);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    orders,
    sorder,
    press,
    pressSet,
    orderdetail,
    searchOrder,
    editMode,
    editMode1,
    cancelEdit,
    cancelEdit1,
    updateOrder,
    updateOrderdetail,
    deleteOrder,
    deleteOrderdetail,
    orderLength,
    orderdetailLength,
    orderSelect,
    insertOrder
  };
};

export default ActionsP;
