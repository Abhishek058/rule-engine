const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Rule = require("./models/Rule");
const Node = require("./utils/Node");

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/ruleEngine", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.post("/api/rules", async (req, res) => {
  const { ruleString, ruleName } = req.body;
  try {
    const rule = createRule(ruleString);
    console.log("Created Rule AST:", JSON.stringify(rule, null, 2));
    const newRule = new Rule({ rule_name: ruleName, rule_ast: rule });
    await newRule.save();
    res.send(newRule);
  } catch (error) {
    console.error("Error creating rule:", error);
    res.status(500).send("Server Error");
  }
});

app.post("/api/rules/combine", async (req, res) => {
  const { ruleIds } = req.body;
  try {
    const rules = await Rule.find({ _id: { $in: ruleIds } });
    const combinedRule = combineRules(rules.map((rule) => rule.rule_ast));
    console.log("Combined Rule AST:", JSON.stringify(combinedRule, null, 2));
    res.send(combinedRule);
  } catch (error) {
    console.error("Error combining rules:", error);
    res.status(500).send("Server Error");
  }
});

app.post("/api/rules/evaluate", (req, res) => {
  const { rule, data } = req.body;
  try {
    console.log("Evaluating Rule AST:", JSON.stringify(rule, null, 2));
    console.log("With Data:", data);
    const result = evaluateRule(rule, data);
    res.send({ result });
  } catch (error) {
    console.error("Error evaluating rule:", error);
    res.status(500).send("Server Error");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

function createRule(ruleString) {
  const stack = [];
  const tokens = ruleString.match(/\w+|\(|\)|AND|OR|>|<|=/g);

  tokens.forEach((token) => {
    if (token === "AND" || token === "OR") {
      const right = stack.pop();
      const left = stack.pop();
      stack.push(new Node("operator", left, right, token));
    } else if (token === "(" || token === ")") {
      if (token === ")") {
        const subExpression = [];
        let node;
        while ((node = stack.pop()) !== "(") {
          subExpression.push(node);
        }
        subExpression.reverse().forEach((node) => stack.push(node));
      } else {
        stack.push(token);
      }
    } else {
      const parts = token.split(" ");
      stack.push(new Node("operand", null, null, parts));
    }
  });
  return stack.pop();
}

function combineRules(rules) {
  if (rules.length === 0) return null;
  let combined = rules[0];
  for (let i = 1; i < rules.length; i++) {
    combined = new Node("operator", combined, rules[i], "AND");
  }
  return combined;
}

function evaluateRule(root, data) {
  if (!root) return false;
  if (root.type === "operand") {
    const [attribute, operator, value] = root.value;
    const dataValue = data[attribute];
    switch (operator) {
      case ">":
        return dataValue > value;
      case "<":
        return dataValue < value;
      case "=":
        return dataValue == value;
      default:
        return false;
    }
  } else {
    const leftResult = evaluateRule(root.left, data);
    const rightResult = evaluateRule(root.right, data);
    if (root.value === "AND") {
      return leftResult && rightResult;
    } else if (root.value === "OR") {
      return leftResult || rightResult;
    }
  }
  return false;
}
