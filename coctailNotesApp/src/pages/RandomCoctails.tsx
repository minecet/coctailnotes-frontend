// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import PlantDiseaseCarousel from "../components/PlantDiseaseCarousel";

// const RandomPlantsPage = () => {
//   const navigate = useNavigate();
//   const [plants, setPlants] = useState([]); // Random plants for homepage

//   //navigating to a plant details page
//   const handlePlantClick = (plantId) => {
//     navigate(`/plants/${plantId}`);
//   };

//   //function to fetch the plants:
//   const fetchRandomPlants = async () => {
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_API_URL}/api/plants/random?limit=20`
//       ); // Assuming this endpoint exists
//       if (!response.ok) throw new Error("Failed to fetch plants");
//       const data = await response.json();
//       setPlants(data);
//     } catch (error) {
//       console.error("Error fetching random plants:", error);
//     }
//   };

//   //getting 20 on mounting
//   useEffect(() => {
//     fetchRandomPlants();
//   }, []);

//   return (
//     <>
//       <div>
//         <h1 className="h1">Discover Popular Plants and Diseases</h1>
//         <PlantDiseaseCarousel />
//       </div>
//       <div className="random-plants">
//         <h2 className="h2">Random Plants and Facts</h2>
//         <div className="plant-grid">
//           {plants.map((plant) => (
//             <div
//               key={plant._id}
//               className="plant-card"
//               onClick={() => handlePlantClick(plant._id)}
//             >
//               <img
//                 src={plant.default_image?.thumbnail || "/placeholder.jpg"}
//                 alt={plant.common_name || "Plant"}
//                 className="plant-image"
//               />
//               <p>{plant.common_name || plant.scientific_name}</p>
//               <p>
//                 {plant.watering === "Average"
//                   ? "💧💧"
//                   : plant.watering === "Frequent"
//                     ? "💧💧💧"
//                     : plant.watering === "Minimum"
//                       ? "💧"
//                       : null}
//               </p>
//             </div>
//           ))}
//         </div>
//         <button className="middle-btn" onClick={fetchRandomPlants}>
//           Refresh
//         </button>
//       </div>
//     </>
//   );
// };

// export default RandomPlantsPage;
