const dbDropdown = document.getElementById('database-dropdown');
const colDropdown = document.getElementById('collection-dropdown');
const editButtons = document.getElementsByClassName('edit-buttons');

//Checks when dropdown menus have been updated
dbDropdown.addEventListener('change', function() {
    const selectedValue = dbDropdown.value;
    console.log('Dropdown selection changed to: ' + selectedValue);
});

//Adding event listeners to every button
for(let i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener('click', function(e) {
        const btnID = e.target.id.split("-")[0];
        toggleEdit(btnID);
    });
}

//Functions
function toggleEdit(id) {
    console.log("Button ID: " + id);
    var editableText = document.getElementById(id);
    for (const parent of editableText.children) {
        console.log(parent);

        for(const child of parent.children) {
            console.log(child);
            child.contentEditable = !editableText.isContentEditable;
        }
    }
}