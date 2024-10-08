import React from "react";
import { useNavigate } from "react-router-dom";

const PostsCard = ({ post }) => {
  const { title, description, imageUrl, user, id } = post;
  const navigate = useNavigate();

  return (
    <section>
      <div
        onClick={() => {
          console.log('Navigating to post with ID:', id); 
          navigate(`/post/${id}`);
        }}
        className="flex flex-col sm:flex-row gap-4 cursor-pointer border p-2"
      >
        <div className="flex-[2.5]">
          <p className="pb-2 font-semibold capitalize">{user}</p>
          <h2 className="text-xl font-bold line-clamp-2 leading-6 capitalize">
            {title}
          </h2>
          <div
            className="py-1 text-gray-500 line-clamp-2 leading-5"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        {imageUrl && (
          <div className="flex-[1]">
            <img
              src={imageUrl}
              alt="Post Image"
              className="w-[53rem] h-[8rem] object-cover"
            />
          </div>
        )}
      </div>
    </section>
  )
};

export default PostsCard;
