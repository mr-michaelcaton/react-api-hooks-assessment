import React from "react";
import Album from "./Album";

function AlbumList({ albums}) {
  if (!albums.length) {
    return <p>Please click on a user name to the left</p>;
  } else {
    const list = albums.map((album) => {
      return <Album key={album.id} id={album.id} title={album.title} />;
    });
    return (
      <div>{list}</div>
    )
  }
}

export default AlbumList;
