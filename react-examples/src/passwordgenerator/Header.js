import React, { useState } from 'react';

const Header = ({ password = "55" }) => {
    const [isCopied, setIsCopied] = useState(false);

    const onClickCopy = () => {
        if(!isCopied) {
            setIsCopied(true);
            window.navigator.clipboard.writeText(password);

            setTimeout(() => {
                setIsCopied(false);
            }, 800);
        }
    }

    return (
        <div className="labels__extreme">
            <span>{password}</span>
            <span><button disabled={isCopied} onClick={onClickCopy}>{isCopied ? "Copied" : "Copy"}</button></span>
        </div>
    );
}

export default Header;
