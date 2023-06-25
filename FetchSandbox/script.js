gettext.addEventListener("click", printtext)
getjson.addEventListener("click", printjson)
document.getElementById("getpost").addEventListener("click", printpost)
document.getElementById("submit").addEventListener("click", addpost)
const output=document.getElementById('output')
function printtext() {
    output.style.display = "block";
    fetch("sample.txt")
        .then((res) => res.text())
        .then((res) => output.innerHTML = res)
        .catch((err)=>output.innerHTML=err)
}

function printjson() {
    output.style.display = "block";
    fetch("users.json")
        .then((res) => res.json())
        .then((data) => {
            let content = '<h1 class="text-center"> Users </h1>'
            data.forEach(users => {
                content += `<ul class="list-group mb-3">
                <li class="list-group-item"> id: ${users.id} </li>
                <li class="list-group-item"> name: ${users.name} </li>
                <li class="list-group-item"> email: ${users.email} </li>
                </ul>`
                output.innerHTML=content
            })
        })
    .catch((err)=>output.innerHTML=err)
}

function printpost() {
    output.style.display = "block";
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then((data) => {
                let content=' <h2 class="text-center">POSTS</h2> '
                data.forEach(users => {
                    content+=`<div class="card card-body mb-3"><h3>  ${users.title} </h3> <p>   ${users.body}</p></div>`
                })
                output.innerHTML=content
            })
        .catch((err) => output.innerHTML = err)
   
}
function addpost(e) {
    e.preventDefault();
    let title = document.getElementById('title');
    let body = document.getElementById('body');
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-type": "application/json"
        },
        body: JSON.stringify({ title: title.value, body: body.value })
    })
            .then((res) => res.json())
        .then(data => {
            let content = '<h1 class="text-center"> Added Post </h1>'
                content += `<ul class="list-group mb-3">
                <li class="list-group-item"> Id: ${data.id} </li>
                <li class="list-group-item"> Title: ${data.title} </li>
                <li class="list-group-item"> Body: ${data.body} </li>
                </ul>`
                output.innerHTML = content
        })
    output.style.display = "block";
    title.value = "";
    body.value = "";
    
}


