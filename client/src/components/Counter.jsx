import 'styles/counter.scss';

import React, { useState } from 'react';

export default function Button() {
    const [count, setCount] = useState(0);

    return (
        <div className="container">
            <button className="decrease" onClick={() => { setCount(count - 1); }}>-</button>
            <p>{count}</p>
            <button className="increase" onClick={() => { setCount(count + 1); }}>+</button>
        </div>
    );
}