import Head from 'next/head';
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss'
import { GetStaticProps } from 'next';
import Link from 'next/link';

type Post = {
  slug: string;
  title: string;
  summary: string;
  updatedAt: string;
}

interface PostProps {
  posts: Post[]
}

export default function Posts({ posts }: PostProps) {

  return (
    <>
      <Head>
        <title>Posts | ac.devs</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link key={post.slug} href={`/posts/${post.slug}`}>
            <a>
              <time>{post.updatedAt}</time>
              <strong>{post.title}</strong>
              <p>{post.summary}</p>
            </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.predicates.at('document.type', 'blog-post')
  ], {
    fetch: ['blog-post.author', 'blog-post.title', 'blog-post.summary'],
    pageSize: 100,
  });
  
  console.log(response.results);

  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: post.data.title,
      summary: post.data.summary.find(content => content.type === 'paragraph')?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  });

  return {
    props: {
      posts
    }
  }
}