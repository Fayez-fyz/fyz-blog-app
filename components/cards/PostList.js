import React, { useContext, useState } from "react";
import { Avatar, Modal } from "antd";
// import renderHTML from 'react-render-html'
import moment from "moment";
import {
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import Link from "next/link";
import { imageSource } from "../../function";
// import CommentForm from "../forms/CommentForm";

const PostList = ({
  posts,
  view,
  handleDelete,
  handleLike,
  handleUnlike,
  handleComment,
}) => {
  const [state] = useContext(UserContext);

  const router = useRouter();

  return (
    <div>
      <div className="row row-cols-1 row-cols-lg-3 g-4 my-2">
        {posts &&
          posts.map((post) => (
            <div key={post._id} className="col">
              <div className="card bg-dark text-white cd h-100 border  rounded-3 border-primary">
                <div className="card-header ">
                  <Avatar size={40} src={imageSource(post.postedBy)} />
                  <span className="py-2 mx-1">{post.postedBy.name}</span>
                  <span className="py-2 mx-1 text-muted">
                    {moment(post.createdAt).fromNow()}
                  </span>
                </div>
                <img
                  src={post.image && post.image.url}
                  width="400"
                  height="250"
                  className="card-img-top"
                  alt={post.postedBy.name}
                />

                <div className="card-body text-center text-white ">
                  <h5 className="card-title text-white">{post.title}</h5>
                  <Link href={`/post/${post._id}`}>
                    <a className="btn btn-outline-primary">Read more</a>
                  </Link>
                </div>
                <div className="card-footer">
                  <div className="d-flex">
                    {state &&
                    state.user &&
                    post.likes &&
                    post.likes.includes(state.user._id) ? (
                      <HeartFilled
                        onClick={() => handleUnlike(post._id)}
                        className="text-primary pt-2 h5"
                      />
                    ) : (
                      <HeartOutlined
                        onClick={() => handleLike(post._id)}
                        className="text-primary pt-2 h5"
                      />
                    )}
                    <div className="py-2 px-2">{post.likes.length}</div>
                    <CommentOutlined
                      onClick={() => handleComment(post)}
                      className="text-primary pt-2 h5"
                    />
                    <div className="py-2 px-2">
                      <a>{post.comments.length}</a>
                    </div>
                    {state &&
                      state.user &&
                      state.user._id === post.postedBy._id && (
                        <div className="ml-auto" style={{ marginLeft: "auto" }}>
                          <EditOutlined
                            onClick={() =>
                              router.push(`/user/post/${post._id}`)
                            }
                            className="text-primary mx-2 pt-2 h5 "
                          />
                          <DeleteOutlined
                            onClick={() => handleDelete(post)}
                            className="text-primary mx-2 pt-2 h5"
                          />
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PostList;
