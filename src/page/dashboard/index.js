import React, {useEffect, useState} from "react";
import {useLocalStorage} from "../../util/useLocalStorage";
import {Link} from "react-router-dom";
import SliderComponent from "../slider/SliderComponent";

const Dashboard = () => {
    const [jwt,setJwt] = useLocalStorage("","jwt")
    const [assignment, setAssignment] = useState(null)

    useEffect(() => {
        fetch("/api/assignments",{
            headers :{
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${jwt}`
            },
            method : "GET",
        }).then((response) => {
            if (response.status === 200) return response.json();
        }).then(assignmentData => {
            console.log(assignmentData)
            setAssignment(assignmentData)
        })
    }, []);

    function createAssignment() {
        fetch("api/assignments", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "POST",
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }).then((data) => {
            console.log(data);
        }).catch((error) => {
            console.error("Error:", error);
        });
    }
    const images = [
        "https://file.hstatic.net/1000075078/file/web_moi_-_desktop_ebafdd167f4543d38f2099b61b267642.jpg",
        "https://file.hstatic.net/1000075078/file/web_moi_-_desktop_80626cda30824027b21dd7932e02f306.jpg",
        "https://file.hstatic.net/1000075078/file/desktop_fd962a6f8c6047258311c8be3ca7681c.jpg",
        "https://file.hstatic.net/1000075078/file/desktop_1dfffc4d98274531a784cc22329b8fab.jpg",
        "https://file.hstatic.net/1000075078/file/web_moi_-_desktop_ebafdd167f4543d38f2099b61b267642.jpg"
    ];
    return (
        <div style={{margin: "2em"}}>
            {assignment ? assignment.map((assignment) =>  <div>
                <div><Link to={`/assignments/${assignment.id}`}>Assignment Id: {assignment.id}</Link></div>
            </div>) : <></>}
            <SliderComponent arrImages={images} />
            <button onClick={() => createAssignment()}>Submit New Assignment</button>
        </div>
    )
}

export default Dashboard;