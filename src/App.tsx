import './App.css'
import { useQuery } from 'react-query';

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

async function fetchPosts(): Promise<Post[]> {
  const data = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  )
  return data.json();
}

function App() {
  const { data, error, isError, isLoading } = useQuery("posts", fetchPosts);
  // first argument is a string to cache and track the query result
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error! {(error as any).message}</div>;
  }


  return (
    <div className="App">
      <h1>Posts</h1>
      {data?.map((post) => {
        return <li key={post.id}>{post.title}</li>;
      })}
    </div>
  );
}

export default App
