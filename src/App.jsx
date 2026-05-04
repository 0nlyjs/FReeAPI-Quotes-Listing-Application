import React, { useState, useEffect } from "react";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  const fetchQuotes = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.freeapi.app/api/v1/public/quotes?page=${pageNumber}&limit=12`,
      );
      const result = await response.json();
      if (result.success) {
        if (pageNumber === 1) {
          setQuotes(result.data.data);
        } else {
          setQuotes((prev) => [...prev, ...result.data.data]);
        }
        setTotalPages(result.data.totalPages);
      } else {
        setError(result.message || "Failed to fetch quotes");
      }
    } catch (err) {
      setError("An error occurred while fetching quotes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes(page);
  }, [page]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-sakura-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-sakura-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-sakura-900 mb-4 tracking-tight drop-shadow-sm">
            Sakura Quotes
          </h1>
          <p className="text-lg md:text-xl text-sakura-800/80 font-medium max-w-2xl mx-auto">
            Find calm and inspiration in these carefully selected words of
            wisdom.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center mb-8 border border-red-100">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quotes.map((quote) => (
            <div
              key={quote.id}
              className="glass-panel p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-sakura-200/50 group"
            >
              <div>
                <svg
                  className="w-10 h-10 text-sakura-300 mb-6 opacity-50 transform -translate-x-2 -translate-y-2 group-hover:text-sakura-400 transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-sakura-900 text-lg leading-relaxed font-serif mb-6">
                  {quote.content}
                </p>
              </div>
              <div className="mt-auto border-t border-sakura-200/50 pt-4 flex justify-between items-center">
                <span className="font-semibold text-sakura-800">
                  — {quote.author}
                </span>
                {quote.tags && quote.tags.length > 0 && (
                  <span className="text-xs bg-sakura-100 text-sakura-600 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                    {quote.tags[0]}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center items-center mt-12 py-4">
            <div className="w-12 h-12 border-4 border-sakura-200 border-t-sakura-500 rounded-full animate-spin"></div>
          </div>
        )}

        {!loading && page < totalPages && (
          <div className="text-center mt-16">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="bg-white/80 hover:bg-sakura-500 hover:text-white text-sakura-700 font-semibold py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-sakura-300/50 backdrop-blur-sm border border-sakura-100 transform hover:scale-105"
            >
              Discover More
            </button>
          </div>
        )}

        {!loading && quotes.length === 0 && !error && (
          <div className="text-center text-sakura-700 text-xl font-serif mt-12">
            No quotes found.
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
