import React, { useState } from 'react'
import { useRouteData } from 'react-static'
//
import { Link } from 'components/Router'

export default function Post() {
  const [oldPost, setOldPost] = useState({});
  const { post } = useRouteData();
  if (post) {
    if (oldPost.title != post.title)
      setOldPost(post);
  } else if (!oldPost) {
    return <div>No post</div>
  }
  return (
    <div>
      <Link to="/blog/">{'<'} Back</Link>
      <br />
      <h3>{oldPost.title}</h3>
      <p>{oldPost.body}</p>
    </div>
  );
}
