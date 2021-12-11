import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { RollbackOutlined } from "@ant-design/icons";

import toast from "react-toastify";
import SinglePost from "../../components/cards/SinglePost";
import ParallaxBG from "../../components/cards/ParallaxBG";
const PostComments = () => {
  const [posts, setPosts] = useState({});
  const router = useRouter();
  const _id = router.query._id;

  //   //comment
  const [comment, setComment] = useState("");
  const [visible, setVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState({});

  useEffect(() => {
    if (_id) fetchPost();
  }, [_id]);

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/user-post/${_id}`);
      setPosts(data);
      console.log("post dataaa", data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (post) => {
    try {
      // const answer = window.confirm("Are you sure to delete this post?");
      // if (!answer) return;
      const { data } = await axios.delete(`/delete-post/${post._id}`);
      console.log("check data", data);
      toast.error("Post Deleted");
      // fetchPost()
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (_id) => {
    // console.log('Like this post',_id)
    try {
      const { data } = await axios.put("/like-post", { _id });
      // console.log('Liked',data)
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  };
  const handleUnlike = async (_id) => {
    // console.log('unLike this post',_id)
    try {
      const { data } = await axios.put("/unlike-post", { _id });
      // console.log('Unliked',data)
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  };
  const handleComment = async (posts) => {
    setCurrentPost(posts);
    setVisible(true);
  };
  const addComment = async (e) => {
    e.preventDefault();
    // console.log('add comment to this post id',currentPost._id )
    // console.log('save comment to db',comment)
    try {
      const { data } = await axios.put("/add-comment", {
        postId: currentPost._id,
        comment,
      });
      console.log("Add comment", data);
      setComment("");
      setVisible(false);
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  };

  const removeComment = async (postId, comment) => {
    let answer = window.confirm("Are you sure to delete this comment?");
    if (!answer) return;
    try {
      const { data } = await axios.put("/remove-comment", { postId, comment });
      console.log("Comment removed", data);
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ParallaxBG url="/images/bodg-bg.jpg">POST</ParallaxBG>
      <div className="container ">
        {/* <h4 className="text-center">Comments</h4>
      <div className="py-1 d-flex justify-content-start">
        <Link href="/user/dashboard">
          <a className="btn btn-outline-secondary text-dark h4 ">
            <RollbackOutlined size={100} className="mb-1" />
          </a>
        </Link>
      </div> */}
        <SinglePost
          view="view"
          posts={posts}
          commentsCount={100}
          handleDelete={handleDelete}
          handleLike={handleLike}
          handleUnlike={handleUnlike}
          removeComment={removeComment}
          addComment={addComment}
          handleComment={handleComment}
          visible={visible}
          comment={comment}
          setComment={setComment}
          setVisible={setVisible}
        />
      </div>
    </>
  );
};

export default PostComments;
