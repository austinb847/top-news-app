"use client";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useState } from "react";
import { useEffectOnce } from "usehooks-ts";

type VisitedUrl = {
  _id: string;
  url: string;
  timestamp: string;
};

async function fetchVisitedUrls(userId: string) {
  const url = `http://localhost:3000/api/users/${encodeURIComponent(
    userId
  )}/history`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const UserHistoryPage: React.FC = () => {
  const [visitedUrls, setVisitedUrls] = useState<VisitedUrl[]>([]);
  const { user } = useUser();
  const userId = user?.sub;

  useEffectOnce(() => {
    if (userId) {
      fetchVisitedUrls(userId).then((data) => {
        const urlData: VisitedUrl[] = data.visitedUrls;
        const sortedUrls = [...urlData].sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setVisitedUrls(sortedUrls);
      });
    }
  });

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Your Visited URLs</h1>
      {visitedUrls.length > 0 && (
        <ul className="space-y-4">
          {visitedUrls.map((urlData, index) => (
            <li
              key={urlData._id}
              className={`flex items-center p-4 shadow-md rounded-md ${
                index % 2 === 0 ? "bg-blue-100" : "bg-green-100"
              }`}
            >
              <div className="w-1/2">{urlData.url}</div>
              <div className="w-1/2 text-right text-gray-500">
                {new Date(urlData.timestamp).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default withPageAuthRequired(UserHistoryPage);
