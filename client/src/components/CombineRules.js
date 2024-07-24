import React, { useState } from 'react';
import { combineRules } from '../services/api';

const CombineRules = () => {
    const [ruleIds, setRuleIds] = useState('');

    const handleCombineRules = async () => {
        const response = await combineRules(ruleIds.split(','));
        console.log(response.data);
    };

    return (
        <div>
            <h2>Combine Rules</h2>
            <input value={ruleIds} onChange={e => setRuleIds(e.target.value)} placeholder="Rule IDs (comma-separated)" />
            <button onClick={handleCombineRules}>Combine Rules</button>
        </div>
    );
};

export default CombineRules;
