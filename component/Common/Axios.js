// import Public from '../Common/Public';

// // 接口请求
// export default Axios = (url, data, status, aisle, encrypt) => {
//     return new Promise((res, rej) => {
//         fetch(url, {
//             method: 'POST',
//             mode: "cors",
//             body: encrypt ? data : JSON.stringify(data),
//             headers: new Headers({
//                 'Content-Type': aisle ? aisle : 'application/json',
//             })
//         })
//         .then((response) => response.json())
//         .then((ret) => {
//             res(ret);
//         })
//         .catch((err) =>{
//             status ? rej(err) : Public.toast('网络错误~');
//         });
//     });
// }