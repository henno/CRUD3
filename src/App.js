import React, { useEffect, useState } from "react";
import { AddComment } from "./components/AddComment";
import { Comment } from "./components/Comment";
import "./styles.css";

export default function App() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch("https://jsonplaceholder.typicode.com/comments?_limit=10")
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.log(error));
  };

  const onAdd = async (name, email, body) => {
    await fetch("https://jsonplaceholder.typicode.com/comments", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        body: body
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => {
        if (response.status !== 201) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setComments((comments) => [...comments, data]);
      })
      .catch((error) => console.log(error));
  };

  const onEdit = async (id, name, email, body) => {
    await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: name,
        email: email,
        body: body
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        // setUsers((users) => [...users, data]);
        const updatedComments = comments.map((comment) => {
          if (comment.id === id) {
            comment.name = name;
            comment.email = email;
          }

          return comment;
        });

        setComments((comments) => updatedComments);
      })
      .catch((error) => console.log(error));
  };

  const onDelete = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
      method: "DELETE"
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          setComments(
            comments.filter((comment) => {
              return comment.id !== id;
            })
          );
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <h1>Comments</h1>
      <AddComment onAdd={onAdd} />
      {comments.map((comment) => (
        <Comment
          id={comment.id}
          key={comment.id}
          name={comment.name}
          email={comment.email}
          body={comment.body}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
