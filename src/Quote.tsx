import React, { useEffect, useState } from "react";

interface IntQuote {
  author: string;
  text: string;
}

const Quote = () => {
  const [quotes, setQuotes] = useState<IntQuote[] | null>(null);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const fetchQuote = async () => {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();
      setQuotes(data);
    };
    fetchQuote();
  }, []);

  useEffect(() => {
    const interval = setTimeout(() => {
      if (quoteIndex < 1642) {
        setQuoteIndex(quoteIndex + 1);
      } else {
        setQuoteIndex(0);
      }
    }, 1000 * 60 * 5);
    return () => clearInterval(interval);
  }, [quoteIndex]);

  return (
    <div className=" flex flex-col justify-center items-center p-16">
      <span className=" text-4xl text-center px-10">
        {quotes ? quotes[quoteIndex].text : null}
      </span>
      <div className="mt-5">
        <span className="text-3xl">
          {quotes ? quotes[quoteIndex].author : null}
        </span>
      </div>
    </div>
  );
};

export default Quote;
