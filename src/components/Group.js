import React, { use, useState, useEffect } from "react";
import Navbar from "./Navbar";
import Profilephoto from "./profile.png";
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa";
import { MdSend } from "react-icons/md";
export default function Group(props) {
  const [inputText, setinputText] = useState("");
  const [bold, setbold] = useState(false);
  const [displayreport, setdisplayreport] = useState(false);
  const [italic, setitalic] = useState(false);
  const [underline, setunderline] = useState(false);
  const currGroup = localStorage.getItem("currGroup");
  const handleOnTextChange = (event) => {
    setinputText(event.target.value);
  };
  const HandleOnBold = () => {
    console.log(inputText);
  };
  const HandleOnItalic = () => {};
  const HandleOnUnderline = () => {};
  const HandleOnSendChat = async () => {
    try {
      let res = await fetch(
        `http://localhost:3001/user/group/${group._id}/chat/new`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          header: {
            token: `${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            content: inputText,
            isConfession: true,
          }),
        }
      );

      let data = await res.json();
      if (res.ok) {
        alert(data.message);
      } else {
        alert("Something went wrong");
      }
      await getChatsOfGroup();
    } catch (error) {}
  };
  const HandleOnLeaveGroup = async () => {
    try {
      let res = await fetch(
        `http://localhost:3001/user/group/${group._id}/exit`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
          header: {
            token: `${localStorage.getItem("token")}`,
          },
        }
      );
      let data = await res.json();
      if (res.ok) {
        alert(data.message);
      } else {
        alert("something went wrong");
      }
    } catch (error) {}
  };

  const [groupChat, setgroupChat] = useState([]);
  const [loading, setLoading] = useState(true); // Show loading state
  let group = JSON.parse(localStorage.getItem("currGroup"));
  const [selectedChat, setSelectedChat] = useState(""); 
  
  async function getChatsOfGroup() {
    try {
      let res = await fetch(
        `http://localhost:3001/user/group/${group._id}/chat`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
          header: {
            token: `${localStorage.getItem("token")}`,
          },
        }
      );
      let data = await res.json();
      console.log(data);
      setgroupChat(data.chats);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getChatsOfGroup();
  }, []);

  const handleOnMenu = (menuSlider) => {
    if (menuSlider) {
      document.querySelector(".GroupChating_maincontainer").style.marginLeft =
        "0px";
    } else {
      document.querySelector(".GroupChating_maincontainer").style.marginLeft =
        "15vw";
    }
  };

  const handleOnGenerateCode = async () => {
    try {
      let res = await fetch(
        `http://localhost:3001/user/group/${group._id}/inviteCode/generate`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
          header: {
            token: `${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.ok) {
        let data = await res.json();
        let inviteCode = data.inviteCode;
        document.querySelector(".Group_descripation button").innerText =
          inviteCode;
      } else {
        alert("Error");
      }
    } catch (error) {}
  };
  const HadleOnReport = (elem) => {
    if (displayreport) {
      document.querySelector(".group_chat_option").style.display = "none";
      setdisplayreport(false);
    } else {
      document.querySelector(".group_chat_option").style.display = "flex";
      setSelectedChat(elem._id);
      setdisplayreport(true);
    }
  };

  const reportChat = async(elem)=>{
    console.log("Storing : ")
    console.log(elem);
    alert();
    localStorage.setItem("reportedChat",elem._id);
    window.location.href="http://localhost:3000/user/report";
  }
  return (
    <>
      <div>
        <Navbar menuOnclick={handleOnMenu} userDetails="[]"></Navbar>
        <div className="GroupChating_maincontainer">
          <div className="GroupChating_info">
            <div>
              <img src={Profilephoto}></img>
            </div>
            <div className="Group_descripation">
              <h1>{group.name}</h1>
              <button type="button" onClick={handleOnGenerateCode}>
                Genrate code
              </button>
            </div>
            <div className="Group_memberDetails">
              <div>
                <p className="ListOfMember">Member</p>
              </div>
              <div>
                <ul>
                  {group.members.map((elem) => {
                    if (elem == group.admin) return <li>{elem + "- admin"}</li>;
                    return <li>{elem}</li>;
                  })}
                </ul>
                <button type="button" onClick={HandleOnLeaveGroup}>
                  Leave the Group
                </button>
              </div>
            </div>
          </div>
          <div className="GroupChat_container">
            <div className="GroupChats">
              <ul>
                {groupChat.map((elem) => {
                  return (
                    <li onClick={()=>{HadleOnReport(elem);}}>
                      <p>{elem.content}</p>
                      <span className="group_chat_option">
                        <button className="report" onClick={()=>{reportChat(elem)}}>report</button>
                        <button className="delete">delete</button>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="SendChats">
              <div className="SendChats_option">
                <button type="button" onClick={HandleOnBold}>
                  <FaBold size={20}></FaBold>
                </button>
                <button type="button" onClick={HandleOnItalic}>
                  <FaItalic size={20}></FaItalic>
                </button>
                <button type="button" onClick={HandleOnUnderline}>
                  <FaUnderline size={20}></FaUnderline>
                </button>
              </div>
              <div className="SendChats_area">
                <textarea
                  value={inputText}
                  onChange={handleOnTextChange}
                ></textarea>
              </div>
              <div className="SendChats_btn">
                <button type="button" onClick={HandleOnSendChat}>
                  <MdSend size={25}></MdSend>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
