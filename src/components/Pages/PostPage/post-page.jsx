import "./post-page.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Commentary from "./commentary";

export default function PostPage() {
  const params = useParams();
  let navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLoginRedirect = () => routeChange("/login");
  const handlePostsRedirect = () => routeChange("/posts");

  const routeChange = (path) => {
    navigate(path);
  };

  const [postData, setPostData] = useState({
    id: "",
    commentaries: [],
    creator: {
      email: "",
      username: "",
      createdOn: "",
    },
    theme: "",
    content: "",
    createdOn: "",
  });

  const [commentaryData, setCommentaryData] = useState("");

  const [errors, setErrors] = useState({
    token: "",
    commentary: "",
  });

  useEffect(() => {
    getPostInfo();
  }, []);

  const getPostInfo = () => {
    fetch(`http://localhost:8080/a/rest/posts/${params.postId}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.id) {
          setPostData(res);
          return;
        }
        console.log(res);
        setError("postId", "Post not found", "Post not found");
      });
  };

  const postCommentary = () => {
    if (!validateFields()) {
      fetch("http://localhost:8080/a/rest/posts/commentary", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({
          commentary: commentaryData,
          postId: postData.id,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.errors) {
            for (const [key, value] of Object.entries(res.errors)) {
              setError(`${key}`, value, value);
            }
            return;
          }
          getPostInfo();
          setCommentaryData("");
        });
    }
  };

  const validateFields = () => {
    error = false;
    setErrors((state) => ({
      ...state,
      commentary: "",
    }));

    setError("commentary", "Commentary cannot be empty", !commentaryData);

    return error;
  };
  let error = false;

  const setError = (type, errorString, condition) => {
    if (condition) {
      error = true;
      if (type === "token") {
        toast(errorString + ". Please Sign in again.", {
          progressClassName: "red-progress",
        });
        localStorage.removeItem("token");
        handleLoginRedirect();
        return;
      } else if (type === "postId") {
        toast(errorString, {
          progressClassName: "red-progress",
        });
        handlePostsRedirect();
        return;
      }
      if (type === "email") {
        toast(errorString, {
          progressClassName: "red-progress",
        });
        localStorage.removeItem("token");
        handleLoginRedirect();
        return;
      }
      setErrors((state) => ({ ...state, [type]: errorString }));
    }
  };

  const handleChange = (e) => {
    setCommentaryData(e.target.value);
  };
  return (
    <div className="post-page-main">
      <p
        style={{
          fontSize: "28px",
          paddingLeft: "20px",
          marginBottom: "20px",
          paddingTop: "20px",
        }}
      >
        Post:
      </p>
      <Card
        className="post-card"
        variant="outlined"
        sx={{ marginLeft: "20px" }}
      >
        <CardContent sx={{ height: "100%" }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Author: {postData.creator.username}
          </Typography>
          <Typography variant="h5" component="div">
            {postData.theme}
          </Typography>
          <div style={{ height: "100px" }}>
            <Typography
              variant="p"
              component="div"
              sx={{
                marginTop: "10px",
                height: "100%",
                wordWrap: "break-word",
                overflow: "hidden",
                fontSize: "16px",
              }}
            >
              {postData.content}
            </Typography>
          </div>
        </CardContent>
      </Card>
      <p
        style={{
          fontSize: "28px",
          paddingLeft: "20px",
          marginBottom: "20px",
          marginTop: "50px",
        }}
      >
        Comments:
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        {postData.commentaries.map((value) => (
          <Commentary data={value} key={value.id}></Commentary>
        ))}
      </div>
      <div
        style={{ display: "flex", alignItems: "center", margin: "40px 20px" }}
      >
        <TextField
          onChange={handleChange}
          value={commentaryData}
          error={Boolean(errors?.commentary)}
          helperText={errors?.commentary}
          required
          fullWidth
          name="commentary"
          label="Enter your commentary"
          id="commentary"
        />
        <Button
          onClick={postCommentary}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ ml: 3, width: "300px", height: "56px" }}
        >
          Comment
        </Button>
      </div>
    </div>
  );
}
