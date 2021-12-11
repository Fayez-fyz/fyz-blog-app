import React from "react";
import { Avatar, Modal } from "antd";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import "react-quill/dist/quill.snow.css";
import { CameraOutlined, LoadingOutlined } from "@ant-design/icons";
// import { CameraOutlined, LoadingOutlined } from "@ant-design/icons";
const PostForm = ({
  content,
  setContent,
  postSubmit,
  title,
  setTitle,
  ok,
  setok,
  handleImage,
  uploading,
  image,
  edit,
}) => {
  return (
    <div>
      {edit !== "edit" && (
        <Modal
          className="h-75 w-75"
          title="Blog Editor"
          visible={ok}
          onCancel={() => setok(false)}
          footer={null}
        >
          <div className="card pb-3">
            <form className="form-group">
              <label>Blog Title</label>
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
                <Avatar size={35} src={image.url} className="mt-1 h5" />
              ) : uploading ? (
                <LoadingOutlined size={35} className="mt-2 fs-3" />
              ) : (
                <CameraOutlined
                  size={35}
                  className="mt-2 fs-3"
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
        </Modal>
      )}
      {edit == "edit" && (
        <>
          <div className="card bg-dark my-2 py-3 border-bottom-0 border border-2 border-primary rounded-2 regLog px-3 text-white ">
            <form className="form-group">
              <label>Blog Title</label>
              <input
                className="form-control bg-dark text-white"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Blog Title"
              />
              <ReactQuill
                theme="snow"
                value={content}
                onChange={(e) => setContent(e)}
                className="form-control bg-dark text-white"
                placeholder="Write something.."
              />
            </form>
          </div>
          <div className="card-footer border border-top-0 border-2 border-primary d-flex justify-content-between text-muted">
            <button
              disabled={!content || !title}
              onClick={postSubmit}
              className="btn btn-primary btn-sm "
            >
              Post
            </button>
            <label>
              {image && image.url ? (
                <Avatar size={35} src={image.url} className="" />
              ) : uploading ? (
                <LoadingOutlined size={35} className="mt-2" />
              ) : (
                <CameraOutlined
                  name="Upload Cover"
                  size={35}
                  className="mt-2"
                  style={{ cursor: "pointer" }}
                />
              )}
              <input
                onChange={handleImage}
                name="Upload Cover"
                type="file"
                accept="images/*"
                hidden
              />
            </label>
          </div>
        </>
      )}

      {/* <Modal
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
      </Modal> */}
    </div>
  );
};

export default PostForm;
