import React, { useRef, useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import ReactQuill from "react-quill";
import TagsInput from "react-tagsinput";
import axios from 'axios';
import { Blog } from "../../../Context/Context";

const Preview = () => {
  const { setPublish, title, setTitle, description, setDescription, addPost, imageUrl, setImageUrl, tags, setTags } = Blog();
  const imageRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    imageRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const postData = {
        title,
        description,
        imageUrl,
        tags,
      };

      // Save data to local storage
      localStorage.setItem('draftPost', JSON.stringify(postData));

      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Update the global state
      addPost(response.data);

      console.log('Post published successfully:', response.data);
      setPublish(false);
    } catch (error) {
      console.error('Error publishing post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="absolute inset-0 bg-white z-30">
      <div className="size my-[2rem]">
        <span
          onClick={() => setPublish(false)}
          className="absolute right-[1rem] md:right-[5rem] top-[3rem] text-2xl cursor-pointer">
          <LiaTimesSolid />
        </span>
        <div className="mt-[8rem] flex flex-col md:flex-row gap-10">
          <div className="flex-[1]">
            <h3>Story Preview</h3>
            <div
              style={{ backgroundImage: `url(${imageUrl})` }}
              onClick={handleClick}
              onChange={setImageUrl}
              className="w-full h-[200px] object-cover bg-gray-100 my-3 grid 
                place-items-center cursor-pointer bg-cover bg-no-repeat ">
              {!imageUrl && "Add Image"}
            </div>
            <input
              onChange={handleFileChange}
              ref={imageRef}
              type="file"
              hidden
            />
            <input
              type="text"
              placeholder="Title"
              className="outline-none w-full border-b border-gray-300 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <ReactQuill
              theme="bubble"
              value={description}
              onChange={setDescription}
              placeholder="Tell Your Story..."
              className="py-3 border-b border-gray-300"
            />
            <p className="text-gray-500 pt-4 text-sm">
              <span className="font-bold">Note:</span> Changes here will affect
              how your story appears in public places like Medium’s homepage and
              in subscribers’ inboxes — not the contents of the story itself.
            </p>
          </div>
          <div className="flex-[1] flex flex-col gap-4 mb-5 md:mb-0">
            <h3 className="text-2xl">
              Publishing to:
              <span className="font-bold capitalize">Rejina</span>
            </h3>
            <p>
              Add or change topics up to 5 so readers know what your story is
              about
            </p>
            <TagsInput value={tags} onChange={setTags} />
            <button
              onClick={handleSubmit}
              className="btn !bg-green-800 !w-fit !text-white !rounded-full">
              {loading ? "Submitting..." : "Publish Now"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Preview;
