// Get the GitHub username input form
const gitHubForm = document.getElementById('gitHubForm');

// Listen for submissions on GitHub username input form
gitHubForm.addEventListener('submit', (e) => {

    // Prevent default form submission action
    e.preventDefault();

    // Get the GitHub username input field on the DOM
    let usernameInput = document.getElementById('usernameInput');
    let  repoInput = document.getElementById('repoInput');

    // Get the value of the GitHub username input field
    let gitHubUsername = usernameInput.value;
    let gitHubRepo = repoInput.value;

    // Run GitHub API function, passing in the GitHub username
    requestRepoCommits(gitHubUsername, gitHubRepo)
        .then(response => response.json()) // parse response into json
        .then(data => {
            // update html with data from github
            for (let i in data) {
                // Get the ul with id of userRepos

                if (data.message === "Not Found") {
                    let ul = document.getElementById('userRepos');

                    // Create variable that will create li's to be added to ul
                    let li = document.createElement('li');

                    // Add Bootstrap list item class to each li
                    li.classList.add('list-group-item')
                    // Create the html markup for each li
                    li.innerHTML = (`
                <p>${gitHubUsername}/${gitHubRepo} <strong>Não existe!</strong></p>`);
                    // Append each li to the ul
                    ul.appendChild(li);
                } else {

                    let ul = document.getElementById('userRepos');

                    // Create variable that will create li's to be added to ul
                    let li = document.createElement('li');

                    // Add Bootstrap list item class to each li
                    li.classList.add('list-group-item')

                    // Create the html markup for each li
                    li.innerHTML = (`
                <p><strong>Autor:</strong> ${data[i].commit.author.name}</p>
                <p><strong>Mensagem:</strong> ${data[i].commit.message}</p>
                <p><strong>Data:</strong> ${data[i].commit.author.date}</p>
            `);

                    // Append each li to the ul
                    ul.appendChild(li);
                }
            }
        })
})

function requestUserRepos(username) {
    // create a variable to hold the `Promise` returned from `fetch`
    return Promise.resolve(fetch(`https://api.github.com/users/${username}/repos`));
}

function requestRepoCommits(username, repo){
    // create a variable to hold the `Promise` returned from `fetch`
    return Promise.resolve(fetch(`https://api.github.com/repos/${username}/${repo}/commits`));
    
}