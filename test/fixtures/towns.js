module.exports = [
  {
    "request": {
      "url": "^/towns$",
      "headers": {
        "Content-Type": "application/json"
      },
      "method": "GET"
    },
    "response": {
      "status": 200,
      "headers": {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      "file": "test/features/towns.json"
    }
  }
];