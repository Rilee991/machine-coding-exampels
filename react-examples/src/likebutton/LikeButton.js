import React, { useState } from 'react';
import { HeartIcon, SpinnerIcon } from './icons';

import './styles.css';

const LikeButton = () => {
    const [liked, setLiked] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const apiCall = async () => {
        return new Promise((res, rej) => {
            setTimeout(() => {
                const rand = Math.floor(Math.random()*10);
                if(rand&1)  res("success");
                else rej("failure");
            },500);
        });
    }

    const onClickHandler = async () => {
        setLoading(true);
        try {
            const resp = await apiCall();
            setLiked(!liked);
            setError("");
        } catch (e) {
            setError("API Failed");
        }
        setLoading(false);
    }

    return (
        <div className="container">
            <button onClick={() => onClickHandler()} disabled={loading} className={`btn ${liked ? 'liked' : ''}`}>
                {loading ? <SpinnerIcon /> : <HeartIcon />} {liked ? "Liked" : "Like"}
            </button>
            {error && <div>{error}</div>}
        </div>
    );
}

export default LikeButton;
