import React from 'react';

const JobCard = ({ job = null }) => {
    const postedAt = job && job.time ? new Date(job.time*1000).toLocaleString() : "-";

    const onClickHandler = () => {
        if(job && job.url)  window.open(job.url, "_blank");
    }
    
    return (
        <div className="job" onClick={() => onClickHandler()} target="_blank" style={{ cursor: job && job.url ? "pointer" : "default" }}>
            <div className="jobtitle">{job?.title}</div>
            <br/>
            <div className="jobbyinfo">
                <span>By {job?.by}</span>
                <span>{" ᐧ "}{postedAt}</span>
            </div>
        </div>
    );
}

export default JobCard;
