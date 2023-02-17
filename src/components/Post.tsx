import { Fragment, useState } from "react";
import { useMutation } from "react-query";
import { CustomError, Post } from "../types";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState<null | { id?: number }>();

  const createPost = async (body: {
    id: number;
    title: string;
    description: string;
  }) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setMessage(await response.json());
  };

  const { isLoading, isError, error, mutate } = useMutation(createPost, {
    retry: 3,
  });

  return (
    <Fragment>
      <div className="post">
        <h1>Create a Post</h1>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br /> <br />
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <br />
        <button
          onClick={() => {
            mutate({ id: Date.now(), title, description });
          }}
        >
          Create
        </button>
        <p> Created a new Post ID: {message && message.id}</p>
        <div style={{ color: "gray", background: "#234" }}>
          {isLoading ? "Saving..." : ""}
          {isError ? (error as CustomError).message : ""}
        </div>
      </div>
    </Fragment>
  );
}
