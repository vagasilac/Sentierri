import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import './RecentActivity.css';

const RecentActivity = () => {
  const orders = [
    { id: 1, date: '2022-01-01', customer: 'John Doe', total: 100 },
    { id: 2, date: '2022-01-02', customer: 'Jane Doe', total: 200 },
  ];

  const tasks = [
    { id: 1, date: '2022-01-01', title: 'Order materials', completed: true },
    { id: 2, date: '2022-01-02', title: 'Schedule production', completed: false },
  ];

  return (
    <div className='recent'>
      <h2>Recent Activity</h2>
      <h3>Orders</h3>
      <List>
        {orders.map((order) => (
          <ListItem key={order.id}>
            <ListItemText
              primary={`${order.date} - ${order.customer}`}
              secondary={`Total: $${order.total}`}
            />
          </ListItem>
        ))}
      </List>
      <h3>Tasks</h3>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <ListItemText
              primary={`${task.date} - ${task.title}`}
              secondary={task.completed ? 'Completed' : 'Incomplete'}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default RecentActivity;