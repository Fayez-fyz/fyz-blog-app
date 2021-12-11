import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ParallaxBG from "../../../components/cards/ParallaxBG";
import PostPublic from "../../../components/cards/PostPublic";
import SinglePost from "../../../components/cards/SinglePost";

const OnePost = ({ posts }) => {
  //   const [post, setPost] = useState({});
  //   //   //comment
  //   const [comment, setComment] = useState("");
  //   const [visible, setVisible] = useState(false);
  //   const [currentPost, setCurrentPost] = useState({});
  //   const router = useRouter();
  //   const _id = router.query._id;
  //  useEffect(() => {
  //     if (_id) fetchPost();
  //   }, [_id]);

  //   const fetchPost = async () => {
  //     try {
  //       const { data } = await axios.get(`/user-post/${_id}`);
  //       setPost(data);
  //       console.log("post dataaa",data)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  // const handleDelete = async (post) => {
  //   try {
  //     // const answer = window.confirm("Are you sure to delete this post?");
  //     // if (!answer) return;
  //     const { data } = await axios.delete(`/delete-post/${post._id}`);
  //     console.log("check data", data);
  //     toast.error("Post Deleted");
  //     // fetchPost()
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleLike = async (_id) => {
  //   // console.log('Like this post',_id)
  //   try {
  //     const { data } = await axios.put("/like-post", { _id });
  //     // console.log('Liked',data)
  //     fetchPost();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const handleUnlike = async (_id) => {
  //   // console.log('unLike this post',_id)
  //   try {
  //     const { data } = await axios.put("/unlike-post", { _id });
  //     // console.log('Unliked',data)
  //     fetchPost();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const handleComment = async (posts) => {
  //   setCurrentPost(posts);
  //   setVisible(true);
  // };
  // const addComment = async (e) => {
  //   e.preventDefault();
  //   // console.log('add comment to this post id',currentPost._id )
  //   // console.log('save comment to db',comment)
  //   try {
  //     const { data } = await axios.put("/add-comment", {
  //       postId: currentPost._id,
  //       comment,
  //     });
  //     console.log("Add comment", data);
  //     setComment("");
  //     setVisible(false);
  //     fetchPost();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const removeComment = async (postId, comment) => {
  //   let answer = window.confirm("Are you sure to delete this comment?");
  //   if (!answer) return;
  //   try {
  //     const { data } = await axios.put("/remove-comment", { postId, comment });
  //     console.log("Comment removed", data);
  //     fetchPost();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // {state && state.token && state.user && (router.push(`/user/dashboard/${posts._id}`))}
  return (
    <>
      <ParallaxBG url="/images/bodg-bg.jpg">POST</ParallaxBG>
      <div className="container">
        <SinglePost
          viewcomment="view"
          key={posts._id}
          posts={posts}
          commentsCount={100}
          // handleComment={handleComment}
          // visible={visible}
          // comment={comment}
          // setComment={setComment}
          // setVisible={setVisible}
        />
      </div>
    </>
  );
};
export async function getServerSideProps(ctx) {
  const { data } = await axios.get(`/post/${ctx.params._id}`);
  return {
    props: {
      posts: data,
    },
  };
}

export default OnePost;
