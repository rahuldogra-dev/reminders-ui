import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from './components/Table';
import { endpointsConstants } from './constants';

interface ReminderInterface {
  createdAt: Date;
  id: string;
  message: string;
  sendTime: string;
  status: true;
  title: string;
  updatedAt: Date;
}

function App() {
  const [tableData, setTableData] = useState<ReminderInterface[]>([]);

  const fetchTableData = () => {
    try {
      axios.get(endpointsConstants.REMINDERS_URI).then((res) => {
        setTableData(res.data);
      });

      // setTableData();
    } catch (error) {}
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <div className='md:container md:mx-auto'>
      <header className='flex justify-between mt-3 shadow-md sm:rounded-lg'>
        <span className='text-3xl font-bold pl-2'>Reminder List</span>
        <button className='bg-blue-600 text-center p-2 font-semibold text-slate-200 sm:rounded-r-lg'>
          New
        </button>
      </header>
      {tableData.length ? <Table data={tableData} /> : null}
    </div>
  );
}

export default App;
