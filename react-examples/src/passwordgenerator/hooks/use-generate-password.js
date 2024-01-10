import { useState } from "react";

const usePasswordGenerate = () => {
    const [ok, setOk] = useState(true);
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const generatePassword = (charLength, checkboxes) => {
        let passCharset = "", password = "";
        if(charLength < 4) {
            setOk(false);
            setMessage("Please select a char length of at least 4");
            setPassword("");
            return;
        };
    
        for(const cb of checkboxes) {
            if(cb.value) {
                passCharset += cb.charset;
            }
        }
    
        if(passCharset.length === 0) {
            setOk(false);
            setMessage("No checkboxes selected. Please select at least one.");
            setPassword("");
            return;
        };
    
        while(charLength--) {
            const idx = Math.floor(Math.random() * passCharset.length);
            password += passCharset[idx];
        }
    
        setOk(true);
        setMessage("");
        setPassword(password);
    }

    return { ok, message, password, generatePassword };
}

export default usePasswordGenerate;
