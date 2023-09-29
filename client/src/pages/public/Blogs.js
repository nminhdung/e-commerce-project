/* eslint-disable jsx-a11y/img-redundant-alt */
// eslint-disable-next-line jsx-a11y/img-redundant-alt
import React, { useEffect, useState } from "react";
import { BreadCumbs } from "../../components";
import { apiGetAllBlogs } from "../../api";
import { BsArrowRightShort } from "react-icons/bs";
import moment from "moment";
import { Link } from "react-router-dom";
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const fetchBlogs = async () => {
    const res = await apiGetAllBlogs();
    console.log(res);
    if (res.success) {
      setBlogs(res.listBlog);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="w-full mb-[200px]">
      <div className="bg-gray-100 h-[81px] flex md:justify-center items-center">
        <div className="xl:w-main">
          <h3 className="font-bold">Blogs</h3>
          <BreadCumbs category="blogs" />
        </div>
      </div>
      {blogs.length === 0 && (
        <h2 className="flex items-center justify-center">No blog founded</h2>
      )}

      {blogs.length > 0 && (
        <div className="xl:w-main mx-auto grid md:grid-cols-10 mt-4 gap-10">
          <div className="md:col-span-7 flex flex-col gap-3">
            {blogs.map((blog) => {
              return (
                <article
                  key={blog._id}
                  className="flex flex-col md:flex-row justify-content gap-6"
                >
                  <img
                    src={
                      blog.image ||
                      "https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&w=600"
                    }
                    alt="image"
                    className="w-full h-[300px] object-cover"
                  />
                  <div className="flex flex-col gap-2">
                    <h2 className="font-semibold text-xl hover:text-main cursor-pointer transition duration-300">
                      {blog.title}
                    </h2>

                    <div className="">
                      <span className="text-main mr-4">By {blog.author} </span>
                      <span className="font-italic text-xs">
                        {moment(blog.createdAt).format("ll")}
                      </span>
                    </div>
                    <p className="line-clamp-6 ">{blog.description}</p>
                    <div className="flex items-center gap-2 text-red-500 cursor-pointer hover:text-black transition duration-300">
                      <Link to={"/"} className=" font-medium ">
                        Read more{" "}
                      </Link>
                      <BsArrowRightShort size={20} />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="md:col-span-3 ">
            <div className="w-full border">
              <h1 className="px-4 py-2 bg-main text-white text-xl font-medium uppercase">
                Other Blogs
              </h1>
              {blogs.map((blog) => {
                return (
                  <div key={blog._id} className="px-5 py-2 flex flex-col gap-4">
                    <Link
                      to={"/"}
                      className="font-semibold hover:text-main cursor-pointer text-md transition duration-300"
                    >
                      {blog.title}
                    </Link>
                    <span className="font-italic text-xs">
                      {moment(blog.createdAt).format("ll")}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
