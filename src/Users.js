import React,{useState, useEffect} from "react";
import { Container, Table } from "react-bootstrap";

export default function Users(){
    const [data, setData] = useState([])
    const [mode, setMode] = useState("Online")

    useEffect(()=>{
        let url="https://jsonplaceholder.typicode.com/users";
        fetch(url).then((response)=>{
            response.json().then((result)=>{
                console.warn("Result", result)
                setData(result)
                localStorage.setItem("users", JSON.stringify(result))
            }).catch(err=>{
                let collectiondata = localStorage.getItem("users")
                setData(JSON.parse(collectiondata))
                setMode("Offline")
            })
        }).catch(err=>{
            let collectiondata = localStorage.getItem("users")
            setData(JSON.parse(collectiondata))
            setMode("Offline")
        })
    },[])
    return(
        <>
        <div>
          <Container>
            <div>
                {
                    mode==="Offline"?
                    <div class="alert alert-warning" role="alert">You are in offline mode!</div>:null
                }
            </div>  
            <Table responsive="sm">
            <thead>
            <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Website</th>
                <th>Address</th>
                <th>Company</th>
            </tr>
            </thead>
            <tbody>
            {
                data.map((itom)=>(
                    <tr>
                        <td>{itom.id}</td>
                        <td>{itom.name}</td>
                        <td>{itom.email}</td>
                        <td>{itom.phone}</td>
                        <td>{itom.website}</td>
                        <td>{itom.address.street} {itom.address.suite} {itom.address.city}</td>
                        <td>{itom.company.name}</td>
                    </tr>
                ))
            }
            </tbody>
            </Table>
          </Container>
        </div>
        </>
    )
}


// import React, { useState, useEffect } from "react";
// import { Container, Table } from "react-bootstrap";

// export default function Users() {
//     const [data, setData] = useState([]);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const url = "https://jsonplaceholder.typicode.com/users";

//         // Check if the user is online
//         if (navigator.onLine) {
//             fetch(url)
//                 .then((response) => response.json())
//                 .then((result) => {
//                     console.warn("Result", result);
//                     setData(result);
//                 })
//                 .catch((err) => {
//                     console.error("Fetch error:", err);
//                     setError("Failed to fetch data. Please try again later.");
//                 });
//         } else {
//             setError("You are currently offline. Please connect to the internet to fetch data.");
//         }
//     }, []);

//     return (
//         <div>
//             <Container>
//                 {error ? (
//                     <div className="alert alert-warning">{error}</div>
//                 ) : (
//                     <Table responsive="sm">
//                         <thead>
//                             <tr>
//                                 <th>S.No</th>
//                                 <th>Name</th>
//                                 <th>Email</th>
//                                 <th>Phone</th>
//                                 <th>Website</th>
//                                 <th>Address</th>
//                                 <th>Company</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {data.map((item) => (
//                                 <tr key={item.id}>
//                                     <td>{item.id}</td>
//                                     <td>{item.name}</td>
//                                     <td>{item.email}</td>
//                                     <td>{item.phone}</td>
//                                     <td>{item.website}</td>
//                                     <td>{`${item.address.street} ${item.address.suite} ${item.address.city}`}</td>
//                                     <td>{item.company.name}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </Table>
//                 )}
//             </Container>
//         </div>
//     );
// }
