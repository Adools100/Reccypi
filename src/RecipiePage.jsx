import { Link, useParams } from 'react-router-dom';
import './RecipiePage.css';
import { useEffect, useState } from 'react';
import Loader from './components/Loader'; // Import your Loader component

const RecipiePage = () => {
  const date = new Date().getFullYear();
  const [recipesToMap, setRecipesToMap] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [haserr, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState('');

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
        setErrMessage(error.message);
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    getInfo();
  }, [id]);

  // Show full screen loader while loading
  if (loading) {
    return <Loader />;
  }

  // Handle error state
  if (haserr || !recipe || recipe.length === 0) {
    return (
      <>
        <nav>
          <div className="logo">Reccypi</div>
        </nav>
        <div className="recipe-container">
          <div className="error-state">
            <h2>Recipe Not Found 😢</h2>
            <p>Sorry, we couldn't find the recipe you're looking for.</p>
            <Link to="/Reccypi" className="back-button">
              ← Back
            </Link>
          </div>
        </div>
        <footer>&copy; {date} Reccypi | Made with 💙 by Adools</footer>
      </>
    );
  }

  // Create ingredients array safely
  const arrOfStuff = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[0][`strIngredient${i}`];
    const measure = recipe[0][`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      arrOfStuff.push({
        Ingredient: ingredient,
        Measure: measure || '',
      });
    }
  }

  return (
    <>
      <nav>
        <div className="logo">Reccypi</div>
      </nav>
      <div className="recipe-container">
        <div className="recipe-header">
          <h1 className="recipe-title">{recipe[0].strMeal}</h1>
          <p className="recipe-category">
            Category: {recipe[0].strCategory} • {recipe[0].strArea}
          </p>
        </div>

        <div className="recipe-image">
          <img src={recipe[0].strMealThumb} alt={recipe[0].strMeal} />
        </div>

        <div className="recipe-info">
          <h2>Ingredients</h2>
          <ul className="ingredients-list">
            {arrOfStuff.map((item, index) => (
              <li key={index}>
                <span className="ingredient-name">{item.Ingredient} </span>
                {item.Measure && (
                  <span className="ingredient-measure"> - {item.Measure}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="recipe-instructions">
          <h2>Instructions</h2>
          <div className="instructions-content">
            {recipe[0].strInstructions
              .split('\n')
              .map(
                (paragraph, index) =>
                  paragraph.trim() && <p key={index}>{paragraph}</p>
              )}
          </div>
        </div>

        {recipe[0].strYoutube && (
          <div className="recipe-video">
            <a
              href={recipe[0].strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="video-link"
            >
              Watch on YouTube 📺
            </a>
          </div>
        )}

        <Link to="/Reccypi" className="back-button">
          ← Back
        </Link>
      </div>
      <footer>&copy; {date} Reccypi | Made with 💙 by Adools</footer>
    </>
  );
};

export default RecipiePage;
