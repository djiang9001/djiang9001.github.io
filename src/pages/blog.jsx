import React, { useState } from 'react'
import { useRouteData } from 'react-static'
//
import { Link } from 'components/Router'

export default function Blog() {
  const [oldPosts, setOldPosts] = useState([]);
  const { posts } = useRouteData()
  if (posts) {
    if (oldPosts.length != posts.length)
      setOldPosts(posts);
  } else if (!oldPosts) {
    return <div>No Posts</div>
  }
  return (
    <div>
      <h1>It's blog time.</h1>
      <div>
        <a href="#bottom" id="top">
          Scroll to bottom!
        </a>
      </div>
      <br />
      All Posts:
      <ul>
        {oldPosts.map(post => (
          <li key={post.id}>
            <Link to={`/blog/post/${post.id}/`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <a href="#top" id="bottom">
        Scroll to top!
      </a>
    </div>
  );
}
