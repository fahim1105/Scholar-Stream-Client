import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "http://localhost:3000"
    // baseURL: "https://scholar-stream-server-alpha-fawn.vercel.app"
});

const UseAxiosPublic = () => {
    return axiosPublic
}
export default UseAxiosPublic;