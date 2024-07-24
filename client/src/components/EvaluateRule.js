import React, { useState } from 'react';
import { evaluateRule } from '../services/api';

const EvaluateRule = () => {
    const [rule, setRule] = useState('');
    const [data, setData] = useState('{}');
    const [result, setResult] = useState(null);

    const handleEvaluateRule = async () => {
        const response = await evaluateRule(rule, JSON.parse(data));
        setResult(response.data.result);
    };

    return (
        <div>
            <h2>Evaluate Rule</h2>
            <input value={rule} onChange={e => setRule(e.target.value)} placeholder="Rule ID" />
            <textarea value={data} onChange={e => setData(e.target.value)} placeholder="Data (JSON format)" />
            <button onClick={handleEvaluateRule}>Evaluate Rule</button>
            {result !== null && <div>Result: {result.toString()}</div>}
        </div>
    );
};

export default EvaluateRule;
