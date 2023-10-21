'use client'

import { useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

// Example function to show how an API might behave
async function queryExampleAPI(querystring: string) {

  // Set some artificial loading time
  // The await keyword pauses execution of an async function until the awaited function resolves
  await new Promise(resolve => setTimeout(resolve, 2000));

  if (querystring === "crisis-response-data") {
    const mockData = [
      { question: 'Past month', answer: '1', views: '5' },
      { question: '"Crisis type"', answer: '2', views: '10'  },
      { question: 'Tag', answer: '3', views: '15'  },
      { question: 'Location', answer: '4', views: '10'  },
      { question: 'Time of day', answer: '5', views: '6'  },
    ];

    const response = {
      error: null,
      data: mockData
    }
    return response // An `async` function returns a `Promise` that must be `await`ed inside another `async` function
  }

  // Sometimes APIs will return an error if your query is invalid or there are other issues
  const response = {
    error: new Error("Invalid API response"),
    data: null
  }
  return response
}

function DataDashboard() {
  // Defining a state variable to store the data
  // State variable is initially null, but will update once the API request finishes
  const [dashboardData, setDashboardData] = useState<{
    question: string;
    answer: string;
  }[] | null>(null);

  // As if data was loading but will replace this with actual API requests
  useEffect(() => {

    // Define async function that calls the API
    const fetchAPIData = async () => {
      // TO-DO: Fetch data from an API endpoint or update it as needed
      const { error, data } = await queryExampleAPI("crisis-response-data"); // Async functions must be awaited
      
      if (error) {
        // Handle errors in API fetching. Ideally error messages should be displayed in the frontend UI, not just console.logged. Fine for development though
        console.log(error.message)
        return
      }

      setDashboardData(data);
      return
    };

    // Run the async function
    fetchAPIData();

  }, []); // Make sure to include the dependency array in useEffect, or your app will infinite loop

  const dashboard = dashboardData ? dashboardData.map((item, index) => (
      <li key={index}>
        <strong>{item.question}:</strong> Answer: {item.answer}
      </li>
  )) : "Loading..."

  const simple_barchart = dashboardData ? (
    <BarChart
      width={600}
      height={300}
      data={dashboardData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="question" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="answer" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
      <Bar dataKey="views" fill="#82ca9d" activeBar={<Rectangle fill="orange" stroke="blue" />} />
    </BarChart>
  ) : <></>;

  const stacked_barchart = dashboardData ? (
    <BarChart
      width={600}
      height={300}
      data={dashboardData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="question" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="answer" stackId="a" fill="#8884d8" />
      <Bar dataKey="views" stackId="a" fill="#82ca9d" />
    </BarChart>
  ) : <></>;

  const mixed_barchart = dashboardData ? (
    <BarChart
      width={600}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="pv" stackId="a" fill="#8884d8" />
      <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
      <Bar dataKey="amt" fill="#ffc658" />
    </BarChart>
  ) : <></>;

  return (
    <div>
      <h1><strong>Data Dashboard</strong></h1>
      <ul className='pt-5 pb-5'>
        <h3><strong>Responses Per Category</strong></h3>
        {dashboard}
      </ul>
      <ul>
        {simple_barchart}
      </ul>
      <ul>
        {stacked_barchart}
      </ul>
      <ul>
        {mixed_barchart}
      </ul>
    </div>
  );
}

export default DataDashboard;