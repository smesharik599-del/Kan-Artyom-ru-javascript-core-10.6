
const autocompleteList = document.querySelector('#autocomplete-list');
const repositoriesList = document.querySelector('#repositories-list');
const searchStatus = document.querySelector('#search-status');
const emptyMessage = document.querySelector('#empty-message');
const searchInput = document.querySelector('#search-input');


async function searchRepositories() {
    const query = searchInput.value;
    if (query.trim() === '') {
        autocompleteList.replaceChildren();
        return;
    }
    const url = `https://api.github.com/search/repositories?q=${query}`;
    const response = await fetch(url);
    const data = await response.json();
    const repositories = data.items;

    renderAutocomplete(repositories);
    console.log(data.items);
}

let timer;

searchInput.addEventListener('input', () => {
    clearTimeout(timer);

    timer = setTimeout(() => {
        searchRepositories();
    }, 500);
});


function renderAutocomplete(repositories) {
    autocompleteList.replaceChildren();

    repositories.slice(0, 5).forEach((repository) => {
        const li = document.createElement('li');
        li.textContent = repository.name;
        autocompleteList.appendChild(li);
        li.addEventListener('click', () => {
          const repositoryItem = document.createElement('li');
          repositoryItem.textContent = `${repository.name} 
           ${repository.owner.login} 
           ⭐ ${repository.stargazers_count} stars`;
          repositoriesList.appendChild(repositoryItem);
          searchInput.value = '';
          autocompleteList.replaceChildren();
          const removeButton = document.createElement('button');
            removeButton.textContent = 'Удалить';
            removeButton.classList.add('remove-button');
            removeButton.addEventListener('click', () => {
                repositoriesList.removeChild(repositoryItem);
            });
            repositoryItem.appendChild(removeButton);
        });
    });

}


