import React, {useState} from "react";
import { getAllRequests, getRequestByBookCode, getRequestByStudentId } from "../services/request_services";
import { useEffect } from "react";
import RequestListItem from "../common/RequestListItem";

const RequestList = ({choice, id, setRequest}) => {
    const [requests, setRequests] = useState([]);

    const getRequests = async() => {
        if (choice === 1){
            const list = await getAllRequests();
            setRequests(list);
        }else if (choice === 2){
            const list = await getRequestByBookCode(id.bookCode);
            setRequests(list);
        }else if (choice === 3){
            const list = await getRequestByStudentId(id.id);
            setRequests(list);
        }
    }

    useEffect(() => {
        getRequests();
    }, [])

    return (<ul id="remove">
        {requests.map((data) => (
            <li id="space" key= {data.bookCode}><RequestListItem request={data} setRequest={setRequest}/></li>
        ))}
        </ul>
    )
}

export default RequestList;