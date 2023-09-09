import React, { useEffect, useState } from "react";
import "./App.css";

import AlbumList from "./AlbumList";
import UserList from "./UserList";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [albums, setAlbums] = useState([]);
  const originalTitle = document.title;

  // Load data from https://jsonplaceholder.typicode.com/albums?userId=${user.id}

  //Create function to load all users
  async function loadUsers(abortController) {
    try{
      const response  = await fetch(`https://jsonplaceholder.typicode.com/users`,{signal:abortController.signal});
      const usersFromAPI = await response.json();
      setUsers(usersFromAPI);
    } catch (error) {
      if(error.name === 'AbortError'){
        console.log('Aborted');
      } else {
        throw error;
      }
    }
  }

  //Create function to get current user
  async function loadUser(userId,abortController) {
    try{
      const response = await fetch(`https://jsonplaceholder.typicode.com/users?id=${userId}`,{signal:abortController.signal})
      const userFromAPI = await response.json();
      setCurrentUser(userFromAPI[0]);
    } catch (error) {
      if(error.name === 'AbortError'){
        console.log('Aborted');
      } else {
        throw error;
      }
    }
  }

    //Create function to get current user albums
    async function getAlbums(userId, abortController) {
      try{
        const response  = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`,{signal:abortController.signal});
        const albumsFromAPI = await response.json();
        setAlbums(albumsFromAPI);
      } catch (error) {
        if(error.name === 'AbortError'){
          console.log('Aborted');
        } else {
          throw error;
        }
      }
    }

  const clickHandler = async (userId) => {

    //clear current user value
    setCurrentUser({});
    
    //Instantiate a new abort controller object for this event
    const abortController = new AbortController();
    
    //call asyncronous loadUser function with id value from event target and current abort controller
    loadUser(userId, abortController);
    
    //return cleanup function
    return () => abortController.abort();
  }


  //Get full list of users
  useEffect(() => {
    //Clear users value
    setUsers([]);
    
    //Instantiate a new abort controller object for this effect
    const abortController = new AbortController();
    
    //Call loadUsers function with the current abort controller
    loadUsers(abortController);
    
    //Return cleanup function
    return () => abortController.abort();
  },[])

    //Get full list of albums
    useEffect(() => {
      //Clear ablums value
      setAlbums([]);
      
      //Instantiate a new abort controller object for this effect
      const abortController = new AbortController();
      
      if(currentUser.id){
      //Call getAlbums function with the current user ID and abort controller
      getAlbums(currentUser.id, abortController);
    }
      //Return cleanup function
      return () => abortController.abort();
    },[currentUser])

  //Set document title
  useEffect(() => {
      document.title = `Awesome Album App`;
      return () => {document.title = originalTitle;}
  },[])


  return (
    <div className="App">
      <div className="left column">
        {!users.length? "Loading..." : <UserList users={users} clickHandler = {clickHandler} />}
      </div>
      <div className="right column">
        <h2>{document.title}</h2>
        <AlbumList albums={albums}/>
      </div>
    </div>
  );
}

export default App;
