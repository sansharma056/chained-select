let state = {
    stateDropdown: '',
    cityDropdown: '',
    value: ''
};

// Initialises the entire dropdown
function init() {
    state.stateDropdown = initState();
    state.cityDropdown = initCity();
}

init();

// Initialises state dropdown
function initState() {
    // Selects the state <select>
    let stateDropdown = document.getElementById('state_select');

    // Adds default option and autoselects it
    addDefaultOption('state', stateDropdown);

    return stateDropdown;
}

// Initialises city dropdown
function initCity() {
    // Selects the city <select>
    let cityDropdown = document.getElementById('city_select');

    return cityDropdown;
}

// Function to add default option
function addDefaultOption(name, dropdown) {
    // Clears whatever is inside the selected element
    dropdown.length = 0;
    
    // Creates <option> and gives it attributes text, value and disables it.
    let defaultOption = document.createElement('option');
    defaultOption.text = `Choose ${name}`;
    defaultOption.value = state.value;
    defaultOption.disabled = true;

    // Adds it to <select> and selects it.
    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;
}

// Function to check if city dropdown needs to be displayed
function checkCityDropdown() {
    if(state.cityDropdown.length <= 1){
        state.cityDropdown.hidden = true;
    }
    else {
        state.cityDropdown.hidden = false;
    }
}

// Function to remove everything in city dropdown
function clearCityDropdown() {
    state.cityDropdown.length = 0;
}

// Function to populate dropdown
function popList(listName, key, dropdown) {
    let url;

    listName === 'state' ? url = 'js/usa/usaStates.json' : url = 'js/usa/usaCities.json';

    function addOption(data, i) {
        let option;
        option = document.createElement('option');
        option.text = data[i][key];
        option.value = data[i][key];
        dropdown.add(option);
    }

    fetch(url)
    .then(response => {
        try {
            response.json().then( data=> {

                for(let i=0; i<data.length; i++) {
                    if(listName === 'state') {
                        addOption(data, i);
                    }
                    else {
                        if(data[i].state === state.value) {
                            addOption(data, i);
                        }
                        
                    }
                }
                checkCityDropdown();
            })
        } catch(error) {
            console.log(error);
        }
    });
}

function popState(sDropdown) {
    popList('state', 'name', sDropdown);
}

popState(state.stateDropdown);

function popCity(cDropdown) {
    addDefaultOption('city', cDropdown);

    if(state) {
        popList('city', 'city', cDropdown);    
    }

}

state.stateDropdown.addEventListener('change', e => {
    state.value = e.target.value;
    clearCityDropdown();
    popCity(state.cityDropdown);
});