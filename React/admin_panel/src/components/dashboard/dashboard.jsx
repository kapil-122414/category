import React, { useEffect, useState } from "react";
import Cards from "../cards/cards";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [messages, setMessages] = useState([]);

  async function usersApi() {
    const data = await fetch("https://jsonplaceholder.typicode.com/users");

    const finalData = await data.json();

    setUsers(finalData);
  }

  async function ordersApi() {
    const data = await fetch("https://dummyjson.com/carts");

    const finalData = await data.json();

    setOrders(finalData.carts);
  }

  async function productsApi() {
    const data = await fetch("https://dummyjson.com/products");

    const finalData = await data.json();

    setProducts(finalData.products);
  }

  async function messagesApi() {
    const data = await fetch("https://dummyjson.com/comments");

    const finalData = await data.json();

    setMessages(finalData.comments);
  }

  useEffect(() => {
    usersApi();
    ordersApi();
    productsApi();
    messagesApi();
  }, []);

  const totalRevenue = orders.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className="dashboard-data">
      <div className="all-cards">
        <Cards
          name="Total Users"
          price={users.length}
          growth={`+${users.length}%`}
        />

        <Cards
          name="Total Orders"
          price={orders.length}
          growth={`+${orders.length}%`}
        />

        <Cards
          name="Total Revenue"
          price={`$${totalRevenue}`}
          growth="+15.6%"
        />

        <Cards
          name="New Messages"
          price={messages.length}
          growth={`+${messages.length}%`}
        />
      </div>

      <div className="table-container">
        <h2>Recent Orders</h2>

        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Products</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((item) => (
              <tr key={item.id}>
                <td>#{item.id}</td>

                <td>User {item.userId}</td>

                <td>
                  <span
                    className={
                      item.total > 500 ? "status Completed" : "status Pending"
                    }
                  >
                    {item.total > 500 ? "Completed" : "Pending"}
                  </span>
                </td>

                <td>${item.total}</td>

                <td>{item.totalProducts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
