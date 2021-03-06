import React from "react";
import Trend from "react-trend";
import fromUnixTime from 'date-fns/fromUnixTime';

export default function Status({ name, code, uptime, responseTime, datetime }) {
  return (
    <div
      className="rounded-sm bg-gray-800 m-4 p-4 relative"
      style={{ width: "24rem", height: "19.8rem" }}
    >
      <h1 className="text-2xl font-bold text-blue-200">{name}</h1>
      <div
        className="m-4 absolute top-0 right-0 rounded-full w-4 h-4"
        style={{
          background:
            code === 2
              ? "#47cbac"
              : code === 1
              ? "#1a202c"
              : code === 8
              ? "#ff9800"
                  : "#f44336",
        }}
      />
      <div className="text-lg mb-2">
        Current status:{" "}
        <span className="text-blue-400">
          {code === 2
            ? "Up"
            : code === 1
            ? "Checking"
            : code === 8
            ? "Minor Outage"
            : "Down"}
        </span>
      </div>
      <div>
        Running since:{" "} 
        <span className="text-blue-400">{fromUnixTime(datetime).toString()}</span>
      </div>
      <div>
        Up{" "}
        <span className="text-blue-400">
          {Number(uptime.split("-")[0]).toFixed(2)}%
        </span>{" "}
        over <span className="text-blue-400">7</span> days
      </div>
      <div>
        Up{" "}
        <span className="text-blue-400">
          {Number(uptime.split("-")[1]).toFixed(2)}%
        </span>{" "}
        over <span className="text-blue-400">30</span> days
      </div>

      <div className="mt-2">
        Average Response Time:{" "}
        <span className="text-blue-400">
          {responseTime.length > 1
            ? (
                responseTime.map((a) => a.value).reduce((a, b) => a + b) /
                responseTime.length
              ).toFixed(0)
            : 0}
          ms
        </span>
      </div>
      <div className="w-full">
        <Trend
          smooth
          autoDraw
          autoDrawDuration={3000}
          autoDrawEasing="ease-out"
          data={
            responseTime.length > 1 ? responseTime.map((a) => a.value) : [0, 0]
          }
          gradient={['#42b3f4']}
          strokeWidth={2}
          radius={0}
          strokeLinecap={"round"}
          padding={0}
        />
      </div>
    </div>
  );
}
