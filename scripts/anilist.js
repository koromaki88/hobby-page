async function fetchAnilistData() {
    const query = `
    {
        User(name: "Chipperonio") {
            id
            name
            avatar {
                large
            }
            statistics {
                anime {
                    count
                    meanScore
                    minutesWatched
                }
            }
        }
    }
    `;

    try {
        const response = await fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query
            })
        });

        const data = await response.json();

        if (data.errors) {
            console.error("Anilist API Errors:", data.errors);
            document.getElementById('anilist-data').innerHTML = '<p>Error: $(data.errors[0].message)</p>';
            return;
        }

        if (!data.data.User) {
            console.error("User not found");
            document.getElementById('anilist-data').innerHTML = '<p>User not found</p>';
            return;
        }

        displayAnilistData(data.data.User);
    } catch (error) {
        console.error("Fetch Error:", error);
        document.getElementById('anilist-data').innerHTML = '<p>Failed to fetch data</p>';
    }
}

function displayAnilistData(user) {
    const anilistDataDiv = document.getElementById('anilist-data');
    anilistDataDiv.innerHTML = `
        <h3>${user.name}</h3>
        <img src="${user.avatar.large}" alt="${user.name}" width="100">
        <p>Anime Count: ${user.statistics.anime.count}</p>
        <p>Mean Score: ${user.statistics.anime.meanScore}</p>
        <p>Minutes Watched: ${user.statistics.anime.minutesWatched}</p>
    `;
}

fetchAnilistData();
