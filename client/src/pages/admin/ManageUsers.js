import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { apiDeleteUser, apiGetUsers, apiUpdateUser } from "../../api";
import { InputForm, Paginate, SelectForm } from "../../components";
import useDebounce from "../../hooks/useDebounce";
import { roles, blockStatus } from "../../utils/constants";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Swal from "sweetalert2";

const ManageUsers = () => {
  const [params] = useSearchParams();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    role: "",
    isBlocked: false,
  });
  const [editUser, setEditUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
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
  const onSubmitEdit = async (data) => {

    const res = await apiUpdateUser(data, editUser?._id);

    if (res.success) {
      setIsEdit(false);
      setEditUser(null);
      toast.success("Updated");
    } else {
      toast.error("Can't not update user");
    }
  };
  const handleDeleteUser = (uid) => {
    Swal.fire({
      title: "Are you sure....",
      text: "Do you want to remove this user?",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await apiDeleteUser(uid);
        if (res.success) {
          toast.success(res.mes);
          fetchUsers({ limit: 2 });
        } else {
          toast.error(res.mes);
        }
      }
    });
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
  }, [queriesDebounce, params, isEdit]);

  return (
    <div className="w-full">
      <h1 className="capitalize text-3xl p-4 flex items-center border-main border-b-2">
        Manage Users
      </h1>
      <div className="mt-2 w-full p-4">
        <div className="mb-4 ">
          <input
            type="text"
            value={searchTerm.value}
            name="searchValue"
            className="px-4 py-2 rounded-md  text-black w-[500px]  placeholder:text-sm
             placeholder:italic outline-none placeholder:capitalize "
            placeholder="Search name or email"
            onChange={(e) => setSearchTerm({ [e.target.name]: e.target.value })}
          />
          
        </div>

        {!isEdit ? (
          <table className="table-auto mb-2 text-left w-full ">
            <thead className="font-bold border text-sm bg-black">
              <tr>
                <th className="px-4 py-2 border-r">#</th>
                <th className="px-4 py-2 border-r">Email</th>
                <th className="px-4 py-2 border-r">First Name</th>
                <th className="px-4 py-2 border-r">Last Name</th>
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
                    <td className="py-2 px-4 border-r">{user.firstname} </td>
                    <td className="py-2 px-4 border-r">{user.lastname} </td>

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
                      <span
                        onClick={() => {
                          if (user) {
                            Object.entries(user).forEach(([name, value]) => {
                              setValue(name, value);
                            });
                          }
                          // setValue("email", user.email);
                          // setValue("firstname", user.firstname);
                          // setValue("lastname", user.lastname);
                          // setValue("phone", user.phone);
                          setEditUser(user);
                          setIsEdit(true);
                        }}
                        className="px-1 hover:underline text-orange-400  cursor-pointer"
                      >
                        Edit
                      </span>
                      <span
                        onClick={() => handleDeleteUser(user._id)}
                        className="px-1 hover:underline text-main  cursor-pointer"
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <form onSubmit={handleSubmit(onSubmitEdit)}>
            <InputForm
              register={register}
              errors={errors}
              validate={{
                required: "Require fill.",
                pattern: {
                  value: /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/i,
                  message: "Invalid email address",
                },
              }}
              name="email"
              label="Email"
              // defaultValue={editUser?.email ? editUser.email : ""}
            />
            <InputForm
              register={register}
              errors={errors}
              validate={{ required: "Require fill." }}
              name="firstname"
              label="First Name"
              // defaultValue={editUser?.firstname ? editUser.firstname : ""}
            />
            <InputForm
              register={register}
              errors={errors}
              validate={{ required: "Require fill." }}
              name="lastname"
              label="Last Name"
              // defaultValue={editUser?.lastname ? editUser.lastname : ""}
            />
            <InputForm
              register={register}
              errors={errors}
              validate={{
                required: "Require fill.",
                pattern: {
                  value: /^[62|0]+\d{9}/gi,
                  message: "Invalid phone number",
                },
              }}
              name="phone"
              label="Phone"
              // defaultValue={editUser?.phone ? editUser.phone : ""}
            />
            <SelectForm
              register={register}
              errors={errors}
              // defaultValue={editUser?.code}
              label="Role"
              name="role"
              options={roles}
              validate={{ required: "Require fill." }}
            />
            <SelectForm
              register={register}
              errors={errors}
              // defaultValue={editUser?.isBlocked}
              name="isBlocked"
              label="Status"
              options={blockStatus}
              validate={{}}
            />
            <div className="flex items-center gap-2">
              <button
                className="px-4 py-2 bg-main rounded-md"
                onClick={() => {
                  setEditUser(null);
                  setIsEdit(false);
                }}
              >
                Back
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 rounded-md"
              >
                Update
              </button>
            </div>
          </form>
        )}
        {!isEdit && (
          <div className="w-full">
            <Paginate totalProduct={users?.counts} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
