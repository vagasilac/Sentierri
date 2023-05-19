import React from 'react';
import CardComponent from '../common/CardComponent';
import SalesTrendsChart from '../charts/SalesTrendsChart.jsx';
import RecentActivity from '../recentActivity/RecentActivity.jsx';
import './Dashboard.css';


const Dashboard = () => {
  const actions = [
    { label: 'Learn More' },
    { label: 'Buy Now' },
  ];

  return (
    <div className='dash'>
      <h1>Dashboard</h1>
      <div className='cards'>
        <CardComponent
          title="Inventory"
          value={100}
          actions={actions}
          image="https://picsum.photos/seed/picsum/200/300"
          description="This is my card description"/>
        <CardComponent
          title="Inventory"
          value={200}
          actions={actions}
          image="https://picsum.photos/seed/picsum/200/300"
          description="This is my card description"/>
        <CardComponent
          title="Inventory"
          value={300}
          actions={actions}
          image="https://picsum.photos/seed/picsum/200/300"
          description="This is my card description"/>
      </div>
      <div className='saleschart'>
        <SalesTrendsChart />
      </div>
      <RecentActivity />

    </div>
  );
};

export default Dashboard;