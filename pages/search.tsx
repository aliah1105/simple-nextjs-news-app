import NewsArticleGrid from "@/components/NewsArticleGrid";
import { NewsArticle } from "@/models/NewsArticles";
import Head from "next/head";
import { FormEvent, useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";

export default function SearchNewsPage() {
  const [searchResult, setSearchResult] = useState<NewsArticle | null>(null);
  const [searchResultLoading, setSearchResultLoading] = useState(false);
  const [searchResultLoadingIsError, setSearchResultLoadingIsError] =
    useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get("searchQuery")?.toString().trim();

    if (searchQuery) {
      try {
        setSearchResult(null);
        setSearchResultLoading(true);
        setSearchResultLoadingIsError(false);
        const response = await fetch("/api/search-news?q=" + searchQuery);
        const articles: NewsArticle = await response.json();
        setSearchResult(articles);
      } catch (error) {
        console.error(error);
        setSearchResultLoadingIsError(true);
      } finally {
        setSearchResultLoading(false);
      }
    }
  }

  return (
    <>
    <Head>
      <title key="title">Search News - Nextjs News App</title>
    </Head>
      <main>
        <h1>Search Page</h1>
        <Alert>
          This page use <strong>client-side data fetching</strong> to show fresh data for every search. Requests are handled by our backend via <strong>API Routes</strong> 
        </Alert>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="search-input">
            <Form.Label>Search Query</Form.Label>
            <Form.Control
              name="searchQuery"
              placeholder="E.g. plitics, sports, ..."
            />
          </Form.Group>
          <Button type="submit" className="mb-3" disabled={searchResultLoading}>
            Search
          </Button>
        </Form>
        <div className="d-flex flex-column align-items-center">
          {searchResultLoading && <Spinner animation="border" />}
          {searchResultLoadingIsError && (
            <p>Something went wrong. Please try again later.</p>
          )}
          {searchResult?.length === 0 && (
            <p>Can not found anything. please search another query</p>
          )}
          {searchResult && <NewsArticleGrid articles={searchResult} />}
        </div>
      </main>
    </>
  );
}
