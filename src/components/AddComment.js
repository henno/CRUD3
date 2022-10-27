import React from "react";

export const AddComment = ({ onAdd }) => {
  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    onAdd(evt.target.name.value, evt.target.email.value, evt.target.body.value);
    evt.target.name.value = "";
    evt.target.email.value = "";
    evt.target.body.value = "";
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <h3>Add Comment</h3>
      <input placeholder="Name" name="name" />
      <input placeholder="Email" name="email" />
      <input placeholder="Body" name="body" />
      <button onSubmit={handleOnSubmit}>Add</button>
      <hr />
    </form>
  );
};