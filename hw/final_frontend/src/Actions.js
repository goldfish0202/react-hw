import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Actions = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userLength, setUserLength] = useState(null);
  const [orders, setOrders] = useState([]);
  const [orderLength, setOrderLength] = useState(null);
  const [details, setDetails] = useState([]);
  const [detailLength, setDetailLength] = useState(null);
  const [rrows, setRrows] = useState([]);
  const [rrowLength, setRrowLength] = useState(null);
  const [sales, setSales] = useState([]);
  const [saleLength, setSaleLength] = useState(null);
  const [userInf, setUserInf] = useState([]);

  useEffect(() => {
    fetch('http://localhost/php-react/all-products.php')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsers(data.users);
          setUserLength(true);
        } else {
          setUserLength(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    fetch('http://localhost/php-react/all-orders.php')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const t = [];
          for (let i = 0; i < data.orders.length; i++) {
            const r = {};
            const his = [];
            for (let j = 0; j < data.details.length; j++) {
              if (data.orders[i].OrderId === data.details[j].OrderId) {
                his.push({ ProdId: data.details[j].ProdId, qty: data.details[j].qty, Discount: data.details[j].Discount });
              }
            }
            r.OrderId = data.orders[i].OrderId;
            r.CustId = data.orders[i].CustId;
            r.OrderDate = data.orders[i].OrderDate;
            r.Descript = data.orders[i].Descript;
            r.history = his;
            t.push(r);
          }
          setRrows(t);
          setRrowLength(true);
          setOrders(data.orders);
          setOrderLength(true);
          setDetails(data.details);
          setDetailLength(true);
        } else {
          setRrowLength(false);
          setOrderLength(false);
          setDetailLength(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // userLogin.
  const userLogin = (loginUser) => {
    fetch('http://localhost/php-react/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUserInf(data.user);
          navigate('/app/products', { replace: true });
        } else {
          navigate('/', { replace: true });
          alert('帳號或密碼錯誤');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Search products.
  const searchProduct = (theID) => {
    fetch('http://localhost/php-react/select-products.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(theID),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsers(data.users);
          setUserLength(true);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Search all products.
  const allProduct = () => {
    fetch('http://localhost/php-react/all-products.php')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsers(data.users);
          setUserLength(true);
        } else {
          setUserLength(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Inserting a new product into the database.
  const insertProduct = (newUser) => {
    fetch('http://localhost/php-react/add-product.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsers([
            {
              ...newUser,
            },
            ...users,
          ]);
          setUserLength(true);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Deleting a product.
  const deleteProduct = (theID) => {
    // filter outing the product.
    const userDeleted = users.filter((user) => (user.ProdID !== theID));
    fetch('http://localhost/php-react/delete-product.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ProdID: theID }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsers(userDeleted);
          if (users.length === 1) {
            setUserLength(0);
          }
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Updating a product.
  const updateProduct = (userData) => {
    fetch('http://localhost/php-react/update-product.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const users1 = users.map((user) => {
            if (user.ProdID === userData.ProdID) {
              const a = user;
              a.isEditing = false;
              a.ProdName = userData.ProdName;
              a.UnitPrice = userData.UnitPrice;
              a.Cost = userData.Cost;
              return a;
            }
            return user;
          });
          setUsers(users1);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Enabling the edit mode for a listed product.
  const editMode = (id) => {
    const users1 = users.map((user) => {
      if (user.ProdID === id) {
        const a = user;
        a.isEditing = true;
        return a;
      }
      const a = user;
      a.isEditing = false;
      return a;
    });
    setUsers(users1);
  };

  // Cance the edit mode.
  const cancelEdit = (id) => {
    const users1 = users.map((user) => {
      if (user.ProdID === id) {
        const a = user;
        a.isEditing = false;
        return a;
      }
      return user;
    });
    setUsers(users1);
  };

  // Inserting a new order into the database.
  const insertOrder = (newOrder) => {
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
          const his = [];
          his.push({ ProdId: newOrder.ProdId, qty: newOrder.qty, Discount: newOrder.Discount });
          setRrows([
            {
              OrderId: newOrder.OrderId,
              CustId: newOrder.CustId,
              OrderDate: newOrder.OrderDate,
              Descript: newOrder.Descript,
              history: his,
            },
            ...rrows,
          ]);
          setRrowLength(true);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Enabling the edit mode for a listed order.
  const editOrderMode = (id) => {
    const orders1 = rrows.map((r) => {
      if (r.OrderId === id) {
        const a = r;
        a.isEditing = true;
        return a;
      }
      const a = r;
      a.isEditing = false;
      return a;
    });
    setRrows(orders1);
  };

  // Cance the edit mode.
  const cancelOrderEdit = (id) => {
    const orders1 = rrows.map((r) => {
      if (r.OrderId === id) {
        const a = r;
        a.isEditing = false;
        return a;
      }
      return r;
    });
    setRrows(orders1);
  };

  // select sales.
  const selectSales = (date) => {
    fetch('http://localhost/php-react/all-sales.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(date),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSales(data.sales);
          setSaleLength(true);
        } else {
          setSaleLength(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Deleting a order.
  const deleteOrder = (theID) => {
    const rrowsDeleted = rrows.filter((rrow) => (rrow.OrderId !== theID));
    fetch('http://localhost/php-react/delete-order.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ OrderId: theID }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setRrows(rrowsDeleted);
          if (rrows.length === 1) {
            setRrowLength(0);
          }
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Deleting a order.
  const deleteDetail = (theID, PID) => {
    const tt = [];
    for (let i = 0; i < rrows.length; i++) {
      const rr = {};
      if (rrows[i].OrderId === theID) {
        const hh = rrows[i].history.filter((h) => (h.ProdId !== PID));
        rr.OrderId = rrows[i].OrderId;
        rr.CustId = rrows[i].CustId;
        rr.OrderDate = rrows[i].OrderDate;
        rr.Descript = rrows[i].Descript;
        rr.history = hh;
      } else {
        rr.OrderId = rrows[i].OrderId;
        rr.CustId = rrows[i].CustId;
        rr.OrderDate = rrows[i].OrderDate;
        rr.Descript = rrows[i].Descript;
        rr.history = rrows[i].history;
      }
      tt.push(rr);
    }
    console.log(tt);
    fetch('http://localhost/php-react/delete-detail.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ OrderId: theID, PordId: PID }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setRrows(tt);
          if (rrows.length === 1) {
            setRrowLength(0);
          }
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Search orders.
  const searchOrder = (theID) => {
    fetch('http://localhost/php-react/all-orders.php')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const t = [];
          for (let i = 0; i < data.orders.length; i++) {
            if (data.orders[i].CustId === theID.CustId) {
              const r = {};
              const his = [];
              for (let j = 0; j < data.details.length; j++) {
                if (data.orders[i].OrderId === data.details[j].OrderId) {
                  his.push({ ProdId: data.details[j].ProdId, qty: data.details[j].qty, Discount: data.details[j].Discount });
                }
              }
              r.OrderId = data.orders[i].OrderId;
              r.CustId = data.orders[i].CustId;
              r.OrderDate = data.orders[i].OrderDate;
              r.Descript = data.orders[i].Descript;
              r.history = his;
              t.push(r);
            }
          }
          setRrows(t);
          setRrowLength(true);
        } else {
          setRrowLength(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Search all orders.
  const allOrder = () => {
    fetch('http://localhost/php-react/all-orders.php')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const t = [];
          for (let i = 0; i < data.orders.length; i++) {
            const r = {};
            const his = [];
            for (let j = 0; j < data.details.length; j++) {
              if (data.orders[i].OrderId === data.details[j].OrderId) {
                his.push({ ProdId: data.details[j].ProdId, qty: data.details[j].qty, Discount: data.details[j].Discount });
              }
            }
            r.OrderId = data.orders[i].OrderId;
            r.CustId = data.orders[i].CustId;
            r.OrderDate = data.orders[i].OrderDate;
            r.Descript = data.orders[i].Descript;
            r.history = his;
            t.push(r);
          }
          setRrows(t);
          setRrowLength(true);
        } else {
          setRrowLength(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Enabling the edit mode for a listed order detail.
  const editDetailMode = (id, pid) => {
    const orders1 = rrows.map((r) => {
      if (r.OrderId === id && r.history.ProdId === pid) {
        const a = r.history;
        a.isEditing = true;
        return a;
      }
      const a = r.history;
      a.isEditing = false;
      return a;
    });
    setRrows(orders1);
  };

  return {
    userInf,
    userLogin,
    users,
    searchProduct,
    allProduct,
    insertProduct,
    deleteProduct,
    editMode,
    cancelEdit,
    updateProduct,
    searchOrder,
    allOrder,
    insertOrder,
    editOrderMode,
    cancelOrderEdit,
    orders,
    editDetailMode,
    details,
    rrows,
    deleteOrder,
    deleteDetail,
    selectSales,
    sales,
    userLength,
    orderLength,
    detailLength,
    rrowLength,
    saleLength,
  };
};

export default Actions;
