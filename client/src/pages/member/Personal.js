import moment from "moment";
import React, { useEffect } from "react";
import defaultAvatar from "../../assets/avatar-default.png";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button, InputForm } from "../../components";
import { apiUpdateCurrentUser } from "../../api";
import { getCurrentUser } from "../../store/user/asyncThunk";
import { toast } from "react-toastify";

const Personal = () => {
  const { current } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
    setValue,
  } = useForm();
  const handleUpdateInfo = async (data) => {
    const formData = new FormData();

    for (let i of Object.entries(data)) {
      formData.append(i[0], i[1]);
    }
    if (data.avatar?.length > 0) {
      formData.set("avatar", data.avatar[0]);
    } else {
      formData.delete("avatar");
    }
    const res = await apiUpdateCurrentUser(formData);
    if (res.success) {
      dispatch(getCurrentUser());
      toast.success(res.mes);
    } else {
      toast.error(res.mes);
    }
  };
  useEffect(() => {
    reset({
      firstname: current?.firstname,
      lastname: current?.lastname,
      email: current?.email,
      phone: current?.phone,
      avatar: current?.avatar,
      address: current?.address,
    });
  }, [current]);
  return (
    <div className="w-full">
      <h1 className="border-b p-4 font-semibold text-3xl mb-6">Personal</h1>
      <form
        onSubmit={handleSubmit(handleUpdateInfo)}
        className="w-4/5 mx-auto flex flex-col gap-2"
      >
        <InputForm
          name="firstname"
          label="First Name"
          register={register}
          errors={errors}
          validate={{ required: "Please fill this field" }}
          placeholder="Your First name"
        />{" "}
        <InputForm
          name="lastname"
          label="Last Name"
          register={register}
          errors={errors}
          validate={{ required: "Please fill this field" }}
          placeholder="Your Last Name"
        />{" "}
        <InputForm
          name="email"
          label="Email"
          register={register}
          errors={errors}
          validate={{
            required: "Please fill this field",
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: "Email invalid",
            },
          }}
          placeholder="Your Email"
        />{" "}
        <InputForm
          name="phone"
          label="Phone"
          register={register}
          errors={errors}
          validate={{
            required: "Please fill this field",
            pattern: {
              value:
                /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/gm,
              message: "Phone invalid",
            },
          }}
          placeholder="Your Phone Number"
        />
        <InputForm
          name="address"
          label="Address"
          register={register}
          errors={errors}
          validate={{
            required: "Please fill this field",
          }}
          placeholder="Your address"
        />
        <div className="flex items-center gap-1">
          <span className="font-medium">Account Status: </span>
          <span
            className={`${current.isBlocked ? "text-main" : "text-green-500"}`}
          >
            {current.isBlocked ? "Blocked" : "Activing"}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-medium">Created At: </span>
          <span>{moment(current?.createdAt).fromNow()}</span>
        </div>
        <div className="flex  flex-col gap-1">
          <span className="font-medium">Profile avatar: </span>
          <label htmlFor="file">
            <img
              src={current?.avatar || defaultAvatar}
              alt="avatar"
              className="w-20 h-20 object-cover rounded-full"
            />
          </label>
          <input type="file" id="file" {...register("avatar")} hidden />
        </div>
        <div className="flex justify-end">
          {isDirty && <Button type="submit">Update information</Button>}
        </div>
      </form>
    </div>
  );
};

export default Personal;
