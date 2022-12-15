import React, { useState } from "react";

export const Comment = ({ name, email, body, id, onEdit, onDelete }) => {

  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleOnEditSubmit = (evt) => {
    evt.preventDefault();
    onEdit(
      id,
      evt.target.name.value,
      evt.target.email.value,
      evt.target.body.value
    );
    setIsEdit(!isEdit);
  };
  if (isEdit)
    return (
      <tr className="user">
        <td colSpan={4}>
          <form onSubmit={handleOnEditSubmit}>
            <input placeholder="Name" name="name" defaultValue={name} />
            <input placeholder="Email" name="email" defaultValue={email} />
            <input
              className="body"
              placeholder="Body"
              name="body"
              defaultValue={body}
            />
            <button onSubmit={handleOnEditSubmit}>Save</button>
          </form>
        </td>
      </tr>
    );
  else
    return (
      <tr className="user">
        <td className="user-name">{name}</td>
        <td className="user-email">{email}</td>
        <td className="user-body">{body}</td>
        <td>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </td>
      </tr>
    );
};
