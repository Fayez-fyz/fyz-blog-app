import {
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import Modal from "antd/lib/modal/Modal";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import renderHTML from "react-render-html";
import { UserContext } from "../../context";
import { imageSource } from "../../function";
import CommentForm from "../forms/CommentForm";

const SinglePost = ({
  posts,
  handleDelete,
  handleLike,
  handleUnlike,
  addComment,
  handleComment,
  comment,
  setComment,
  visible,
  setVisible,
  commentsCount = 10,
  removeComment,
}) => {
  const [state] = useContext(UserContext);

  const router = useRouter();
  return (
    <div>
      <div className="row">
        {posts && posts.postedBy && (
          <div key={posts._id} className="col-lg-12">
            <div className="card mt-4 bg-dark text-white border rounded-3 border-primary">
              <div className="card-header ">
                <Avatar size={40} src={imageSource(posts.postedBy)} />
                <span className="py-2 mx-1">{posts.postedBy.name}</span>
                <span className="py-2 mx-1 text-muted">
                  {moment(posts.createdAt).fromNow()}
                </span>
              </div>

              <img
                src={posts.image && posts.image.url}
                width="700"
                height="600"
                className="card-img-top"
                alt={posts.postedBy.name}
              />

              <div className="card-body">
                <h4 className="card-title text-white mt-3">{posts.title}</h4>
                <p className="card-text">{renderHTML(posts.content)}</p>
              </div>
              <div className="card-footer">
                <div className="d-flex">
                  {state &&
                  state.user &&
                  posts.likes &&
                  posts.likes.includes(state.user._id) ? (
                    <HeartFilled
                      onClick={() => {
                        if (state && state.token && state.user) {
                          handleUnlike(posts._id);
                        } else {
                          router.push("/login");
                        }
                      }}
                      className="text-primary pt-2 h5"
                    />
                  ) : (
                    <HeartOutlined
                      onClick={() => {
                        if (state && state.token && state.user) {
                          handleLike(posts._id);
                        } else {
                          router.push("/login");
                        }
                      }}
                      className="text-primary pt-2 h5"
                    />
                  )}
                  <div className="py-2 px-2">{posts.likes.length}</div>
                  <CommentOutlined
                    onClick={() => {
                      if (state && state.token && state.user) {
                        handleComment(posts);
                      } else {
                        router.push("/login");
                      }
                    }}
                    className="text-primary pt-2 h5"
                  />
                  <Modal
                    visible={visible}
                    onCancel={() => setVisible(false)}
                    title="comment"
                    footer={false}
                  >
                    <CommentForm
                      comment={comment}
                      setComment={setComment}
                      addComment={addComment}
                    />
                  </Modal>
                  <div className="py-2 px-2">
                    <a>{posts.comments.length}</a>
                  </div>
                  {state &&
                    state.user &&
                    state.user._id === posts.postedBy._id && (
                      <div className="ml-auto" style={{ marginLeft: "auto" }}>
                        <EditOutlined
                          onClick={() => router.push(`/user/post/${posts._id}`)}
                          className="text-primary mx-2 pt-2 h5 "
                        />

                        <DeleteOutlined
                          onClick={() => {
                            handleDelete(posts);
                            router.push("/user/dashboard");
                          }}
                          className="text-primary mx-2 pt-2 h5"
                        />
                      </div>
                    )}
                </div>
              </div>
            </div>
            <div className="my-2">
              {posts.comments && posts.comments.length > 0 && (
                <ol
                  className="list-group"
                  // style={{ maxHeight: "125px", overflow: "scroll" }}
                >
                  {posts.comments.slice(0, commentsCount).map((c) => (
                    <li
                      key={c._id}
                      className="list-group-item bg-dark text-white d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div>
                          <Avatar
                            size={40}
                            className="mb-1 mr-3"
                            src={imageSource(posts.postedBy)}
                          />

                          <b className="mx-2">{c.postedBy.name}</b>
                        </div>
                        <div className="mx-5">{c.text}</div>
                      </div>
                      <span className="badge rounded-pill text-muted">
                        {moment(c.created).fromNow()}
                        {state &&
                          state.user &&
                          state.user._id === c.postedBy._id && (
                            <div className="ml-auto mt-1">
                              <DeleteOutlined
                                onClick={() => removeComment(posts._id, c)}
                                className="pl-2 text-danger h5"
                              />
                            </div>
                          )}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
