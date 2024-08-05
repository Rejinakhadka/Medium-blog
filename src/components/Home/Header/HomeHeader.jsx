import React, { useState } from "react";
import { BsMedium } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { LiaEditSolid } from "react-icons/lia";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";

// import { Blog } from "../../../Context/Context";

import Search from "./Search";

const HomeHeader = () => {
//   const { allUsers, userLoading, currentUser, setPublish, title, description } =
//     Blog();
  const [modal, setModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { pathname } = useLocation();
//   const getUserData = allUsers?.find((user) => user.id === currentUser?.uid);

  const editPath = pathname.split("/")[1];
  const postId = pathname.split("/")[2];

  const navigate = useNavigate(null);

//   const handleEdit = async () => {
//     try {
//       setLoading(true);
//       const ref = doc(db, "posts", postId);
//       await updateDoc(ref, {
//         title,
//         desc: description,
//       });
//       navigate(`/post/${postId}`);
//       toast.success("Post has been updated");
//     } catch (error) {
//     } finally {
//       setLoading(false);
//     }
//   };

  return (
    <header className="border-b border-gray-200">
  
      <div className="size h-[60px] flex items-center justify-between">
        {/* left side  */}
        <div className="flex items-center gap-3">
          <Link to={"/"}>
            <span className="text-5xl">
              <BsMedium />
            </span>
          </Link>
          <Search modal={searchModal} setModal={setSearchModal}  />
        </div>
        {/* right side  */}
        <div className="flex items-center gap-3 sm:gap-7">
          <span
            onClick={() => setSearchModal(true)}
            className="flex sm:hidden text-3xl text-gray-300 cursor-pointer">
            <CiSearch />
          </span>
          {pathname === "/write" ? (
            <button
              onClick={() => setPublish(true)}
              className="btn !bg-green-700 !py-1 !text-white !rounded-full">
              Publish
            </button>
          ) : editPath === "editPost" ? (
            <button
              onClick={handleEdit}
              className={`btn !bg-green-700 !py-1 !text-white !rounded-full
              ${loading ? "opacity-40" : ""}
              `}>
              {loading ? "Updating..." : "Save and Update"}
            </button>
          ) : (
            <Link
              to="/write"
              className="hidden md:flex items-center gap-1 text-gray-500">
              <span className="text-3xl">
                <LiaEditSolid />
              </span>
              <span className="text-sm mt-2">Write</span>
            </Link>
          )}
          <span className="text-3xl text-gray-500 cursor-pointer">
            <IoMdNotificationsOutline />
          </span>
       
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;