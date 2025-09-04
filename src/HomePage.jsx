import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './HomePage.css';

const HomePage = () => {
  const date = new Date().getFullYear();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [err, setErr] = useState(false);

  useEffect(() => {
    async function getInfoOnMount(foodName) {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`
        );
        const data = await res.json();
        setErr(false);
        setRecipes(data.meals || []);
      } catch (error) {
        setErr(true);
        console.error('Error fetching data:', error);
      } finally {
        setErr(false);
        setLoading(false);
      }
    }
    getInfoOnMount('');
  }, []);

  async function getInfo(foodName) {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`
      );
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <nav>
        <div className="logo">Reccypi</div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getInfo(inputValue);
          }}
          action=""
        >
          <input
            type="text"
            placeholder="Search recipes..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>
      </nav>

      <section className="recipes">
        {loading && <p>Loading recipes...</p>}
        {!loading && recipes.length === 0 && <p>No recipes found 😢</p>}
        {recipes.map((meal) => (
          <div key={meal.idMeal} className="card">
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <div className="card-body">
              <h3>{meal.strMeal}</h3>
              <p>
                {meal.strCategory} - {meal.strArea}
              </p>
              <Link to={`/Reccypi/recipie/${meal.idMeal}`} className="btn">
                View Recipe
              </Link>
            </div>
          </div>
        ))}
      </section>

      <footer>&copy; {date} Reccypi | Made with 💙 by Adools</footer>
    </>
  );
};

export default HomePage;
