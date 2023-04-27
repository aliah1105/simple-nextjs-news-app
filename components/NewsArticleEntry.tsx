import { NewsArticle } from "@/models/NewsArticles";
import Image from "next/image";
import { Card } from "react-bootstrap";
import placeholderImage from '../assets/images/placeholder_image.png';
import styles from '@/styles/NewsArticleEntry.module.css';

interface NewsArticleEntryProps {
  article: NewsArticle;
}

const NewsArticleEntry = ({
  article: { title, description, url, urlToImage },
}: NewsArticleEntryProps) => {
  const validateImageUrl =
    urlToImage?.startsWith("http://") || urlToImage?.startsWith("https://")
      ? urlToImage
      : undefined;
  return (
    <a href={url}>
      <Card className="h-100">
        <Image 
        src={validateImageUrl || placeholderImage}
        width={500}
        height={200}
        alt="News article images"
        className={`card-img-top ${styles.image}`}
        />
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </a>
  );
};

export default NewsArticleEntry;
