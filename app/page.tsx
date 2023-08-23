/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

type Article = {
  title: string;
  urlToImage: string;
};

async function fetchNews() {
  const response = await fetch(
    `${process.env.NEWS_API_URL}?country=us&apiKey=${process.env.NEWS_API_KEY}`,
    { next: { revalidate: 3600 } } // Revalidate every hour
  );
  const data = await response.json();
  return data.articles;
}

const NewsPage: React.FC = async () => {
  const articles: Article[] = await fetchNews();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Latest News</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {articles?.map((article, index) => (
          <Link
            href={`/article/${index + 1}`}
            key={index}
            className="bg-white rounded-md shadow-md p-4 hover:bg-gray-100 transition duration-300 cursor-pointer"
          >
            <img
              className="w-full h-auto mb-2"
              src={article.urlToImage}
              alt={article.title}
            />
            <h2 className="text-lg font-semibold">{article.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
