import React from 'react';
import { useState } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link
} from 'react-router-dom';
import About from './About';
import Movies from './Movies';
import Cart from './Cart';

function StreamList() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    const value = input.trim();
    if (!value) return;

    setItems((currentItems) => [
      ...currentItems,
      {
        id: Math.random(),
        text: value,
      },
    ]);

    setInput(" ");
    console.log(value);
  }

  function handleRemove(id) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  }

  function handleEdit(id, newText) {
    const value = newText.trim();
    if (!value) return;
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, text: value } : item
      )
    );
    setEditingId(null);
  }

  function handleStartEdit(id, currentText) {
    setEditingId(id);
    setEditText(currentText);
  }

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  return (
    <section className="MainList">
      <div>
        <br></br>
			<img src="https://i.imgur.com/1ht5GIs.png"></img>
			<h1>StreamList</h1>
			<h2>Your personalized streaming list. Start here:</h2>

        <form className="MainForm" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter movie or show title..."
            maxLength={200}
          />

          <button type="submit">Add to List</button>
        </form>
        <br></br>
      </div>

      <section className="List">
        <div>
          <h2>Your List</h2>
          <span className="Counter">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
        </div>

        <ul className="ListItems">
            {items.map((item) => (
              <li key={item.id} className="Item">

                {editingId === item.id ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleEdit(item.id, editText);
                    }}
                  >
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      maxLength={200}
                    />
                    <button type="submit" className="save-button">Save</button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <span className="ItemTitle">{item.text}</span>
                )}

                {editingId !== item.id && (
                  <button
                    type="button"
                    onClick={() => handleStartEdit(item.id, item.text)}
                  >
                    Edit
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <br></br>
      </section>
      <p className='PageBottom'>(C) 2026 EZTechMovie. All rights reserved.</p>
    </section>
   
  );
}


/* router */

function App() {
	return (
		<div className='App'>
		
		<Router>
			<div>
				<nav className='Router'>
					<Link to="/">Home</Link>|  
					<Link to="/movies">Movies</Link>|  
					<Link to="/cart">Cart</Link>|  
					<Link to="/about">About </Link>
				</nav>
				
				<Routes>
					<Route path="/" element={<StreamList />} />
					<Route path="/movies" element={<Movies />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/about" element={<About />} />
				</Routes>
			</div>
		</Router>
		
		</div>
  );
}

export default App