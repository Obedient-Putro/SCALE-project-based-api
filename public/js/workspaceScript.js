/* --------------------------------- Popup Windows Close and Open handler ---------------------------------------*/
//Add Entry Popup Window
function openAddPopupWindow(){
    document.querySelector(".add-popup").classList.add("activate");
    getDataForAddRow(headerArray);
}
document.querySelector('.add-popup .close-btn').addEventListener("click", function(){
    document.querySelector(".add-popup").classList.remove("activate");
});

//Edit Entry Popup Window
function openEditPopupWindow(data){
    document.querySelector(".add-popup").classList.add("activate");
    editSelectedRow(data);
}
document.querySelector('.add-popup .close-btn').addEventListener("click", function(){
    document.querySelector(".add-popup").classList.remove("activate");
});

//Remove Column Popup Window
function RmvColumnPopupWindow(){
    document.querySelector(".rmvColumn-popup").classList.add("activate");
    getRmvColumnOptionData(headerArray);
}
document.querySelector('.rmvColumn-popup .close-btn').addEventListener("click", function(){
    document.querySelector(".rmvColumn-popup").classList.remove("activate");
});

//Rename Column Popup Window
function RenameColumnPopupWindow(){
    document.querySelector(".renameColumn-popup").classList.add("activate");
    getRenameColumnOptionData(headerArray);
}
document.querySelector('.renameColumn-popup .close-btn').addEventListener("click", function(){
    document.querySelector(".renameColumn-popup").classList.remove("activate");
});

//Add / Edit Column Popup Window
function AddColumnPopupWindow(){
    document.querySelector(".addColumn-popup").classList.add("activate");
}
document.querySelector('.addColumn-popup .close-btn').addEventListener("click", function(){
    document.querySelector(".addColumn-popup").classList.remove("activate");
});

//Remove Column Popup Window
function openGradeInformationPopup(){
    document.querySelector(".gradeInformation-popup").classList.add("activate");
}
document.querySelector('.gradeInformation-popup .close-btn').addEventListener("click", function(){
    document.querySelector(".gradeInformation-popup").classList.remove("activate");
});



/* ----------------------------------------- Function for Search Input ----------------------------------------- */
/* ----------------------------------------- Function for Search Input ----------------------------------------- */
/* ----------------------------------------- Function for Search Input ----------------------------------------- */
/* ----------------------------------------- Function for Search Input ----------------------------------------- */
/* ----------------------------------------- Function for Search Input ----------------------------------------- */
$('#search-input').on('keyup', function(){
    var value = $(this).val();
    var data = searchTable(value, markData);
    buildTable(data, headerArray);
});
function searchTable(value, data){
    var filteredData = [];

    for (var i = 0; i < data.length; i++){
        value = value.toLowerCase();
        var name = data[i].Name.toLowerCase();

        if (name.includes(value)) {
            filteredData.push(data[i]);
        }
    }

    return filteredData;
}




/* --------------------------------------- JSON INPUT / EDITED HANDLER ----------------------------------------- */
/* --------------------------------------- JSON INPUT / EDITED HANDLER ----------------------------------------- */
/* --------------------------------------- JSON INPUT / EDITED HANDLER ----------------------------------------- */
/* --------------------------------------- JSON INPUT / EDITED HANDLER ----------------------------------------- */
/* --------------------------------------- JSON INPUT / EDITED HANDLER ----------------------------------------- */
//Declare an Object Global Array
let headerArray = [];
let markData = [];
 
/* Call Fetich and Validation Function (Main Function) */
const addMarkData = (ev) => {
    ev.preventDefault();    //Menghindari Submit dari Input Button Form
    var getValidation = nameValidation();
    if (getValidation) {

        /* Fetching All Mark Grade, ID and Name Before Grading */
        let dataHeader = headerArray;
        var dataArray = [];
        for (var i = 1; i < dataHeader.length - 2; i++) {
            dataArray[i-1] = document.getElementById(dataHeader[i]).value;
        }

        var getGrade = countGrade.apply(this, dataArray);
        var getMark = grading(getGrade * 1);
        var getGradeDeccission = gradeDecission(getGrade * 1);
        let data = {};
        for (i = -1; i < dataHeader.length; i++){

            if (i == -1) {
                data.ID = Date.now();
            } else if (i == 0) {
                data.Name = document.getElementById('Name').value;

            } else if (i == (dataHeader.length -2) ) {
                data.Grade = getGrade + " (" + getMark + ")";

            } else if (i == (dataHeader.length -1) ) {
                data.Ket = getGradeDeccission;

            } else {
                data[dataHeader[i]] = dataArray[i-1];
            }
        }

        markData.push(data);
        document.forms[0].reset();

        //Display Output
        console.warn('added', {markData} );
        //let pre = document.querySelector('#msg pre');
        //pre.textContent = '\n' + JSON.stringify(markData, '\t', 2);
        document.querySelector("#popup").classList.remove("activate");

    } else {
        alert("Name entry must be filled out");

    }
};

/* Check if Name of Form is Empty */
function nameValidation() {
    var x = document.getElementById('Name').value;
    if (x == "") {
        return false;
    } else {
        return true;
    }
}



/* ------------------------------------------ UPDATE DATA GRADE ---------------------------------------------- */
/* ------------------------------------------ UPDATE DATA GRADE ---------------------------------------------- */
/* ------------------------------------------ UPDATE DATA GRADE ---------------------------------------------- */
/* ------------------------------------------ UPDATE DATA GRADE ---------------------------------------------- */
/* ------------------------------------------ UPDATE DATA GRADE ---------------------------------------------- */
/* Grading Mark Grade from Fetched Data */
function countGrade(...dataArray) {
    let sum = 0, sum2 = 0, z = 0, result;
    
    //Menghitung 50% Tugas 1 - 5
    for (i = 0; i < dataArray.length -2; i++) {
        sum+= Number(dataArray[i]);
        z++;
    }
    sum /= dataArray.length - 2;
    sum *= 50 / 100;

    //Menghitung 25% masing-masin UTS & UAS
    for (i = z; i < dataArray.length; i++){
        sum2 += (Number(dataArray[i]) * 25 / 100);
    }

    result = sum + sum2;
    return result.toFixed(2);
}

/* Grade Decission */
function grading(grade) {
    if(grade >= 80){
        return "A";
    }
    else if(grade >= 76.00 && grade <= 79.99){
        return "B+";
    }
    else if(grade >= 70.00 && grade <= 75.99){
        return "B";
    }
    else if(grade >= 65.00 && grade <=69.99){
        return "C+";
    }
    else if(grade >= 60.00 && grade <= 64.99){
        return "C";
    }
    else if(grade >= 50.00 && grade <= 59.99){
        return "D";
    } else {
        return "E";
    }

}
function gradeDecission(grade) {
    if(grade >= 60.00){
        return "Lulus";
    }
    else {
        return "Tidak Lulus";
    }
}

function updateGradeData() {
    markData.forEach(function(v){
        var dataArray = [];
        var count = 0;
        for (i = 0; i <= headerArray.length - 1; i++){

            if ( headerArray[i] != "Name" && headerArray[i] != "Grade" && headerArray[i] != "Ket"){
                dataArray[count] = v[headerArray[i]];
                count++;
            }

        }
        console.log(dataArray); 
        var getGrade = countGrade.apply(this, dataArray);
        var getMark = grading(getGrade * 1);
        var getGradeDeccission = gradeDecission(getGrade * 1);
        v.Grade = getGrade + " (" + getMark + ")";
        v.Ket = getGradeDeccission;
    });
}



/* ----------------------------------------- BUILDING TABLE IN CONTENT------------------------------------------ */
/* ----------------------------------------- BUILDING TABLE IN CONTENT------------------------------------------ */
/* ----------------------------------------- BUILDING TABLE IN CONTENT------------------------------------------ */
/* ----------------------------------------- BUILDING TABLE IN CONTENT------------------------------------------ */
/* ----------------------------------------- BUILDING TABLE IN CONTENT------------------------------------------ */
// Get Array for Table Content and Build When Page Load
window.onload = async function() {
    await fetchJSONdata();
    buildHeaderTable(headerArray);
    buildTable(markData, headerArray);
};

// Build The Table Header
function buildHeaderTable(data){
    var showTable = document.getElementById('headerTable');

    showTable.innerHTML = "";
            
    var row = showTable.insertRow(-1);
    for (var i = 0; i <= data.length; i++) {

        var headerCell = document.createElement("TH");

        if (i == 0) {
            headerCell.innerHTML = '<th class="nameCol">' + data[i] + '</th>';
        } else if (i == (data.length) ) {
            headerCell.innerHTML = '<th>' + 
                                        '<button class="headerBtn" id="Rename-Column" onclick="RenameColumnPopupWindow()">' +
                                            '<div class="headerBtn-Wrapper">' +
                                                '<i class="fa-solid fa-pen"></i>' +
                                                '<a> Column</a>' +
                                            '</div>' +
                                        '</button>' +
                                    '</th>';     
        } else {
            headerCell.innerHTML = '<th>' + data[i] + '</th>';
        }     

        row.appendChild(headerCell);
    }
    
}

// Build the Body Table
function buildTable(bodyTable, headerTable){

    // Clear Table and Get Placement
    var showTable = document.getElementById('contentTable');
    showTable.innerHTML = "";
    var row;

    for (var i = 0; i < bodyTable.length; i++) {

        let bodyArray = bodyTable[i];

        for (var j = 0; j <= headerTable.length; j++){

            if (j == 0) {
                row =   '<tr id="' + bodyArray.ID + '" name="' + bodyArray[headerTable[j]] + '">' + 
                            '<td class="nameCol" id="' + headerTable[j] + '">' + bodyArray[headerTable[j]] + '</td>';
            } else if (j == headerTable.length) {
                row +=      '<td>' +
                                '<div class="tableButton-Wrapper">' +
                                    '<button class="bodyTable-button" id="Edit-Row" onclick="openEditPopupWindow(this)">' +
                                        '<div class="bodyBtn-Content">' +
                                            '<i class="fa-solid fa-pen-to-square"></i>' +
                                        '</div>' +
                                    '</button>' +
                                    '<button class="bodyTable-button" id="Remove-Entry" onclick="rmvOneRow(this)">' +
                                        '<div class="bodyBtn-Content"> ' +
                                            '<i class="fa-solid fa-trash"></i>' +
                                        '</div>' +
                                    '</button>' +
                                '</div>' +
                            '</td>' +
                        '</tr>';
            } else {
                row += '<td id="' + headerTable[j] +'">' + bodyArray[headerTable[j]] + '</td>';
            }
        }
                      
        showTable.innerHTML += row;

    }

    // Add Aditional Row for Create Row Button
    buildAddRowButton();
           
}
function buildAddRowButton(){
    var showTable = document.getElementById('contentTable');
    var row = '<tr>';
    for (var k = 0; k <= headerArray.length -1; k++) {
        row += '<td></td>';
    }
    row += '<td>' +
                '<button class="addBtn-container" id="Add-Entry" onclick="openAddPopupWindow()">' +
                    '<div class="addBtn-content">' +
                        '<i class="fa-solid fa-square-plus"></i>' +
                    '</div>' +
                '</button>' +
            '</td>' +
        '</tr>';
    showTable.innerHTML += row;
}



/*-------------------------------------------- Button Function Section ------------------------------------------*/
/*-------------------------------------------- Button Function Section ------------------------------------------*/
/*-------------------------------------------- Button Function Section ------------------------------------------*/
/*-------------------------------------------- Button Function Section ------------------------------------------*/
/*-------------------------------------------- Button Function Section ------------------------------------------*/
// Function for Delete-Entry Button / Delete a certain Row using ID
function rmvOneRow(sender){
    //Get Row Parent ID NAME
    var tr = sender.parentNode.parentNode.parentNode;
    deleteName = tr.getAttribute('name');
    deleteID = tr.getAttribute('id');

    if (confirm("This action will delete\n" + deleteName + "\nAre you sure?") == true) {
        //Remove from Array Object
        removeById(markData, Number(deleteID));

        //Remove Table from HTML
        $("#" + deleteID).remove();
    } else {
        return false;
    }
}
// Function Search BY ID and Remove from Array
const removeById = (arr, id) => {
    const requiredIndex = arr.findIndex(el => {
        return el.ID === id;
    });
    if(requiredIndex === -1){
        return false;
    }
    return !!arr.splice(requiredIndex, 1);
};


// Function Clear all Entry
function clearAllEntry(){
    if (confirm("This action will delete all table ROWS\nAre you sure?") == true) {
        var showTable = document.getElementById('contentTable');
        markData = [];
        showTable.innerHTML = "";
        buildAddRowButton();
    } else {
        return false;
    }
}


// Function Clear Table / Delete all Columns and Rows
function clearTable(){
    if (confirm("This action will delete all table ROWS and COLUMNS\nAre you sure?") == true) {

        //Delete All Rows and Rows Array Data
        var showTable = document.getElementById('contentTable');
        markData = [];
        showTable.innerHTML = "";

        //Delete Header and Header Array, Except Name, Grade, Ket and Button
        var headerTable = document.getElementById('headerTable');
        headerArray = [
            "Name", "UTS", "UAS", "Grade", "Ket"
        ];
        headerTable.innerHTML = "";
        buildHeaderTable(headerArray);
        buildAddRowButton();

    } else {
        return false;
    }
}


// Function for Add-Entry Button
function getDataForAddRow(data){
    var formWindow = document.getElementById('AddFormWindow');

    formWindow.innerHTML =  '<h2 id="item1">Add Row Window</h2>' +
                            '<div class="form-element" id="item2">' +
                                '<label for="Name">Name</label>' +
                                '<input type="text" id="Name" placeholder="Enter Name" required>' +
                            '</div>';
            
    for (var i = 1; i < data.length - 2; i++) {

        formWindow.innerHTML +=  '<div class="form-element">' +
                                    '<label for="' + data[i] + '">' + data[i] + '</label>' +
                                    '<input type="number" id="' + data[i] + '" placeholder="' + data[i] + '" max="100" min="0" value="0">' +
                                '</div>';   

    }
    
    formWindow.innerHTML += '<div class="form-element" id="item11">' +
                                '<input type="submit" id="addEntry-btn" value="ADD ROW">' +
    '</div>';
    
    document.getElementById('addEntry-btn').addEventListener('click', addMarkData);
    document.querySelector('#popup #addEntry-btn').addEventListener("click", function(){
        buildTable(markData, headerArray);
    });
}


// Get Data for Select Option RMV Column
function getRmvColumnOptionData(data){
    var select = document.getElementById("columnArray");

    select.innerHTML = '<option value="None">Select One</option>';

    for (var i = 1; i < data.length - 4; i++) {
        var optn = data[i];
        var el = document.createElement("option");
        el.textContent = optn;
        el.value = optn;
        select.appendChild(el);
    }
}
// Function for Remove-Column Button
const rmvOneColumn = (ev) => {
    
    ev.preventDefault();    //Menghindari Submit dari Input Button Form

    var x = document.getElementById('columnArray').value;

    if (x != "None") {

        //Remove Data on Body Table
        markData.forEach(function(v){ 
            delete v[x]; 
        });
        var y = headerArray.indexOf(x);  //get remove column index
        //Remove Data on Header Table
        headerArray.splice(y, 1);

        document.querySelector(".rmvColumn-popup").classList.remove("activate");
    } else {
        alert("Choose at one of the option!!");
    }

};
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('rmvColumn-btn').addEventListener('click', rmvOneColumn);
    document.querySelector('#popup #rmvColumn-btn').addEventListener("click", function(){
        buildHeaderTable(headerArray);
        updateGradeData();
        buildTable(markData, headerArray);
    });
});


// Function for Add-Column Button
const addOneColumn = (ev) =>{

    ev.preventDefault();    //Menghindari Submit dari Input Button Form

    var x = document.getElementById('ColumnName').value;
    var y = headerArray.includes(x);

    //Validate Column Name if Empty
    if (x != "") {

        //Validate Column Name if Exists
        if (!y) {

            //Add New Key Object to markData
            markData.forEach(function(v){ 
                v[x] = 0; 
            });

            //Add Column Name to headerArray
            headerArray.splice(headerArray.length-4 , 0, x);

            document.querySelector(".addColumn-popup").classList.remove("activate");

        } else {
            alert("Name of Column already exists\nPlease, change Column Name!");
        }
    } else {
        alert("Please, Enter Name for Column");
    }
};
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addColumn-btn').addEventListener('click', addOneColumn);
    document.querySelector('#popup #addColumn-btn').addEventListener("click", function(){
        buildHeaderTable(headerArray);
        updateGradeData();
        buildTable(markData, headerArray);
    });
});


// Function for Edit-Entry Button
function editSelectedRow(data){
    var sender = data.parentNode.parentNode.parentNode;
    var row = sender.rowIndex;
    var getIndexData = document.getElementById("getTable").rows[row].cells;


    var formWindow = document.getElementById('AddFormWindow');

    formWindow.innerHTML =  '<h2 id="item1">Edit Row Window</h2>' +
                            '<div class="form-element" id="item2">' +
                                '<label id="getID" value="' + sender.id + '" for="Name">Name</label>' +
                                '<input type="text" id="Name" value="' + getIndexData[0].innerHTML + '" required>' +
                                '<input type="hidden" id="ID" value="' + sender.id + '">' +
                            '</div>';
            
    for (var i = 1; i < headerArray.length - 2; i++) {

        formWindow.innerHTML +=  '<div class="form-element">' +
                                    '<label for="' + headerArray[i] + '">' + headerArray[i] + '</label>' +
                                    '<input type="number" id="' + headerArray[i] + '" value="' + getIndexData[i].innerHTML + '" max="100" min="0" value="0">' +
                                '</div>';   
                                
    }
    formWindow.innerHTML += '<div class="form-element"></div>';

    formWindow.innerHTML += '<div class="form-element" id="item11">' +
                                '<input type="submit" id="editEntry-btn" value="EDIT ROW">' +
    '</div>';
    
    document.getElementById('editEntry-btn').addEventListener('click', changeEditedData);
    document.querySelector('#popup #editEntry-btn').addEventListener("click", function(){
        updateGradeData();
        buildTable(markData, headerArray);
    });
}
const changeEditedData = (ev) => {
    ev.preventDefault();    //Menghindari Submit dari Input Button Form
    var getValidation = nameValidation();
    if (getValidation) {

        var editID = document.getElementById("ID").value;
        markData.forEach(function(v){
            if (v.ID == editID) {

                for (i = 0; i < headerArray.length - 2; i++){

                    v[headerArray[i]] = document.getElementById(headerArray[i]).value;
                }
            }
        });

        document.querySelector("#popup").classList.remove("activate");

    } else {
        alert("Name entry must be filled out");

    }
};


// Get Data for Select Option Rename Column
function getRenameColumnOptionData(data){
    var select = document.getElementById("renameArray");

    select.innerHTML = '<option value="None">Select One</option>';

    for (var i = 0; i < data.length; i++) {
        var optn = data[i];
        var el = document.createElement("option");
        el.textContent = optn;
        el.value = optn;
        select.appendChild(el);
    }

    document.getElementById('renameColumn-btn').addEventListener('click', renameColumn);
    document.querySelector('#popup #renameColumn-btn').addEventListener("click", function(){
        buildHeaderTable(headerArray);
        buildTable(markData, headerArray);
    });
}
// Rename Column Funciton
const renameColumn = (ev) =>{
    ev.preventDefault();    //Menghindari Submit dari Input Button Form

    var x = document.getElementById('renameArray').value;
    var y = document.getElementById('renameName').value;
    var validateName = headerArray.includes(y);

    if (x != "None" && y != "") {

        //Validate Column Name if Exists
        if (!validateName) {

            //Rename Column Data Key on Object Array
            markData.forEach(function(v){ 
                v[y] = v[x];
                delete v[x];
            });

            var headerIndex = headerArray.indexOf(x);  //get rename column index
            //Rename Data on Header Array
            headerArray[headerIndex] = y;

            document.querySelector(".renameColumn-popup").classList.remove("activate");

        } else {
            alert("Name of Column already exists\nPlease, change Column Name!");
        }

    } else {
        alert("Choose at one of the option!!\nOR\nEnter a new Column Name!!");
    }
};







/*-------------------------------------------- API - CLIENT HUB ------------------------------------------*/
/*-------------------------------------------- API - CLIENT HUB ------------------------------------------*/
/*-------------------------------------------- API - CLIENT HUB ------------------------------------------*/
/*-------------------------------------------- API - CLIENT HUB ------------------------------------------*/
/*-------------------------------------------- API - CLIENT HUB ------------------------------------------*/
function parse_query_string(query) {
    var vars = query.split("&");
    var query_string = {};
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      var key = decodeURIComponent(pair.shift());
      var value = decodeURIComponent(pair.join("="));
      // If first entry with this name
      if (typeof query_string[key] === "undefined") {
        query_string[key] = value;
        // If second entry with this name
      } else if (typeof query_string[key] === "string") {
        var arr = [query_string[key], value];
        query_string[key] = arr;
        // If third or later entry with this name
      } else {
        query_string[key].push(value);
      }
    }
    return query_string;
}

var query_string = "edit";
var parsed_qs = parse_query_string(query_string);

var query = window.location.search.substring(1);
var qs = parse_query_string(query);
const getPath = qs.edit;

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

const fetchJSONdata = async () => {
    const apiToken = await refreshToken();
    const AuthStr = 'Bearer '.concat(apiToken);
    await axios.get(`${BASE_URL}/api/workspace/json?path=${qs.edit}`, { 
        headers: { Authorization: AuthStr }
    })
    .then(response => {
        headerArray = response.data.WSjson.header;
        markData = response.data.WSjson.body;
    })
    .catch((error) => {
        console.log('error ' + error);
    });
};

const saveBtn = document.querySelector('#Save-Table').addEventListener('click', async (ev) => {
    ev.preventDefault;
    await postJSONdata();
});
const postJSONdata = async () => {
    const apiToken = await refreshToken();
    const AuthStr = 'Bearer '.concat(apiToken);
    const getJSON = { header: headerArray, body: markData};
    const saveInfo = {path: getPath, jsonFile: getJSON};
    await axios.post(`${BASE_URL}/api/workspace/save`, saveInfo ,{ 
        headers: { Authorization: AuthStr }
    })
    .then(response => {
        console.log(response);
        alert("Save successfull, now you can leave the page");
    })
    .catch((error) => {
        console.log('error ' + error);
        if(!state) alert("Can't send data, something is worng\nPlease try again later\nOr check internet connection");
    });
}

const dashboard = document.querySelector('#openModalSignin').addEventListener('click', function () {
    let text = "Please save your progess first,\nTHis action does not save progres\nAre you sure want to exit?";
    if (confirm(text) == true) {
        window.location = `${BASE_URL}/dashboard`;
    } else {
        return;
    }
});
