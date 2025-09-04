import { Link, useParams } from 'react-router-dom';
import './RecipiePage.css';
import { useEffect, useState } from 'react';

const RecipiePage = () => {
  const date = new Date().getFullYear();
  const [recipesToMap, setRecipesToMap] = useState([]);
  const [recipe, setRecipe] = useState(['Hellos']);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    console.log("Hey i guess you're an Engineer 😎");
    console.log('contact me at :');
    console.log('adoolslimitless@gmail.com');

    async function getInfo() {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();
        setRecipe(data.meals);
        setErr(false);
        setRecipesToMap(data.meals || []);
      } catch (error) {
        setErr(true);
        console.error('Error fetching data:', error);
      } finally {
        setErr(false);
        setLoading(false);
      }
    }
    getInfo();
  }, []);

  const arrOfStuff = [
    { Ingredient: recipe[0].strIngredient1, Measure: recipe[0].strMeasure1 },
    { Ingredient: recipe[0].strIngredient2, Measure: recipe[0].strMeasure2 },
    { Ingredient: recipe[0].strIngredient3, Measure: recipe[0].strMeasure3 },
    { Ingredient: recipe[0].strIngredient4, Measure: recipe[0].strMeasure4 },
    { Ingredient: recipe[0].strIngredient5, Measure: recipe[0].strMeasure5 },
    { Ingredient: recipe[0].strIngredient6, Measure: recipe[0].strMeasure6 },
    { Ingredient: recipe[0].strIngredient7, Measure: recipe[0].strMeasure7 },
    { Ingredient: recipe[0].strIngredient8, Measure: recipe[0].strMeasure8 },
    { Ingredient: recipe[0].strIngredient9, Measure: recipe[0].strMeasure9 },
    { Ingredient: recipe[0].strIngredient10, Measure: recipe[0].strMeasure10 },
    { Ingredient: recipe[0].strIngredient11, Measure: recipe[0].strMeasure11 },
    { Ingredient: recipe[0].strIngredient12, Measure: recipe[0].strMeasure12 },
    { Ingredient: recipe[0].strIngredient13, Measure: recipe[0].strMeasure13 },
    { Ingredient: recipe[0].strIngredient14, Measure: recipe[0].strMeasure14 },
    { Ingredient: recipe[0].strIngredient15, Measure: recipe[0].strMeasure15 },
    { Ingredient: recipe[0].strIngredient16, Measure: recipe[0].strMeasure16 },
    { Ingredient: recipe[0].strIngredient17, Measure: recipe[0].strMeasure17 },
    { Ingredient: recipe[0].strIngredient18, Measure: recipe[0].strMeasure18 },
    { Ingredient: recipe[0].strIngredient19, Measure: recipe[0].strMeasure19 },
    { Ingredient: recipe[0].strIngredient20, Measure: recipe[0].strMeasure20 },
  ];
  return (
    <>
      <nav>
        <div className="logo">Reccypi</div>
      </nav>
      <div className="recipe-container">
        <div className="recipe-header">
          <h1 className="recipe-title">{recipe[0].strMeal}</h1>
          <p className="recipe-category">Category: {recipe[0].strCategory}</p>
        </div>

        {loading && <p>Loading recipes...</p>}
        {!loading && recipe.length === 0 ? (
          <p>No recipes found 😢</p>
        ) : (
          <div>
            <div className="recipe-image">
              <img src={recipe[0].strMealThumb} alt={recipe[0].strMeal} />
            </div>

            <div className="recipe-info">
              <h2>Ingredients</h2>
              <ul className="ingredients-list">
                {arrOfStuff.map((item) => {
                  return (
                    item.Ingredient && (
                      <li>{`${item.Ingredient} - ${item.Measure}`}</li>
                    )
                  );
                })}
              </ul>
            </div>

            <div className="recipe-instructions">
              <h2>Instructions</h2>
              <p>{recipe[0].strInstructions}</p>
            </div>

            <Link to="/" className="back-button">
              ← Back
            </Link>
          </div>
        )}
      </div>

      <footer>&copy; 2025 Reccypi | Made with 💙 by Adools</footer>
    </>
  );
};

export default RecipiePage;
