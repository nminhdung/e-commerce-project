import axios from "../axios";

export const apiGetAllBlogs = ()=>{
    return axios({url:"/blog/",method:"get"})
}