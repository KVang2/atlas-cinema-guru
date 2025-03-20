"use client";
import React, { useState, useEffect } from "react";

interface Activity {
  id: string;
  timestamp: string;
  activity: string;
  title: string;
}

export default function ActivityLog() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(`/api/activities?page=1`);
        if (!response.ok) throw new Error("Failed to fetch activities");

        const data = await response.json();
        setActivities(data.activities || []);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="mt-4 p-4 text-md whitespace-nowrap">
      {/* Title */}
      <h2 className="text-[#00003c] text-lg font-bold">
        Latest Activities
      </h2>

      {/* Activity List */}
      <ul className="mt-2 space-y-3">
        {activities.map((activity) => (
          <li key={activity.id} className="p-2">
            <p className="text-[#00003c] text-sm">
              <span className="font-bold">{formatTimestamp(activity.timestamp)}</span>
            </p>
            <p className="text-[#00003c] text-sm">
              {activity.activity.includes("Favorited") ? (
                <>
                  Favorited <span className="font-bold text-sm">{activity.title}</span>
                </>
              ) : (
                <>
                  Added <span className="font-bold text-sm">{activity.title}</span> <br/> to watch later
                </>
              )}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Helper function to format timestamp
const formatTimestamp = (timestamp: string) => {
  const dateObj = new Date(timestamp);

  const date = dateObj.toLocaleDateString("en-US", {
    timeZone: "America/Chicago",
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour12: false,
  });

  const time = dateObj.toLocaleTimeString("en-US", {
    timeZone: "America/Chicago", // Central Time
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return `${date}, ${time}`;
};
