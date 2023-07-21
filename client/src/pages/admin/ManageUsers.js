import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { apiGetUsers } from "../../api";
import { Paginate } from "../../components";
import useDebounce from "../../hooks/useDebounce";
import { roles } from "../../utils/constants";
import { useSearchParams } from "react-router-dom";


const ManageUsers = () => {
  const [params] = useSearchParams();
  const [users, setUsers] = useState();
  const [searchTerm, setSearchTerm] = useState({
    searchValue: "",
  });
  const fetchUsers = async (params) => {
    const res = await apiGetUsers({ ...params, limit: 2 });
    console.log(res);
    if (res.success) {
      setUsers(res);
    }
  };
  const queriesDebounce = useDebounce(searchTerm.searchValue, 2000);
  useEffect(() => {
    let paramsList = [];
    //giu lai cac truong filter truoc do
    for (let i of params.entries()) {
      paramsList.push(i);
    }
    const queries = {};
    for (let i of paramsList) {
      queries[i[0]] = i[1];
    }
    
    if (queriesDebounce) queries.searchKey = queriesDebounce;

    fetchUsers(queries);
  }, [queriesDebounce,params]);

  return (
    <div className="w-full">
      <h1 className="capitalize text-3xl p-4 flex items-center border-main border-b-2">
        Manage Users
      </h1>
      <div className="mt-2 w-full p-4">
        <div className="flex mb-4 justify-between">
          <input
            type="text"
            value={searchTerm.value}
            name="searchValue"
            className="px-4 py-2 rounded-md  text-black w-[500px]  placeholder:text-sm
             placeholder:italic outline-none placeholder:capitalize "
            placeholder="Search name or email"
            onChange={(e) => setSearchTerm({ [e.target.name]: e.target.value })}
          />
          <button className="px-4 py-2 bg-green-600 rounded-md">Add new</button>
        </div>
        <table className="table-auto mb-2 text-left w-full ">
          <thead className="font-bold border text-sm bg-black">
            <tr>
              <th className="px-4 py-2 border-r">#</th>
              <th className="px-4 py-2 border-r">Email</th>
              <th className="px-4 py-2 border-r">Full Name</th>
              <th className="px-4 py-2 border-r">Phone</th>
              <th className="px-4 py-2 border-r">Role</th>
              <th className="px-4 py-2 border-r">Status</th>
              <th className="px-4 py-2 border-r">Created At</th>
              <th className="px-4 py-2 border-r">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.listUser?.map((user, index) => {
              return (
                <tr key={user._id} className="border ">
                  <td className="py-2 px-4 border-r">{index + 1}</td>
                  <td className="py-2 px-4 border-r">{user.email}</td>
                  <td className="py-2 px-4 border-r">{`${user.firstname} ${user.lastname}`}</td>
                  <td className="py-2 px-4 border-r">{user.phone}</td>
                  <td className="py-2 px-4 border-r">
                    {roles.find((role) => role.code === user.role)?.value}
                  </td>
                  <td className="py-2 px-4 border-r">
                    {user.isBlocked ? "Blocked" : "Active"}
                  </td>
                  <td className="py-2 px-4 border-r">
                    {moment(user.createdAt).format("DD/MM/YYYY")}
                  </td>
                  <td className="py-2 px-4 border-r">
                    <span className="px-1 hover:underline text-orange-400  cursor-pointer">
                      Edit
                    </span>
                    <span className="px-1 hover:underline text-main  cursor-pointer">
                      Delete
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="w-full">
          <Paginate totalProduct={users?.counts} />
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
