import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head";
import { RichText } from "prismic-dom";
import { getPrismicClient } from "../../services/prismic";

import styles from './post.module.scss'

interface PostProps {
  post: {
    slug: string
    title: string;
    author: string;
    content: string;
    updatedAt: string;
  }

}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{post.title} | ac.devs</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <span>Por <strong>{post.author}</strong> no dia <time>{post.updatedAt}</time></span>
          <div 
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </article>
      </main>
    </>
  )
}


export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID('blog-post', String(slug), {});
  
  const post = {
    slug,
    title: response.data.title,
    author: response.data.author,
    content: RichText.asHtml(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }
  return {
    props: {
      post
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}