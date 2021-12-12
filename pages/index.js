import { PlusSquareOutlined } from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import ParallaxBG from "../components/cards/ParallaxBG";
import PostPublic from "../components/cards/PostPublic";
import { UserContext } from "../context";

const Home = ({ posts }) => {
  const [state] = useContext(UserContext);
  const router = useRouter();

  {
    state && state.token && state.user && router.push("/user/dashboard");
  }
  return (
    <>
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
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const  data  = await fetch(`${process.env.NEXT_PUBLIC_API}/posts`)
  const posts = await data.json()
  // console.log(posts)
 return {
    props: {
      posts
    },
  };
}


export default Home;
