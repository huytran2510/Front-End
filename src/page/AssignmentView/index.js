
import React, {useEffect, useState} from "react";
import {useLocalStorage} from "../../util/useLocalStorage";
import ajax from "../../ajax/fetchService";

const AssignmentView = () => {
    const assignmentId = window.location.href.split("/assignments/")[1]
    const [assignment, setAssignment] = useState({
        branch :"",
        githubUrl: ""
    })
    // const [githubUrl, setGithubUrl] = useState(null)
    // const [branch, setBranch] = useState(null)
    const [jwt,setJwt] = useLocalStorage("","jwt")

    function updateAssignment(prop, value) {
        const newAssignment = {...assignment}
        newAssignment[prop] = value
        setAssignment(newAssignment)
        console.log(assignment)
    }

    function save() {
        // const req = {
        //     "id" : assignmentId,
        //     "githubUrl" : assignment.githubUrl,
        //     "branch" : assignment.branch
        // }
        ajax(`/api/assignments/${assignmentId}`,jwt,"PUT", assignment)
            .then((assignmentData)=> setAssignment(assignmentData))
    }

    useEffect(() => {
        fetch(`/api/assignments/${assignmentId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "GET",
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }).then((assignmentData) => {
            console.log(assignmentData)
            setAssignment(assignmentData)
        }).catch((error) => {
            console.error("Error:", error);
        });
    },[])
    return (
        <div>
            <h1>Assignment {assignmentId}</h1>
            {assignment ? (
                <>
                    <h2>Status: {assignment.status}</h2>
                    <h3>
                        Github URL:{""}
                        <input
                            type={"url"}
                            id={"githubUrl"}
                            value={assignment.githubUrl}
                            onChange={(e) => updateAssignment("githubUrl",e.target.value)}
                        />
                    </h3>
                    <h3>
                        Branch:{""}
                        <input
                            type={"text"}
                            id={"branch"}
                            value={assignment.branch}
                            onChange={(e) => updateAssignment("branch",e.target.value)}
                        />
                    </h3>
                    <button onClick={() => save()}>Submit Assignment</button>
                </>
            ) :(
                <></>
            )}
        </div>
    )
}

export default AssignmentView