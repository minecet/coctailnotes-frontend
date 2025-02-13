import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


interface Cocktail {
    id: number;
    title?: string;
    difficulty?: string;
    portion?: string;
    time?: string;
    description?: string;
    image?: string;
    ingredients1?: string
    ingredients2?:  string
    ingredients3?:  string
    ingredients4?:  string
    ingredients5?:  string
    ingredients6?:  string
    ingredients7?:  string
    ingredients8?:  string
    ingredients9?:  string
    ingredients10?: string
    ingredients11?: string
    ingredients12?: string  
    Step1?: string
    Step2?: string
    Step3?: string
    Step4?: string
    Step5?: string
    Step6?: string
 
 }
 
const CocktailDetailsPage: React.FC = () => {
  const { cocktailId } = useParams<{ cocktailId: string }>(); // Type plantId as a string
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const id = Number(cocktailId); 
  useEffect(() => {
    console.log("Navigated to cocktail details page with ID:", cocktailId);
    const fetchCocktailDetails = async (): Promise<void> => {
      try {
        console.log("Sending request to:", `${import.meta.env.VITE_API_URL}/api/cocktails/${id}`);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/cocktails/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch cocktail details");
        }
        const data = await response.json();
        console.log("Cocktail details:", data);
        setCocktail(data);
      } catch (err) {
        console.error("Error fetching cocktail details:", err);
        setError((err as Error).message);
      }
    };
  
    if (cocktailId) {
      fetchCocktailDetails();
    }
  }, [cocktailId]);
  

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!cocktail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-content">
      <h1 className="h1">{cocktail?.title}</h1>
      <img
        src={cocktail?.image || "/placeholder.jpg"}
        className="plant-image"
      />
      <p>
        <strong>Description:</strong> {cocktail?.description || "Unknown"}
      </p>

    </div>
  );
};

export default CocktailDetailsPage;
