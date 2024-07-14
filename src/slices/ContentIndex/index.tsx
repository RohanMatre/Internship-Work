import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import ContentList from "./ContentList";
import { createClient } from "@/prismicio";

export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>;

const ContentIndex = ({ slice }: ContentIndexProps): JSX.Element => {
  const client = createClient();

  // Use Promise.all to fetch both blog posts and projects concurrently
  const fetchData = async () => {
    const [blogPosts, projects] = await Promise.all([
      client.getAllByType("blog_post"),
      client.getAllByType("project"),
    ]);
    return { blogPosts, projects };
  };

  fetchData().then(({ blogPosts, projects }) => {
    const contentType = slice.primary.content_type || "Blog";
    const items = contentType === "Blog" ? blogPosts : projects;

    return (
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        <Heading size="xl" className="mb-8">
          {slice.primary.heading}
        </Heading>
        {isFilled.richText(slice.primary.description) && (
          <div className="prose prose-xl prose-invert mb-10">
            <PrismicRichText field={slice.primary.description} />
          </div>
        )}

        <ContentList
          items={items}
          contentType={contentType}
          viewMoreText={slice.primary.view_more_text}
          fallbackItemImage={slice.primary.fallback_item_image}
        />
      </Bounded>
    );
  });

  return <></>; // Placeholder while fetching data
};

export default ContentIndex;
