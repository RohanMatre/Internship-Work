"use client";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content, DateField, isFilled } from "@prismicio/client";
import { FaYoutube, FaGlobe, FaGithub, FaMedium } from 'react-icons/fa'; // Import FaMedium icon from react-icons/fa

export default function ContentBody({
  page,
}: {
  page: Content.BlogPostDocument | Content.ProjectDocument;
}) {
  function formatDate(date: DateField) {
    if (isFilled.date(date)) {
      const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return new Intl.DateTimeFormat("en-US", dateOptions).format(
        new Date(date)
      );
    }
  }

  const formattedDate = formatDate(page.data.date);

  return (
    <Bounded as="article">
      <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 px-4 py-10 md:px-8 md:py-20">
        <Heading as="h1">{page.data.title}</Heading>
        <div className="flex flex-wrap gap-4 text-yellow-400 text-xl font-bold">
          {page.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {page.data.live?.url && (
            <div className="flex justify-center">
              <a
                href={page.data.live.url}
                target={page.data.live.target || "_blank"}
                rel="noopener noreferrer"
                className="flex items-center justify-center px-6 py-3 text-xl font-medium text-slate-300 bg-blue-700 rounded-full hover:bg-blue-600 transition-colors duration-300"
                style={{ textDecoration: "none" }}
              >
                <FaGlobe className="mr-2" />
                Live Website
              </a>
            </div>
          )}
          {page.data.youtube?.url && (
            <div className="flex justify-center">
              <a
                href={page.data.youtube.url}
                target={page.data.youtube.target || "_blank"}
                rel="noopener noreferrer"
                className="flex items-center justify-center px-6 py-3 text-xl font-medium text-slate-300 bg-red-700 rounded-full hover:bg-red-600 transition-colors duration-300"
                style={{ textDecoration: "none" }}
              >
                <FaYoutube className="mr-2" />
                Watch on YouTube
              </a>
            </div>
          )}
          {page.data.github?.url && (
            <div className="flex justify-center">
              <a
                href={page.data.github.url}
                target={page.data.github.target || "_blank"}
                rel="noopener noreferrer"
                className="flex items-center justify-center px-6 py-3 text-xl font-medium text-slate-300 bg-black rounded-full hover:bg-black transition-colors duration-300"
                style={{ textDecoration: "none" }}
              >
                <FaGithub className="mr-2" />
                Github
              </a>
            </div>
          )}
          {page.data.medium?.url && (
            <div className="flex justify-center">
              <a
                href={page.data.medium.url}
                target={page.data.medium.target || "_blank"}
                rel="noopener noreferrer"
                className="flex items-center justify-center px-6 py-3 text-xl font-medium text-slate-300 bg-black rounded-full hover:bg-gray-600 transition-colors duration-300"
                style={{ textDecoration: "none" }}
              >
                <FaMedium className="w-6 h-6 mr-2" /> 
                Medium
              </a>
            </div>
          )}
        </div>
        <p className="mt-8 border-b border-slate-600 text-xl font-medium text-slate-300">
          {formattedDate}
        </p>
        <div className="prose prose-lg prose-invert mt-12 w-full max-w-none md:mt-20">
          <SliceZone slices={page.data.slices} components={components} />
        </div>
      </div>
    </Bounded>
  );
}
