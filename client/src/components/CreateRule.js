import React, { useState } from 'react';
import { createRule } from '../services/api';

const CreateRule = () => {
    const [ruleString, setRuleString] = useState('');
    const [ruleName, setRuleName] = useState('');

    const handleCreateRule = async () => {
        const response = await createRule(ruleString, ruleName);
        console.log(response.data);
    };

    return (
        <div>
            <h2>Create Rule</h2>
            <input value={ruleName} onChange={e => setRuleName(e.target.value)} placeholder="Rule Name" />
            <input value={ruleString} onChange={e => setRuleString(e.target.value)} placeholder="Rule String" />
            <button onClick={handleCreateRule}>Create Rule</button>
        </div>
    );
};

export default CreateRule;
