const dbDropdown = document.getElementById('database-dropdown');
const colDropdown = document.getElementById('collection-dropdown');
const editButtons = document.getElementsByClassName('edit-buttons');
const postButtons = document.getElementsByClassName("post-buttons");
const deleteButtons = document.getElementsByClassName("delete-buttons");
const addButton = document.getElementById("add-btn");
const submitButton = document.getElementById("submit-button");
const addCollButton = document.getElementById("add-col-btn");
const delCollButton = document.getElementById("delete-col-btn");

const baseUrl = 'http://localhost:3000/default'

// Checks when data dropdown menu has been updated
dbDropdown.addEventListener('change', async function() {
    var encasedEle = document.getElementById("encased");
    const selectedValue = dbDropdown.value;
    //Check to see if the value has been changed and to what
    // console.log("SELECTED VALUE: " + selectedValue);
    // console.log('Dropdown selection changed to: ' + selectedValue);

    if(selectedValue != "placeHolder") {
        encasedEle.style.display = "block";
    } else {
        encasedEle.style.display = "none";
    }
});

colDropdown.addEventListener('change', async function() {
    var encasedEle = document.getElementById("submit-encased");
    const selectedValue = dbDropdown.value;

    if(selectedValue != "placeHolder") {
        encasedEle.style.display = "block";
    } else {
        encasedEle.style.display = "none";
    }
});

//Adding event listeners to every edit button
for(let i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener('click', function(e) {
        const textID = e.target.id.split("-")[0];
        const btnID = e.target.id;
        toggleEdit(textID, btnID);
    });
}

//Adding event listeners to every post button
for(let btn = 0; btn < postButtons.length; btn++) {
    postButtons[btn].addEventListener('click', function(e) {
        const id = e.target.id;
        const btnID = id;
        const textID = id.split("-")[0];
        postEdit(textID, btnID);
    })
}

//Adding event listeners to every delete button
for(let btn = 0; btn < deleteButtons.length; btn++) {
    deleteButtons[btn].addEventListener('click', function(e) {
        const id = e.target.id;
        const btnID = id;
        const textID = id.split("-")[0];
        console.log(`id: ${id}\nbtnID: ${btnID}\ntextID: ${textID}`);
        deleteDoc(textID, btnID)
    })
}

//Adding event listener to the add button
if(addButton) {
    addButton.addEventListener('click', function(e) {
        CreateNewDoc();
    });
}

//Adding event listener to the submit button
submitButton.addEventListener('click', function() {
    submitData();
}); 

//Adding event listener to the add collection button
addCollButton.addEventListener('click', function() {
    CreateNewCol();
})

delCollButton.addEventListener('click', function() {
    DeleteCollection();
})


//Functions
// function showCollectionDropdown() {
//     var databaseDropdown = document.getElementById("database-dropdown");
//     var collectionDropdown = document.getElementById("collection-dropdown");

//     // Check the selected value of database dropdown
//     if (databaseDropdown.value !== "placeHolder") {
//         // If a database is selected, show collection dropdown
//         collectionDropdown.style.display = "block";
//     } else {
//         // If the default placeholder is selected, hide collection dropdown
//         collectionDropdown.style.display = "none";
//     }
// }


async function CreateNewCol() {
    const name = prompt("What is the name for the new Collection?");

    const data = {
        colName : name
    }
    
    const options = {
        method : "POST",
        headers : {
            "Content-Type" : 'application/json'
        },
        body : JSON.stringify(data)
    }

    const res = await fetch(baseUrl + '/createCol', options);
    const response = await res.json();
    console.log(response);
}

async function DeleteCollection() {
    console.log("Deleting Current Collection");

    const options = {
        method : "POST",
        headers : {
            "Content-Type" : 'application/json'
        },
        body : JSON.stringify()
    }

    const res = await fetch(baseUrl + '/deleteCol', options);
    const response = await res.json();
    console.log(response);
}

//Allows textboxes to be editable
function toggleEdit(id, btnID) {
    // console.log("Text ID: " + id);

    const editableText = document.getElementById(id);
    const editParent = editableText.children;
    for(let parent = 0; parent < editParent.length - 4; parent++) {
        // console.log(editParent[parent]); 
        const editChild = editParent[parent].children;
        for(let child = 0; child < editChild.length; child++) {
            // console.log(editChild[child]);
            const btn = document.getElementById(btnID);
            if(editChild[child].isContentEditable) {
                editChild[child].contentEditable = false;
                btn.style.backgroundColor = '#52c4c4';
            } else {
                editChild[child].contentEditable = true;
                btn.style.backgroundColor = '#f1606a';
            }
        }
    }
}

//Saves edits to the database
async function postEdit(id, btnID) {
    // console.log(`Button '${btnID}' was pressed for textbox '${id}'`);
    const editableText = document.getElementById(id);
    const editParent = editableText.children;
    const data = {
        assetTag : editParent[1].textContent,
        serialNumber : editParent[2].textContent,
        deviceType : editParent[3].textContent,
        assignedTo : editParent[4].textContent,
        id : editParent[5].textContent,
        // mongoDataBase : dbDropdown.value,
        // mongoCol : colDropdown.value
    }

    const options = {
        method : "POST",
        headers : {
            "Content-Type" : 'application/json'
        },
        body : JSON.stringify(data)
    }
    const res = await fetch(baseUrl, options);
    const response = await res.json();
    console.log(response);
}

//Deletes a document in the database
async function deleteDoc(id, btnID) {
    const editableText = document.getElementById(id);
    const editParent = editableText.children;
    const data = {
        id : editParent[5].textContent,
    }

    const options = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    }
    const res = await fetch(baseUrl + '/delete', options);
    const response = await res.json();
    console.log(response);
}

//Creates a new document in the database
async function CreateNewDoc() {
    const _assetTag = prompt("What is the assest tag?");
    const _serialNumber = prompt("What is the serial number?"); 
    const _deviceType = prompt("What is the device type?"); 
    const _assignedTo = prompt("Who is this assigned to?"); 

    const data = {
        assetTag : _assetTag,
        serialNumber : _serialNumber,
        deviceType : _deviceType,
        assignedTo : _assignedTo
    }

    const options = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    }

    const res = await fetch(baseUrl + '/add', options)
    const response = await res.json();
    console.log(response); 
}
