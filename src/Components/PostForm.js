import React from "react";
import "../css/postForm.css";

function PostForm(props) {
  const emptyItem = {
    img: "",
    name: "",
    description: "",
    shipping: "",
  };

  const [formData, setFormData] = React.useState(emptyItem);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handlePost(formData);
    props.props.history.push("/");
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: [event.target.value],
    });
  };

  return (
    <div className="PostForm">
      <form className="form-post" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="image url"
          name="img"
          value={formData.img}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="item name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          className="input-description"
          type="text"
          placeholder="item description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <div className="btn-container">
          <input type="submit" className="btn-submit" value="Post" />
          <input type="submit" className="btn-cancel" value="Cancel" />
        </div>
      </form>
    </div>
  );
}

export default PostForm;
