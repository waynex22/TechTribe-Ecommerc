import React, { useState } from 'react';
import { allUser } from 'src/redux/rtkQuery/user_customers';

const UserList: React.FC<{ users: allUser[] | undefined}> = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  let filteredUsers:allUser[] | undefined= undefined 
  if(users !== undefined) {

     filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div>
      <div className='flex justify-end'>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        className=' mx-2 rounded-md'
        onChange={handleSearchChange}
        />
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr className="text-gray-400 text-sm font-light border-b text-left font-mono">
            <th className="px-4 py-2">Tên user</th>
            <th className="px-4 py-2">Số điện thoại</th>
          </tr>
        </thead>
        <tbody>
        {filteredUsers && filteredUsers.map((user, index) => (
          <tr key={user._id} className="border-b text-gray-700 text-left font-mono">
          <td className="px-4 py-2 flex justify-start items-center">
            <div className=" overflow-hidden me-2 ">
              <img className=" w-16 h-16 rounded-full object-cover border"
                src={`http://localhost:8080/uploads/${user.avata}`}
                alt=""
              />
            </div>
            <p className="items-start font-bold">{user.name}</p>
          </td>
          <td className="px-4 py-2 font-light">{user.phone}</td>
          {/* <td className="px-4 py-2 text-center">
            <button onClick={() => (handleOpen(), setIdShop(shop._id))} className="rounded min-w-16 text-amber-500 bg-amber-200 bg-opacity-80 hover:text-amber-600 hover:bg-amber-400 text-sm cursor-pointe duration-200 ms-2 py-1">
              Ban
            </button>
          </td> */}
        </tr>
        ))}
        </tbody>
        </table>
    </div>
  );
};

export default UserList;
