import React, {useState} from "react";

const Button = () => {
    const [a, setA] = useState(0);

    return <button style={{width: '200px', height: '300px', fontSize: '3em'}} onClick={() => setA(a+1)}>Count 123: {a}</button>;
}

export default Button;
