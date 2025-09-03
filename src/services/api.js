async function getInfo(foodName) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
    const data = await res.json()
    return data.meals
}
