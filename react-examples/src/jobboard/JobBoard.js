import React, { useEffect, useState } from 'react';
import { JOBS_PER_RENDER, JOB_API_ENDPOINT } from './constants';
import JobCard from './JobCard';

import './styles.css';

// https://hacker-news.firebaseio.com/v0/jobstories.json
// https://hacker-news.firebaseio.com/v0/item/45353.json
const JobBoard = () => {
    const [visibleJobsCount, setVisibleJobsCount] = useState(JOBS_PER_RENDER);
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        setStatus("LOADING");
        getJobs().then(r => setStatus("")).catch(e => setStatus("ERRORED"));
    },[]);

    useEffect(() => {
        getJobs(visibleJobsCount);
    },[visibleJobsCount]);

    const getJobs = async (numOfJobs = 6) => {
        try {
            const resp = await fetch(`${JOB_API_ENDPOINT}/jobstories.json`);
            const json = await resp.json();
            const currJobs = jobs.length;
            const jobIds = json.slice(currJobs,currJobs+JOBS_PER_RENDER);
            const tempJobs = jobs;

            for(const jobId of jobIds) {
                if(!tempJobs.includes(jobId)) {
                    const jobResp = await fetch(`${JOB_API_ENDPOINT}/item/${jobId}.json`);
                    const job = await jobResp.json();
                    tempJobs.push(job);
                }
            }

            setJobs(tempJobs);
        } catch (e) {
            setError(e.message);
            throw new Error(e.message);
        }
    }

    const visibleJobs = jobs.slice(0, visibleJobsCount);

    return (
        <div className="container">
            <h2>Hacker News Jobs Board</h2>
            {status === "LOADING" ? "Loading..." : 
            <div>
                <div className="jobslist">
                    {visibleJobs.map(job => <JobCard key={job.id} job={job} />)}
                </div>
                <button disabled={status === "LOADING"} className="btn" onClick={() => setVisibleJobsCount(prev => prev+JOBS_PER_RENDER)}> Load More</button>
            </div>}
            {status === "ERRORED" ? <div className="error">{error}</div> : ""}
        </div>
    );
}

export default JobBoard;
