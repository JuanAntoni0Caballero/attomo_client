
const fetchGames = () => {
    return fetch('http://localhost:5005/api/games/getAllGames')
        .then(response => response.json())

}

export default async function Games() {
    const Games = await fetchGames()
    return (
        <section>
            {Games.map(game => (
                <article key={game.id}>
                    <h2>{game.name}</h2>
                    <p>{game.category}</p>
                </article>
            ))}
        </section>
    )
}