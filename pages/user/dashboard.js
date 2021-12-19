import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import PostForm from "../../components/forms/PostForm";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { Card, Modal, Pagination } from "antd";
import Link from "next/link";
import PostList from "../../components/cards/PostList";
import CommentForm from "../../components/forms/CommentForm";
import ParallaxBG from "../../components/cards/ParallaxBG";
import { PlusSquareOutlined } from "@ant-design/icons";

// import People from "../../components/cards/People";
// import { Modal, Pagination } from "antd";
// import CommentForm from "../../components/forms/CommentForm";
// import Search from "../../components/Search";
const dashboard = () => {
  const [state, setState] = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [ok, setok] = useState(false);
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [posts, setPosts] = useState([]);

  const router = useRouter();

  //   //people
  //   const [people, setPeople] = useState([]);
  //   //comment
  const [comment, setComment] = useState("");
  const [visible, setVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState({});

  //   //pagination
  const [totalPosts, setTotalPosts] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (state && state.token) {
      newsFeed();
    }
  }, [state && state.token, page]);

  useEffect(() => {
    try {
      axios.get("/total-posts").then(({ data }) => setTotalPosts(data));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const newsFeed = async () => {
    try {
      const { data } = await axios.get(`/news-feed/${page}`);
      // console.log("user posts", data);
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const postSubmit = async (e) => {
    e.preventDefault();
    // console.log('Post =>',content)
    try {
      const { data } = await axios.post("/create-post", {
        title,
        content,
        image,
      });
      // console.log("created post", data);
      setok(false)
      if (data.error) {
        toast.error(data.error);
      } else {
        setPage(1);
        newsFeed();
        toast.success("Post created");
        setTitle("");
        setContent("");
        setImage({});
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    // console.log([...formData])
    setUploading(true);

    try {
      const { data } = await axios.post("/upload-image", formData);
      // console.log("uploader image =>", data);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };
  const handleDelete = async (post) => {
    try {
      const answer = window.confirm("Are you sure to delete this post?");
      if (!answer) return;
      const { data } = await axios.delete(`/delete-post/${post._id}`);
      console.log("check data", data);
      toast.error("Post Deleted");
      newsFeed();
    } catch (error) {
      console.log(error);
    }
  };
  //   const findPeople = async (req, res) => {
  //     try {
  //       const { data } = await axios.get("/find-people");
  //       setPeople(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const handleFollow = async (user) => {
  //     try {
  //       const { data } = await axios.put("/user-follow", { _id: user._id });
  //       // console.log('Follow response',data)
  //       //update local storage,update user,keep token
  //       let auth = JSON.parse(localStorage.getItem("auth"));
  //       auth.user = data;
  //       localStorage.setItem("auth", JSON.stringify(auth));
  //       //update context
  //       setState({ ...state, user: data });
  //       //update people state
  //       let filtered = people.filter((p) => p._id !== user._id);
  //       setPeople(filtered);
  //       //rerender the post in newsfeed
  //       newsFeed();
  //       toast.success(`Following ${user.name}`);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  const handleLike = async (_id) => {
    // console.log('Like this post',_id)
    try {
      const { data } = await axios.put("/like-post", { _id });
      // console.log('Liked',data)
      newsFeed();
    } catch (error) {
      console.log(error);
    }
  };
  const handleUnlike = async (_id) => {
    // console.log('unLike this post',_id)
    try {
      const { data } = await axios.put("/unlike-post", { _id });
      // console.log('Unliked',data)
      newsFeed();
    } catch (error) {
      console.log(error);
    }
  };
  const handleComment = async (post) => {
    setCurrentPost(post);
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
      newsFeed();
    } catch (error) {
      console.log(error);
    }
  };
  const removeComment = async (postId, comment) => {
    let answer = window.confirm("Are you sure to delete this comment?");
    if (!answer) return;
    try {
      const { data } = await axios.put("/remove-comment", { postId, comment });
      // console.log("Comment removed", data);
      newsFeed();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <UserRoute>
      <ParallaxBG url="/images/bodg-bg.jpg"> BLOGS </ParallaxBG>
      <div className="container">
        {/* <div className="row py-4 glass text-light">
          <div className="col text-center">
            <h1 className="display-5">
              <b>News Feed</b>
            </h1>
          </div>
        </div> */}

        <div className="row py-3">
          <div className="col-md-12">
            <div className="d-flex justify-content-center">
              <button className="btn btn-outline-primary" onClick={() => setok(true)}>
                <PlusSquareOutlined className=" fs-3" />
                <span className="fs-6"> Create Post</span>
              </button>
            </div>
            <PostForm
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              postSubmit={postSubmit}
              ok={ok}
              setok={setok}
              handleImage={handleImage}
              uploading={uploading}
              image={image}
            />

            {/* <pre>{JSON.stringify(posts,null,4)}</pre> */}

            <PostList
              posts={posts}
              handleDelete={handleDelete}
              handleLike={handleLike}
              handleUnlike={handleUnlike}
              handleComment={handleComment}
              removeComment={removeComment}
            />

            <Pagination
              current={page}
              total={(totalPosts / 8) * 10}
              onChange={(value) => setPage(value)}
              className="d-flex justify-content-center  text-dark my-5"
            />
          </div>
          {/* <div className="col-md-4">
            <Search />
            {state && state.user && state.user.following && (
              <Link href={`/user/following`}>
                <a className="h6">Following ({state.user.following.length})</a>
              </Link>
            )}
            <Card hoverable title="People may you know" className="my-3">
              <People people={people} handleFollow={handleFollow} />
            </Card>
          </div> */}
        </div>
        {/* <Modal
          visible={visible}
          onCancel={() => setVisible(false)}
          title="Comment"
          footer={false}
        >
          <CommentForm
            comment={comment}
            setComment={setComment}
            addComment={addComment}
          />
        </Modal> */}
      </div>
    </UserRoute>
  );
};

export default dashboard;
//
