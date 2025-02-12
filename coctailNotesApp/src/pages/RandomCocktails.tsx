import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./RandomCocktails.module.css"; // Import styles

// Define the expected structure of a plant object
interface Cocktail {
   id: string;
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

const RandomCocktails: React.FC = () => {
  const navigate = useNavigate();
  const [cocktails, setCocktails] = useState<Cocktail[]>([]); // Typed as an array of `Plant`

  // Navigating to a plant details page
  const handleCocktailClick = (cocktailId: string) => {
    navigate(`/coctails/${cocktailId}`);
  };

  // Function to fetch random plants
  const fetchRandomCocktails = async (): Promise<void> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cocktails/random?limit=5`
      ); // Assuming this endpoint exists

      if (!response.ok) {
        throw new Error("Failed to fetch plants");
      }

      const data: Cocktail[] = await response.json(); // Ensure response matches the `Plant[]` type
      setCocktails(data);
    } catch (error) {
      console.error("Error fetching random cocktails:", error);
    }
  };

  // Fetch 20 plants on mount
  useEffect(() => {
    fetchRandomCocktails();
  }, []);

  return (
    <>
        <div className={classes.grid}>
          {cocktails.map((cocktail) => (
            <div
              key={cocktail.id}
              className={classes.card}
              onClick={() => handleCocktailClick(cocktail.id)}
            >
              <img
                src={cocktail.image}
                alt={cocktail.title}
                className={classes.image}
              />
              <p>{cocktail.title}</p>
            </div>
          ))}
        </div>
        <button className="middle-btn" onClick={fetchRandomCocktails}>
          Refresh
        </button>
    </>
  );
};

export default RandomCocktails;
