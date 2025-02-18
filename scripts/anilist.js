function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function displayUserStats(user) {
    const anilistDataDiv = document.getElementById('anilist-data');
    anilistDataDiv.innerHTML = `
        <h3>${user.name}</h3>
        <img src="${user.avatar.large}" alt="${user.name}" width="100">
        <p>Anime Count: ${user.statistics.anime.count}</p>
        <p>Mean Score: ${user.statistics.anime.meanScore}</p>
        <p>Minutes Watched: ${user.statistics.anime.minutesWatched}</p>
    `;
}

function displayRecentActivity(activities) {
    const timelineDiv = document.createElement('div');
    timelineDiv.className = 'timeline';

    activities.forEach(activity => {
        const activityDiv = document.createElement('div');
        activityDiv.className = 'timeline-item';

        const date = new Date(activity.createdAt * 1000).toLocaleDateString();

        if (activity.__typename === 'ListActivity') {
            activityDiv.innerHTML = `
                <img src="${activity.media.coverImage.large}" alt="${activity.media.title.romaji}" class="cover-image">
                <div class="details">
                    <h3>${activity.media.title.romaji}</h3>
                    <p>${capitalizeFirstLetter(activity.status)}${activity.progress ? ` ${activity.progress}` : ''}</p>
                    <p>Date: ${date}</p>
                </div>
            `;
        } else if (activity.__typename === 'TextActivity') {
            activityDiv.innerHTML = `
                <div class="details">
                    <p>${activity.text}</p>
                    <p>Date: ${date}</p>
                </div>
            `;
        }

        timelineDiv.appendChild(activityDiv);
    });

    const anilistDataDiv = document.getElementById('anilist-data');
    anilistDataDiv.appendChild(timelineDiv);
}

async function fetchUserData(username) {
    const query = `
    query ($username: String) {
      User(name: $username) {
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
    }`;

    const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ query, variables: { username } })
    });

    const data = await response.json();

    if (data.errors) {
        console.error("Anilist API Errors:", data.errors);
        document.getElementById('anilist-data').innerHTML = `<p>Error: ${data.errors[0].message}</p>`;
        return null;
    }

    return data.data.User;
}


async function fetchRecentActivity(userId) {
    const query = `
    query ($userId: Int) {
      Page(page: 1, perPage: 10) {
        activities(userId: $userId, sort: ID_DESC) {
          __typename
          ... on ListActivity {
            id
            status
            progress
            createdAt
            media {
              id
              title {
                romaji
                english
                native
              }
              coverImage {
                large
              }
            }
          }
          ... on TextActivity {
            id
            text
            createdAt
          }
          ... on MessageActivity {
            id
            message
            createdAt
            recipient {
              id
              name
            }
          }
        }
      }
    }`;

    const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ query, variables: { userId } })
    });

    const data = await response.json();

    if (data.errors) {
        console.error("Anilist API Errors:", data.errors);
        document.getElementById('anilist-data').innerHTML = `<p>Error: ${data.errors[0].message}</p>`;
        return null;
    }

    return data.data.Page.activities;
}

async function fetchAnilistData() {
    const username = "Chipperonio";

    const user = await fetchUserData(username);
    if (!user) return;

    displayUserStats(user);

    const activities = await fetchRecentActivity(user.id);
    if (!activities) return;

    displayRecentActivity(activities);
}

fetchAnilistData();

