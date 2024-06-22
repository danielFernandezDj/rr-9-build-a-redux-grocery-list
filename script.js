// DOM elements
const list = document.getElementById('list');
const newItem = document.getElementById('newItem');
const addGrocery = document.getElementById('addGrocery');
const clear = document.getElementById('clear');

// Initial state
const initialState = {
  groceries: []
};

// Reducer
const groceryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'grocery/add':
      return {
        groceries: [
          ...state.groceries,
          {
            text: action.text
          }
        ]
      };
    case 'grocery/clear':
      return {
        groceries: []
      };
    default:
      return state;
  }
};

// Store
let store = Redux.createStore(groceryReducer);

// Render function
const render = () => {
  const state = store.getState();
  list.innerHTML = '';
  state.groceries.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.text;
    list.appendChild(li);
  });
};

// Clear list function
const clearList = () => {
  newItem.value = "";
  store.dispatch({
    type: 'grocery/clear'
  });
};

// Add grocery function
const newGrocery = (e) => {
  e.preventDefault();
  let groceryText = newItem.value;
  if (groceryText.trim()) {
    store.dispatch({
      type: 'grocery/add',
      text: groceryText
    });
    newItem.value = '';
  }
  console.log(store.getState())
};

// Event listeners
addGrocery.addEventListener('click', (e) => newGrocery(e));
clear.addEventListener('click', clearList);

// Subscribe to store updates
store.subscribe(render);

// Initial render
render();
