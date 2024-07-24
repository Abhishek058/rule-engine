import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api'
});

export const createRule = (ruleString, ruleName) => API.post('/rules', { ruleString, ruleName });
export const combineRules = (ruleIds) => API.post('/rules/combine', { ruleIds });
export const evaluateRule = (rule, data) => API.post('/rules/evaluate', { rule, data });
