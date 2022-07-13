import { FC, useState } from 'react';
import Dialog from './Dialog';
import moment from 'moment';
import axios from 'axios';
import { endpointsConstants } from '../constants';

interface ReminderInterface {
  createdAt: Date;
  id: string;
  message: string;
  sendTime: string;
  status: boolean;
  title: string;
  updatedAt: Date;
}

const Table: FC<{ data: ReminderInterface[] }> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const deleteReminder = (id: string) => {
    axios.delete(endpointsConstants.REMINDERS_URI + `/${id}`);
  };

  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-4'>
      <table className='w-full text-sm text-left text-gray-400'>
        <thead className='text-xs uppercase bg-gray-700 text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Reminder Title
            </th>
            <th scope='col' className='px-6 py-3'>
              Message
            </th>
            <th scope='col' className='px-6 py-3'>
              SendTime
            </th>
            <th scope='col' className='px-6 py-3'>
              Status
            </th>
            <th scope='col' className='px-6 py-3'>
              <span className='sr-only'>Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((reminder) => {
            return (
              <tr key={reminder.id} className='bg-white border-b'>
                <th
                  scope='row'
                  className='px-6 py-4 font-medium text-gray-900  whitespace-nowrap'
                >
                  {reminder.title}
                </th>
                <td className='px-6 py-4'>{reminder.message}</td>
                <td className='px-6 py-4'>
                  {moment(reminder.sendTime).format('Do MMM YYYY')}
                </td>
                <td
                  className={`px-6 py-4 text-white text-center font-bold ${
                    reminder.status ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {reminder.status ? 'Enabled' : 'Disabled'}
                </td>
                <td className='px-6 py-4 flex justify-between'>
                  <button className='font-medium text-blue-600  hover:opacity-50'>
                    Edit
                  </button>
                  <button
                    className='font-medium ml-3 text-red-600  hover:opacity-50'
                    onClick={() => deleteReminder(reminder.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Dialog
        isOpen={isOpen}
        title='test'
        closeDialog={() => setIsOpen(false)}
      />
    </div>
  );
};

export default Table;
