import React, { useEffect, useState } from "react";

interface IntQuote {
  author: string;
  content: string;
}

const Quote = () => {
  const [quote, setQuote] = useState<IntQuote | null>(null);

  const fetchQuote = async () => {
    const response = await fetch(
      "https://api.quotable.io/random?tags=inspirational|life|success|wisdom|proverb"
    );
    const data = await response.json();

    setQuote(data);
  };

  useEffect(() => {
    (async () => await fetchQuote())();
  }, []);

  useEffect(() => {
    const interval = setTimeout(async () => {
      await fetchQuote();
    }, 1000 * 60 * 5);
    return () => clearInterval(interval);
  }, [quote]);

  if (!quote) {
    return null;
  }

  return (
    <div className=" flex flex-col justify-center items-center p-16">
      <span className=" text-4xl text-center px-10">{quote.content}</span>
      <div className="mt-5">
        <span className="text-3xl">{quote.author}</span>
      </div>
    </div>
  );
};

export default Quote;
