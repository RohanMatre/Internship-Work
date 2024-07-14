import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  let page;

  try {
    page = await client.getByUID("page", params.uid);
  } catch (error) {
    return notFound();
  }

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  let page;

  try {
    page = await client.getByUID("page", params.uid);
  } catch (error) {
    throw error; // Handle the error appropriately for metadata generation
  }

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = client.getAllByType("page");

  return (await pages).map((page) => {
    return { uid: page.uid };
  });
}
