import React, { useState, useEffect } from "react";
import Header from "../../components/Layout/Header";
import styles from "../../styles/styles";
import Loader from "../../components/Layout/Loader";
import ProfileSideBar from "../../components/Profile/ProfileSidebar";
import ProfileContent from "../../components/Profile/ProfileContent";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [active, setActive] = useState(1);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
            <div className="w-[50px] 800:w-[335px] sticky 800:mt-0 mt-[18%]">
              <ProfileSideBar active={active} setActive={setActive} />
            </div>
            <ProfileContent active={active} />
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;