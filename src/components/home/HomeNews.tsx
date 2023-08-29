import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HiOutlineNewspaper } from "react-icons/hi";
import Link from "next/link";
import type { News } from "../../utils/types";

const NewsItem = (props: { news: News; length: number }) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const translate = props.length > 10 ? 50 : 0;

  const opacity = useTransform(scrollYProgress, [0.98, 1], [1, 0.5]);
  const translateY = useTransform(scrollYProgress, [0.98, 1], [0, translate]);
  const scale = useTransform(scrollYProgress, [0.98, 1], [1, 0.95]);

  return (
    <motion.div
      className="m-4 mx-auto flex w-5/6 flex-col justify-center rounded-md p-2 transition duration-150 hover:bg-slate-200 hover:shadow-md dark:hover:bg-slate-500 sm:w-[25em]"
      ref={ref}
      style={{
        opacity,
        translateY,
        scale,
      }}
    >
      <span className="m-1 flex basis-1/4 flex-row justify-start">
        <HiOutlineNewspaper className="mx-2 text-2xl" />
        <div className="text-left">{props.news.source}</div>
      </span>
      <a href={props.news.link} className="mx-4 my-1 basis-3/4 hover:underline">
        <h1 className="font-serif text-sm sm:text-base xl:text-xl">
          {props.news.title}
        </h1>
      </a>
    </motion.div>
  );
};

const NewsList = (props: { newsList: News[] }) => {
  const newsComponents = props.newsList.map((news: News, idx: number) => {
    return <NewsItem news={news} key={idx} length={props.newsList.length} />;
  });

  if (props.newsList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl">News</h1>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl">No news to show</h2>
      </div>
    );
  }

  return (
    <div
      className="flex w-full flex-col items-center justify-center py-20"
      id="news"
    >
      <div className="flex flex-row items-center justify-center">
        <h1 className="p-8 text-3xl sm:text-4xl lg:text-6xl">Latest News</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {newsComponents}
      </div>
      {props.newsList.length < 50 ? (
        <div className="flex h-20 flex-row items-center justify-center text-base hover:text-[#f1f13c] md:text-xl">
          <Link href="/news">Click me to see more!</Link>
        </div>
      ) : (
        <div className="h-20 text-xl">
          No more, just google crypto news &#128528;
        </div>
      )}
    </div>
  );
};

export default NewsList;
