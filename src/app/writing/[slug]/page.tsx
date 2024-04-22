import { MDXRemote } from 'next-mdx-remote/rsc';
import Thanks from '@/components/Thanks';
import { loadBlogPost } from '@/utils/helpers';
import { BLOG_TITLE } from '@/utils/constants';
import COMPONENT_MAP from '@/utils/mdx-components';

export async function generateMetadata({ params }) {
  const { frontMatter } = await loadBlogPost(params.slug);
  return {
    title: `${frontMatter.title} | ${BLOG_TITLE}`,
    description: frontMatter.description,
  };
}

async function PostPage({ params }: { params: { slug: string } }) {
  const { frontMatter, content, timeToRead } = await loadBlogPost(params.slug);

  return (
    <div className='px-6 pt-6 pb-10 mx-auto my-10 max-w-5xl'>
      <h1 className='pb-2 text-4xl font-extrabold text-transparent capitalize bg-gradient-to-l from-headings to-secondary bg-clip-text lg:text-7xl'>
        {frontMatter.title}
      </h1>
      <span className='block py-4 my-6 text-xl'>{frontMatter.date}</span>
      <span className='block py-4 my-2 text-xl'>{timeToRead}</span>
      <MDXRemote source={content} components={COMPONENT_MAP} />
      <Thanks />
    </div>
  );
}

export default PostPage;
