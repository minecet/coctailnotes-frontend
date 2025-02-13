import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { SessionContext } from '../contexts/SessionContext';
import NotesComponent from '../components/NotesComponent';
import { Textarea, Button, Card, Text, Group, Title, Loader } from '@mantine/core';

interface Cocktail {
  id: number;
  title?: string;
  description?: string;
  image?: string;
}

const CocktailDetailsPage: React.FC = () => {
  const { cocktailId } = useParams<{ cocktailId: string }>();
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const [error, setError] = useState<string | null>(null);
  
const id = Number(cocktailId)
  useEffect(() => {
    const fetchCocktailDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cocktails/${id}`);
        if (!response.ok) throw new Error('Failed to fetch cocktail details');
        const data = await response.json();
        setCocktail(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };
    if (cocktailId) fetchCocktailDetails();
  }, [cocktailId]);

  if (error) return <div>Error: {error}</div>;
  if (!cocktail) return <Loader />;

  return (
    <div>
      <Title order={2}>{cocktail.title}</Title>
      <img src={cocktail.image || '/placeholder.jpg'} alt={cocktail.title} style={{ width: '300px' }} />
      <Text size="sm">{cocktail.description}</Text>

      {/* Integrate Notes Component */}
      <NotesComponent />
    </div>
  );
};

export default CocktailDetailsPage;
