import { API_URL } from "../config";
import { useEffect, useState } from "react";

function ManageRequests() {

  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {

    try {

      const response = await fetch(
        `${API_URL}/api/requests`
      );

      const data = await response.json();

      setRequests(data);

    }

    catch(error){

      console.log(error);

    }

  };

  useEffect(() => {

  const loadRequests = async () => {
    try {

      const response = await fetch(
        `${API_URL}/api/requests`
      );

      const data = await response.json();

      if (response.ok) {
        setRequests(data);
      }

    } catch (error) {
      console.log(error);
    }
  };

  loadRequests();

}, []);

  const updateStatus = async(id)=>{

    try{

      await fetch(
        `${API_URL}/api/requests/status/${id}`,
        {
          method:"PUT"
        }
      );

      fetchRequests();

    }

    catch(error){

      console.log(error);

    }

  };

  const deleteRequest = async(id)=>{

    const confirmDelete =
      window.confirm(
        "Delete this request?"
      );

    if(!confirmDelete) return;

    try{

      await fetch(
        `${API_URL}/api/requests/${id}`,
        {
          method:"DELETE"
        }
      );

      fetchRequests();

    }

    catch(error){

      console.log(error);

    }

  };

  return(

<div className="manage-requests">

<h1>Manage Custom Requests</h1>

{
requests.length===0?

(
<p>No Requests Found.</p>
)

:

requests.map((request)=>(

<div
className="request-card"
key={request._id}
>

<h2>{request.name}</h2>

<p><strong>Email:</strong> {request.email}</p>

<p><strong>Phone:</strong> {request.phone}</p>

<p><strong>Artwork:</strong> {request.artworkType}</p>

<p><strong>Budget:</strong> ₹{request.budget}</p>

<p><strong>Deadline:</strong> {request.deadline}</p>

<p>

<strong>Description:</strong>

<br/>

{request.description}

</p>

<p>

<strong>Status:</strong>

<span
className={
request.status==="Pending"
?
"pending"
:
"accepted"
}
>

{request.status}

</span>

</p>

<div className="request-buttons">

<button
onClick={()=>
updateStatus(request._id)
}
>

{request.status==="Pending"
?
"Accept Reques"
:
"Accepted ✓"}

</button>

<button
className="delete-btn"
onClick={()=>
deleteRequest(request._id)
}
>

Delete

</button>

</div>

</div>

))

}

</div>

  );

}

export default ManageRequests;