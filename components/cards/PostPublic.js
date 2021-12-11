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
import React, { useContext } from "react";
import { UserContext } from "../../context";
import { imageSource } from "../../function";
import CommentForm from "../forms/CommentForm";
import renderHTML from "react-render-html";
const PostPublic = ({
  posts,
  commentsCount = 10,
  handleLike,
  handleUnlike,
  addComment,
  handleDelete,
  handleComment,
  comment,
  setComment,
  visible,
  setVisible,
  removeComment,
  viewcomment,
}) => {
  const [state] = useContext(UserContext);
  const router = useRouter();

  return (
    <>
      <div className="row my-2">
        {posts && posts.postedBy && (
          <div key={posts._id} className="col-lg-12">
            <div className="card bg-dark text-white cd h-100 border  rounded-3 border-primary">
              <div className="card-header ">
                <Avatar size={40} src={imageSource(posts.postedBy)} />
                <span className="py-2 mx-1">{posts.postedBy.name}</span>
                <span className="py-2 mx-1 text-muted">
                  {moment(posts.createdAt).fromNow()}
                </span>
              </div>
              <img
                src={posts.image && posts.image.url}
                width="400"
                height="250"
                className="card-img-top"
                alt={posts.postedBy.name}
              />

              <div className="card-body text-center text-white">
                <h5 className="card-title text-white">{posts.title}</h5>
                {viewcomment == "view" && (
                  <div className="card-text">{renderHTML(posts.content)}</div>
                )}
                {viewcomment !== "view" && (
                  <>
                    <Link href={`/post/view/${posts._id}`}>
                      <a className="btn btn-outline-primary">Read more</a>
                    </Link>
                  </>
                )}
              </div>
              <div className="card-footer">
                <div className="d-flex">
                  {state &&
                  state.user &&
                  posts.likes &&
                  posts.likes.includes(state.user._id) ? (
                    <HeartFilled
                      onClick={() => router.push("/login")}
                      className="text-primary pt-2 h5"
                    />
                  ) : (
                    <HeartOutlined
                      onClick={() => router.push("/login")}
                      className="text-primary pt-2 h5"
                    />
                  )}
                  <div className="py-2 px-2">{posts.likes.length}</div>
                  <CommentOutlined
                    onClick={() => router.push("/login")}
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
                          onClick={() => handleDelete(posts)}
                          className="text-primary mx-2 pt-2 h5"
                        />
                      </div>
                    )}
                </div>
              </div>
              {viewcomment == "view" && (
                <>
                  {posts.comments && posts.comments.length > 0 && (
                    <ol
                      className="list-group bg-dark"
                      style={{ maxHeight: "125px", overflow: "scroll" }}
                    >
                      {posts.comments.slice(0, commentsCount).map((c) => (
                        <li
                          key={c._id}
                          className="list-group-item d-flex justify-content-between align-items-start"
                        >
                          <div className="ms-2 me-auto">
                            <div>
                              <Avatar
                                size={30}
                                className="mb-1 mr-3"
                                src={imageSource(c.postedBy)}
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
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PostPublic;
