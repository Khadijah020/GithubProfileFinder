const APIURL = "https://api.github.com/users/"
const main = document.querySelector("#main")
const searchBox = document.querySelector("#search")


const getUser = async (username) => {
    const response = await fetch(APIURL + username)

    //If no user found (Task given at the end of the video)
    if (response.ok == false) {
        console.log("just checking")
        const element = `<div class="card">
        <div>
            <img class="avatar" src="" alt="">
        </div>
        <div class="user-info">
            <h2>User Not Found!</h2>
        </div>
    </div>`
        main.innerHTML = element
        return
    }

    const data = await response.json()
    console.log(data)
    const card = `<div class="card">
            <div>
                <img class="avatar" src="${data.avatar_url}" alt="Florin Pop">
            </div>
            <div class="user-info">
                <h2>${data.name}</h2>
                <p>${data.bio}</p>

                <ul class="info">
                    <li>${data.followers}<strong>Followers</strong></li>
                    <li>${data.following}<strong>Following</strong></li>
                    <li>${data.public_repos}<strong>Repos</strong></li>
                </ul>

                <div id="repos">
                    
                </div>
            </div>
        </div>`

    main.innerHTML = card
    getRepos(username)
}

//getUser("Khadijah020")

const getRepos = async (username) => {
    const repos = document.querySelector("#repos")
    const response = await fetch(APIURL + username + "/repos")
    const data = await response.json()
    data.forEach((element) => {
        const item = document.createElement("a")
        item.classList.add("repo")
        item.href = element.html_url
        item.innerText = element.name
        item.target = "_blank"
        repos.appendChild(item)
    });
}

const formSubmit = () => {
    if (searchBox.value != '') {
        getUser(searchBox.value)
        searchBox.value = ''
    }

    return false
}

searchBox.addEventListener(
    "focusout", function () {
        formSubmit()
    }
)

// <a class="repo" href="#" target="_blank">${data.}</a>
//                     <a class="repo" href="#" target="_blank">Repo 2</a>
//                     <a class="repo" href="#" target="_blank">Repo 3</a>