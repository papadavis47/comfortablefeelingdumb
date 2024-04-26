import React from 'react';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { notFound } from 'next/navigation';

function readDirectory(localPath: string) {
  return fs.readdir(path.join(process.cwd(), localPath));
}

function readFile(localPath: string) {
  return fs.readFile(path.join(process.cwd(), localPath), 'utf8');
}

interface MyFrontmatter {
  title: string;
  id: number;
  date: string;
  description: string;
  topics: string[];
  isDraft: boolean;
}

type Post = {
  slug: string;
  frontMatter: MyFrontmatter;
  readingTime: string;
};

export async function getSlugsOnly() {
  const files = await readDirectory('/posts');

  const slugs = files.map((file) => file.replace('.mdx', ''));

  return slugs;
}

export async function getSubjectsOnly() {
  const posts = await getAllPosts();
  const subjects = [...new Set(posts.map((post) => post.frontMatter.topics).flat())];

  return subjects;
}

export async function getAllPosts() {
  const files = await readDirectory('/posts');

  const posts: Post[] = [];

  for (let fileName of files) {
    const fileContent = await readFile(`/posts/${fileName}`);
    const { data: frontMatter } = matter(fileContent);

    posts.push({
      frontMatter: frontMatter as MyFrontmatter,
      slug: fileName.replace('.mdx', ''),
      readingTime: readingTime(fileContent).text,
    });
  }

  return posts;
}

export const loadBlogPost = React.cache(async function loadBlogPost(slug: string) {
  const slugs = await getSlugsOnly();
  if (!slugs.includes(slug)) {
    notFound();
  }
  const rawContent = await readFile(`/posts/${slug}.mdx`);
  const timeToRead = readingTime(rawContent).text;

  const { data: frontMatter, content } = matter(rawContent);

  return { frontMatter, content, timeToRead };
});
