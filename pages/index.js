import Modal from "antd/lib/modal/Modal";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import ParallaxBG from "../components/cards/ParallaxBG";
import PostPublic from "../components/cards/PostPublic";
import { UserContext } from "../context";
import dynamic from "next/dynamic";
import toast from "react-toastify";
import {
  CameraOutlined,
  LoadingOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import UserRoute from "../components/routes/UserRoute";
import { useRouter } from "next/router";
import { Pagination } from "antd";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Home = ({ posts }) => {
  const [state] = useContext(UserContext);
  const router = useRouter();

  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");

  //   const [image, setImage] = useState({});
  //   const [uploading, setUploading] = useState(false);

  // useEffect(() => {
  //   if (state && state.token) {
  //     posts;
  //   }
  // }, [state && state.token]);

  // const postSubmit = async (e) => {
  //   e.preventDefault();
  //   // console.log('Post =>',content)
  //   try {
  //     const { data } = await axios.post("/create-post", {
  //       title,
  //       content,
  //       image,
  //     });
  //     console.log("created post", data);
  //     if (data.error) {
  //       toast.error(data.error);
  //     } else {
  //       // setPage(1);
  //       newsFeed();
  //       toast.success("Post created");
  //       setTitle("");
  //       setContent("");
  //       setImage({});
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleLike = async (_id) => {
  //   // console.log('Like this post',_id)
  //   try {
  //     const { data } = await axios.put("/like-post", { _id });
  //     // console.log('Liked',data)
  //     posts;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const handleUnlike = async (_id) => {
  //   // console.log('unLike this post',_id)
  //   try {
  //     const { data } = await axios.put("/unlike-post", { _id });
  //     // console.log('Unliked',data)
  //     // newsFeed()
  //     posts;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const handleImage = async (e) => {
  //   const file = e.target.files[0];
  //   let formData = new FormData();
  //   formData.append("image", file);
  //   // console.log([...formData])
  //   setUploading(true);

  //   try {
  //     const { data } = await axios.post("/upload-image", formData);
  //     // console.log("uploader image =>", data);
  //     setImage({
  //       url: data.url,
  //       public_id: data.public_id,
  //     });
  //     setUploading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setUploading(false);
  //   }
  // };
  //   const [totalPost, setTotalPost] = useState(0);
  //   const [page, setPage] = useState(1);
  // useEffect(() => {
  //     try {
  //       axios.get("/total-posts").then(({ data }) =>{
  //         setTotalPost(data)
  //       })
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }, []);
  //   const newsFeed = async () => {
  //     try {
  //       const { data } = await axios.get(`/news-feed/${page}`);
  //       console.log("user posts", data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  // {
  //   state && state.token && state.user && router.push("/user/dashboard");
  // }

  return (
    <div>
      <ParallaxBG url="/images/bodg-bg.jpg"> BLOGS </ParallaxBG>
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-primary"
          onClick={() => router.push("/login")}
        >
          <PlusSquareOutlined className=" fs-3" />
          <span className="fs-6"> Create Post</span>
        </button>
      </div>
      {/* {state && state.token && state.user && (
        <>
          <button className="btn btn-primary" onClick={() => setok(true)}>
            Create Post
          </button>
          <Modal
            className="h-75 w-75"
            title="Blog Editor"
            visible={ok}
            onCancel={() => setok(false)}
            footer={null}
          >
            <div className="card body pb-3">
              <form className="form-group">
                <input
                  className="form-control"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Blog Title"
                />
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={(e) => setContent(e)}
                  className="form-control"
                  placeholder="Write something.."
                />
              </form>
            </div>
            <div className="card-footer d-flex justify-content-between text-muted">
              <button
                disabled={!content || !title}
                onClick={postSubmit}
                className="btn btn-primary btn-sm mt-1"
              >
                Post
              </button>
              <label>
                {image && image.url ? (
                  <Avatar size={35} src={image.url} className="mt-1" />
                ) : uploading ? (
                  <LoadingOutlined size={35} className="mt-2" />
                ) : (
                  <CameraOutlined
                    size={35}
                    className="mt-2"
                    style={{ cursor: "pointer" }}
                  />
                )}
                <input
                  onChange={handleImage}
                  type="file"
                  accept="images/*"
                  hidden
                />
              </label>
            </div>
          </Modal>{" "}
        </>
      )} */}
      <div className="container">
        <div className="row pt-3">
          {posts.map((post) => (
            <div key={post._id} className="col-md-4 my-2">
              <PostPublic
                // handleLike={handleLike}
                // handleUnlike={handleUnlike}
                key={post._id}
                posts={post}
              />
            </div>
          ))}
          {/* <Pagination
            current={page}
            total={(totalPosts / 8) * 10}
            onChange={(value) => setPage(value)}
            className="d-flex justify-content-center text-dark my-5"
          /> */}
        </div>
      </div>

      {/* <pre>{JSON.stringify(posts,null,4)}</pre> */}
    </div>
  );
};
export async function getServerSideProps() {
  const { data } = await axios.get("/posts");

  return {
    props: {
      posts: data,
    },
  };
}
export default Home;
