import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotesComponent from '../components/NotesComponent';
import { Text, Title, Loader, List } from '@mantine/core';

interface Cocktail {
  id: number;
  title?: string;
  difficulty?: string;
  portion?: string;
  time?: string;
  description?: string;
  image?: string;
  ingredients1?: string;
  ingredients2?: string;
  ingredients3?: string;
  ingredients4?: string;
  ingredients5?: string;
  ingredients6?: string;
  ingredients7?: string;
  ingredients8?: string;
  ingredients9?: string;
  ingredients10?: string;
  ingredients11?: string;
  ingredients12?: string;
  Step1?: string;
  Step2?: string;
  Step3?: string;
  Step4?: string;
  Step5?: string;
  Step6?: string;
}

const CocktailDetailsPage: React.FC = () => {
  const { cocktailId } = useParams<{ cocktailId: string }>();
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCocktailDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cocktails/${cocktailId}`);
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
      <Text size="sm">Difficulty: {cocktail.difficulty}</Text>
      <Text size="sm">Portion: {cocktail.portion}</Text>
      <Text size="sm">Time: {cocktail.time}</Text>
      <Title order={4}>Ingredients</Title>
      <List>
        {[...Array(12).keys()].map(i => {
          const ingredient = cocktail[`ingredients${i + 1}` as keyof Cocktail];
          return ingredient ? <List.Item key={i}>{ingredient}</List.Item> : null;
        })}
      </List>
      <Title order={4}>Steps</Title>
      <List>
        {[...Array(6).keys()].map(i => {
          const step = cocktail[`Step${i + 1}` as keyof Cocktail];
          return step ? <List.Item key={i}>{step}</List.Item> : null;
        })}
      </List>
      {/* Integrate Notes Component */}
      <NotesComponent />
    </div>
  );
};

export default CocktailDetailsPage;
