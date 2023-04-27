import NewsArticleEntry from '@/components/NewsArticleEntry';
import NewsArticleGrid from '@/components/NewsArticleGrid';
import { NewsArticle, NewsResponse } from '@/models/NewsArticles'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { Alert } from 'react-bootstrap';

export interface BreakingNewsPageProps {
  newsArticles: NewsArticle
}

export const getServerSideProps: GetServerSideProps<BreakingNewsPageProps> = async () => {
  const response = await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=" + process.env.NEWS_API_KEY);
  const newsResponse: NewsResponse = await response.json();
  return {
    props: {
      newsArticles: newsResponse.articles,
    }
  }
  // let error go to 500 page
};


export default function BreakingNews({newsArticles} : BreakingNewsPageProps) {
  return (
    <>
    <Head>
      <title>Breaking News - Nextjs News App</title>
    </Head>
      <main>
        <h1>Breaking News</h1>
        <Alert>
          This page use <strong>getServerSideProps</strong> to fetch data server side on every request. This allows search engines to crawl the page content and <strong>improves SEO</strong> 
        </Alert>
        <NewsArticleGrid articles={newsArticles} />
      </main>
    </>
  )
}
