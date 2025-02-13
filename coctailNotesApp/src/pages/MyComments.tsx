import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import { Title, Text, Card, Loader } from "@mantine/core";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  cocktailTitle: string;
  cocktailId: string;
}

const MyComments: React.FC = () => {
  const sessionContext = useContext(SessionContext);
  const navigate = useNavigate();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  if (!sessionContext) {
    throw new Error("MyComments must be used within a SessionContextProvider");
  }

  const { user } = sessionContext;

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/notes/user/${user?.id}`);
      if (response.ok) {
        const data = await response.json();
        setComments(Array.isArray(data) ? data : []);
      } else {
        setComments([]);
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchComments();
    }
  }, [user?.id]);

  if (loading) return <Loader />;

  const handleCommentClick = (cocktailId: string) => {
    navigate(`/cocktails/${cocktailId}`);
  };

  return (
    <div>
      <Title order={2}>My Comments</Title>
      {comments.length === 0 ? (
        <Text>No comments found.</Text>
      ) : (
        comments.map((comment) => (
          <Card
            key={comment.id}
            shadow="sm"
            padding="lg"
            mb="md"
            onClick={() => handleCommentClick(comment.cocktailId)}
            style={{ cursor: "pointer" }}
          >
            <Text size="sm">
              <strong>{comment.cocktailTitle}:</strong> {comment.content}
            </Text>
            <Text size="xs" color="gray">
              Posted on: {new Date(comment.createdAt).toLocaleString()}
            </Text>
          </Card>
        ))
      )}
    </div>
  );
};

export default MyComments;
