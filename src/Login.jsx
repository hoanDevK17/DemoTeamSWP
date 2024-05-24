import React, { useEffect, useState } from "react";
import { createUser, getListUser } from "./api/api";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Login() {
  console.log("Chạy 1");
  // useEffect
  const [listUser, setListUser] = useState();
  const [newUser, setNewUser] = useState({ name: "", job: "" });
  const [number, setNumber] = useState(0);
  const notify = () => toast.success("Thành công");
  const handleSubmit = () => {
    createUser(newUser.name, newUser.job)
      .then(function (response) {
        console.log(response);
        if (response.status === 201) {
          toast.success("Thành công");
          setNewUser({ name: "", job: "" });
        } else {
          toast.error(`Lỗi error response:${response.status} `);
        }
      })
      .catch(function (error) {
        toast.error(`Lỗi error response:${error} `);
      });
  };
  useEffect(
    () => {
      //    hàm thực thi
      getListUser(2)
        .then(function (response) {
          console.log(response.data.data);
          setListUser((listUser) => response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          // luôn luôn được thực thi
        });
    },
    []

    // c1 : chạy 1 lần duy nhất (có dependency là 1 mảng rỗng)
    // c2 : lần nào cũng chạy (bỏ luôn cái dependency)
    // c3 : chạy lần 1 và chạy khi biến thay đổi ( theo dõi biến)
    // dependencies
  );
  useEffect(() => {
    console.log("chạy rồi nè");
  }, [number, newUser]);
  console.log("Chạy 2");
  return (
    <>
      {listUser &&
        listUser.map((user) => {
          return (
            <>
              <p>{user.email}</p>
              <p>{user.first_name + user.last_name} </p>
            </>
          );
        })}
      Job :
      <input
        type="text"
        name="job"
        value={newUser.job}
        onChange={(event) => {
          setNewUser((newUser) => {
            return { ...newUser, job: event.target.value };
          });
        }}
      ></input>
      Name :
      <input
        type="text"
        name="name"
        value={newUser.name}
        onChange={(event) => {
          setNewUser((newUser) => {
            return { ...newUser, name: event.target.value };
          });
        }}
      ></input>
      <button
        onClick={() => {
          handleSubmit();
        }}
      >
        Submit
      </button>
      <button
        onClick={() => {
          setNumber((number) => number + 2);
          notify();
        }}
      >
        {number}
      </button>
    </>
  );
}
