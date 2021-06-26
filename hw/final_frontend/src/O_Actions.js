import { useEffect, useState } from 'react';

const Actions = () => {
  const [users, setUsers] = useState([]);
  const [userLength, setUserLength] = useState(null);
  useEffect(() => {
    fetch('http://localhost/php-react/all-users.php')
      .then((res) => res.json())
      /* 把request json化 */
      .then((data) => {
        if (data.success) {
          setUsers(data.users);
          setUserLength(true);
        } else {
          setUserLength(0);
        }
        /* 接到request data後要做的事情 */
      })
      .catch((err) => {
        console.log(err);
        /* 發生錯誤時要做的事情 */
      });
  }, []);
  return {
    users,
    userLength,
  };
};
export default Actions;
