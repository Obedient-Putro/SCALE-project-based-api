window.onload = () => {
    renderQuotes();
    renderWorkspaceList()
};

async function fetchQuotes() {
    const Data = [];
    try {
        const response = await fetch('https://goquotes-api.herokuapp.com/api/v1/random?count=1');
        const quotesFill = await response.json();
        Data[0] = quotesFill.quotes[0].text;
        Data[1] = quotesFill.quotes[0].author;
        Data[2] = quotesFill.quotes[0].tag;
    } catch (error) {
        console.error(error);
    }
    return Data;
}

async function renderQuotes() {
    getData = await fetchQuotes();
    const putQuotes = document.querySelector('#quotes');
    putQuotes.innerHTML = getData[0];
    const putAuthorTag = document.querySelector('#quotesFrom');
    putAuthorTag.innerHTML = "-" + getData[1] + " | #" + getData[2];
}

const changeQuote = document.querySelector('#quoteBtn');
changeQuote.addEventListener('click', async () => {
    await renderQuotes();
});

const getLogout = document.querySelector('#logoutBtn');
getLogout.addEventListener('click', async () => {
    try {
        await axios.delete(`${BASE_URL}/api/logout`, {withCredentials: true});
        window.location = `${BASE_URL}/${NEXT_PATH}`;
    } catch (error) {
        console.log(error);
    }
});

const refreshToken = async () => {
    let dataToken;
    try {
        const res = await axios.get(`${BASE_URL}/api/token`, {withCredentials: true});
        dataToken = res.data.accessToken;
    } catch (error) {
        console.log(error);
    }
    return dataToken;
};

const addWorkspace = document.querySelector('#addBtn');
addWorkspace.addEventListener('click', function() {
    document.querySelector(".add-popup").classList.add("activate");
});
document.querySelector('.add-popup .close-btn').addEventListener("click", function(){
    document.querySelector(".add-popup").classList.remove("activate");
});
const renderWorkspace = document.querySelector("#addWorkspaceForm");
renderWorkspace.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    const workspaceName = renderWorkspace.WorkspaceName.value;
    const apiToken = await refreshToken();
    const AuthStr = 'Bearer '.concat(apiToken);
    let getList;

    await axios.post(`${BASE_URL}/api/workspace/add`, {wsName: workspaceName}, { 
        headers: { Authorization: AuthStr }
    })
    .then(response => {
        getList = response.data;
    })
    .catch((error) => {
        console.log('error ' + error);
    });
    
    //Workspace Div
    const wsList = document.querySelector('.workspace-list');
    const divWS = document.createElement('div');
    divWS.className = "workspace";
    divWS.id = getList[0].id;
    wsList.appendChild(divWS);

    //Left Side Div
    const leftSide = document.createElement('div');
    leftSide.className = "left-side";
    leftSide.id = getList[0].workspacePath;
    leftSide.innerHTML = '<p>' + getList[0].workspaceName + '</p>' + '<p> Created:' + getList[0].createdAt + '</p>';
    divWS.appendChild(leftSide);

    //Right Side Div
    const rightSide = document.createElement('div');
    rightSide.className = "right-side";
    divWS.appendChild(rightSide);
    //Edit Button
    const editBtn = document.createElement('button');
    editBtn.className = "workspace-btn";
    editBtn.id = "editBtn";
    editBtn.addEventListener('click', function handleClick(){
        editWorkspace(this.parentNode.parentNode);
    });
    rightSide.appendChild(editBtn);
    const editIcon = document.createElement('i');
    editIcon.className = "fa-solid fa-pen-to-square";
    editBtn.appendChild(editIcon)
    //Remove Button
    const removeBtn = document.createElement('button');
    removeBtn.className = "workspace-btn";
    removeBtn.id = "removeBtn";
    removeBtn.addEventListener('click', function handleClick(){
        deleteWorkspace(this.parentNode.parentNode);
    });
    rightSide.appendChild(removeBtn);
    const removeIcon = document.createElement('i');
    removeIcon.className = "fa-solid fa-trash";
    removeBtn.appendChild(removeIcon)

    document.body.appendChild(wsList);

    document.querySelector(".add-popup").classList.remove("activate");
    renderWorkspace.WorkspaceName.value ="";
});

const renderWorkspaceList = async () => {
    const getEmail = document.querySelector('.userInfo').value;
    const apiToken = await refreshToken();
    const AuthStr = 'Bearer '.concat(apiToken);
    let getList;
    await axios.get(`${BASE_URL}/api/workspace/list`, { 
        headers: { Authorization: AuthStr }
    })
    .then(response => {
        getList = response.data;
    })
    .catch((error) => {
        console.log('error ' + error);
    });
    
    getList.forEach(element => {        
        //Workspace Div
        const wsList = document.querySelector('.workspace-list');
        const divWS = document.createElement('div');
        divWS.className = "workspace";
        divWS.id = element.id;
        wsList.appendChild(divWS);

        //Left Side Div
        const leftSide = document.createElement('div');
        leftSide.className = "left-side";
        leftSide.id = element.workspacePath;
        leftSide.innerHTML = '<p>' + element.workspaceName + '</p>' + '<p> Created:' + element.createdAt + '</p>';
        divWS.appendChild(leftSide);

        //Right Side Div
        const rightSide = document.createElement('div');
        rightSide.className = "right-side";
        divWS.appendChild(rightSide);
        //Edit Button
        const editBtn = document.createElement('button');
        editBtn.className = "workspace-btn";
        editBtn.id = "editBtn";
        editBtn.addEventListener('click', function handleClick(){
            editWorkspace(this.parentNode.parentNode);
        });
        rightSide.appendChild(editBtn);
        const editIcon = document.createElement('i');
        editIcon.className = "fa-solid fa-pen-to-square";
        editBtn.appendChild(editIcon)
        //Remove Button
        const removeBtn = document.createElement('button');
        removeBtn.className = "workspace-btn";
        removeBtn.id = "removeBtn";
        removeBtn.addEventListener('click', function handleClick(){
            deleteWorkspace(this.parentNode.parentNode);
        });
        rightSide.appendChild(removeBtn);
        const removeIcon = document.createElement('i');
        removeIcon.className = "fa-solid fa-trash";
        removeBtn.appendChild(removeIcon)

        document.body.appendChild(wsList);
    });


};

const deleteWorkspace = async (data) => {
    const filePath = data.firstChild.id;
    const wsID = data.id;
    const wsName = data.firstChild.firstChild.innerHTML;

    let text = "Are you sure want to delete " + wsName + "?";
    if (confirm(text) == true) {
        const apiToken = await refreshToken();
        const AuthStr = 'Bearer '.concat(apiToken);

        await axios.delete(`${BASE_URL}/api/workspace/delete?id=${wsID}&filePath=${filePath}`, { 
            headers: { Authorization: AuthStr }
        })
        .then(response => {
            console.log(response);
        })
        .catch((error) => {
            console.log('error ' + error);
        });

        const element = document.getElementById(wsID);
        element.remove();
    } else {
        return;
    }    
};

const editWorkspace = async (data) => {
    const filePath = data.firstChild.id;
    const userId = document.querySelector('.userInfo').id;

    const apiToken = await refreshToken();
    const AuthStr = 'Bearer '.concat(apiToken);
    await axios.get(`${BASE_URL}/workspace?id=${userId}&edit=${filePath}`, { 
        headers: { Authorization: AuthStr }
    })
    .then(()=> {
        window.location = `${BASE_URL}/workspace?id=${userId}&edit=${filePath}`;
    })
    .catch((error) => {
        console.log('error ' + error);
    });
};












