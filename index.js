function watchForm (){
    $("form").submit(event => {
        event.preventDefault();
        const username = $("#github-handle").val();
        $("#github-handle").val("");
        getRepos(username)
    })};

function getRepos(username){
        fetch("https://api.github.com/users/"+ username + "/repos")
        .then(response => {
            if (response.ok) {
                return response.json();
            } throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson, username))
        .catch(err => {
            alert("Sorry, that didn't work.")
        })
}

function displayResults(responseJson, username){
  displayTitle(username);
  $(".display-repos").empty();
    for(i = 0; i < responseJson.length; i++){
      $(".display-repos").append(`<a class="repo-display" href="${responseJson[i].html_url}" target="_blank">${responseJson[i].name}</a>`);
    }
}

function displayTitle(username){
  $(".username").empty();
  $(".repos-title").show();
  $(".username").append(username);
}

watchForm();
