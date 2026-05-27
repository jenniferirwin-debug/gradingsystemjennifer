import React, { useState, useEffect } from "react";

function StudentHeader() {
  return (
    <div className="header">
      <h1>Student Grading System</h1>
    </div>
  );
}

function ResultCard({ name, marks, grade, status, remark }) {
  return (
    <div className="result-card">
      <h2>Result</h2>

      <p>
        <strong>Student Name:</strong> {name}
      </p>

      <p>
        <strong>Marks:</strong> {marks}
      </p>

      <p>
        <strong>Grade:</strong> {grade}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        <span className={status === "PASS" ? "pass" : "fail"}>
          {status}
        </span>
      </p>

      <p>
        <strong>Remark:</strong> {remark}
      </p>
    </div>
  );
}

export default function App() {
  const [name, setName] = useState("");
  const [marks, setMarks] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    const savedResult = localStorage.getItem("studentResult");

    if (savedResult) {
      setResult(JSON.parse(savedResult));
    }
  }, []);

  
  useEffect(() => {
    if (result) {
      localStorage.setItem("studentResult", JSON.stringify(result));
    }
  }, [result]);

  const checkResult = () => {
   
    if (name.trim() === "" || marks === "") {
      alert("Please fill in all fields");
      return;
    }

    const numericMarks = Number(marks);

    if (numericMarks < 0 || numericMarks > 100) {
      alert("Marks must be between 0 and 100");
      return;
    }

    let grade = "";
    let remark = "";
    let status = "";

 
    if (numericMarks >= 80) {
      grade = "A";
      remark = "Excellent";
      status = "PASS";
    } else if (numericMarks >= 70) {
      grade = "B";
      remark = "Very Good";
      status = "PASS";
    } else if (numericMarks >= 60) {
      grade = "C";
      remark = "Good";
      status = "PASS";
    } else if (numericMarks >= 50) {
      grade = "D";
      remark = "Fair";
      status = "PASS";
    } else {
      grade = "F";
      remark = "Fail";
      status = "FAIL";
    }

    setResult({
      name,
      marks: numericMarks,
      grade,
      status,
      remark,
    });
  };

  const resetFields = () => {
    setName("");
    setMarks("");
    setResult(null);
    localStorage.removeItem("studentResult");
  };

  return (
    <div className="container">
      <StudentHeader />

      <div className="form-card">
        <input
          type="text"
          placeholder="Enter student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter marks"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
        />

        <div className="button-group">
          <button onClick={checkResult}>Check Result</button>

          <button className="reset-btn" onClick={resetFields}>
            Reset
          </button>
        </div>
      </div>

      {/* Conditional Rendering */}
      {result && (
        <ResultCard
          name={result.name}
          marks={result.marks}
          grade={result.grade}
          status={result.status}
          remark={result.remark}
        />
      )}

      <style>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
        }

        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 20px;
        }

        .header h1 {
          color: #333;
          margin-bottom: 20px;
        }

        .form-card,
        .result-card {
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          width: 320px;
          margin-bottom: 20px;
        }

        input {
          width: 100%;
          padding: 10px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 16px;
          box-sizing: border-box;
        }

        .button-group {
          display: flex;
          gap: 10px;
        }

        button {
          flex: 1;
          padding: 10px;
          border: none;
          border-radius: 5px;
          background-color: #007bff;
          color: white;
          font-size: 16px;
          cursor: pointer;
        }

        button:hover {
          opacity: 0.9;
        }

        .reset-btn {
          background-color: #dc3545;
        }

        .pass {
          color: green;
          font-weight: bold;
        }

        .fail {
          color: red;
          font-weight: bold;
        }

        p {
          font-size: 16px;
          margin: 10px 0;
        }
      `}</style>
    </div>
  );
}
