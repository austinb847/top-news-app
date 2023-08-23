"use client";

import { usePathname } from "next/navigation";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useEffectOnce } from "usehooks-ts";

async function logPageView(userId: string, pagePath: string) {
  const response = await fetch(`/api/users/${userId}/history`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: pagePath }),
  });
  const data = await response.json();
  return data;
}

const ArticleDetailPage: React.FC = () => {
  const pathname = usePathname();
  const { user, error, isLoading } = useUser();

  useEffectOnce(() => {
    if (user?.sub) {
      //log the page view for the user
      logPageView(user.sub, pathname);
    }
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Article Details - This is a Protected Page
      </h1>
      <h2 className="text-lg font-semibold">Article Title</h2>
      <p>A Description</p>
    </div>
  );
};

export default withPageAuthRequired(ArticleDetailPage);
