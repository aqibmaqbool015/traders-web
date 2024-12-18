"use client";
import { Image_base } from "@/networking/network";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { getConversationsApi } from "./api";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomToast from "../components/toast";

const image = {
  search: "/search-alert.svg",
  sender: "/send.svg",
  avatar: "/chat-user.png",
  camera: "/camera.svg",
};

const SOCKET_SERVER_URL = "https://trade2trade.co.uk:5050/";
const Chats = () => {
  const [isChat, setIsChat] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const user = useSelector((state) => state?.User?.data);

  useEffect(() => {
    const getSenderId = async () => {
      const getUserId = localStorage.getItem("senderId");
      if (getUserId) {
        const JsonParseData = JSON.parse(getUserId);
        setSelectedUser(JsonParseData);
      }
    };
    getSenderId();
  }, []);

  useEffect(() => {
    fetchConverstaion();
  }, []);

  const fetchConverstaion = async () => {
    const data = await getConversationsApi();
    if (data?.data) {
      setIsChat(data?.data);
    }
  };

  const scrollRef = useRef(null);
  const socketRef = useRef(null);
  const socketSend = socketRef.current;
  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {
      autoConnect: false,
      transports: ["websocket"],
    });
    const socket = socketRef.current;
    socket.on("connect", () => {
      console.log("Connected to socket server");
    });
    socket.emit("addUser", {
      userId: user?._id,
      receiver: selectedUser?.participants?.length
        ? selectedUser?.participants[0]?._id
        : selectedUser?._id,
    });
    socket.on("userMsgs", (data) => {
      if (data?.messages.length) {
        setMessages(data?.messages);
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTo({
              top: scrollRef.current.scrollHeight,
              behavior: "smooth",
            });
          }
        }, 100);
      }
    });
    socket.on("getMessage", (data) => {
      if (data?.message) {
        setMessages((prevMessages) => [...prevMessages, data]);
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTo({
              top: scrollRef.current.scrollHeight,
              behavior: "smooth",
            });
          }
        }, 100);
      }
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });
    socket.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });
    socket.on("error", (err) => {
      console.error("Socket error:", err);
    });
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, [selectedUser]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
  };

  const onChatSelection = (data) => {
    setSelectedUser(data);
  };

  const onSendMessage = async () => {
    if (!message) {
      return;
    }
    const params = {
      senderId: user?._id,
      receiverId: selectedUser?.participants?.length
        ? selectedUser?.participants[0]?._id
        : selectedUser?._id,
      text: message,
      createdAt: new Date(),
      imgUrl: selectedUser?.messages?.imgUrl ?? selectedUser?.profilePicture,
    };
    await socketSend.emit("sendMessage", params);
    const localParams = {
      sender: user?._id,
      message: message,
      createdAt: new Date(),
      imgUrl: selectedUser?.messages?.imgUrl ?? selectedUser?.profilePicture,
    };
    setMessages((prevMessages) => [...prevMessages, localParams]);
    fetchConverstaion();
    setMessage("");
  };

  return (
    <>
      <div className=" px-8">
        <section className="mt-4">
          <label className="text-[18px] font-normal text-customDarkGray space-x-2 p-2">
            Search Traders
          </label>
          <div className="md:flex sm:flex items-center space-x-2 p-2 mt-1 ">
            <div className="relative flex items-center flex-1 py-1 rounded-[6px] border-2 border-customGray">
              <div className="w-[100%] rounded-[6px]">
                <input
                  type="search"
                  placeholder="Enter trader's first name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-4 pr-4 py-2 border-none shadow-none !outline-none active:outline-none border-transparent focus:outline-none w-[100%] rounded-[10px]"
                />
              </div>
              <div className="absolute right-12 ">
                <Image
                  src={image.search}
                  alt="img"
                  width={18}
                  height={18}
                  className="w-[18px] h-auto cursor-pointer"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="md:flex my-4">
          {isChat?.length === 0 ? (
            <p className="text-center text-customBlue">No Chats available</p>
          ) : (
            <>
              <div className="md:w-1/4 bg-transparent p-4 border-r cursor-pointer border-r-customLightBorder overflow-y-auto h-[600px] ">
                <div className="space-y-6">
                  {isChat?.length === 0 ? (
                    <p className="text-center text-customBlue">
                      No chat available
                    </p>
                  ) : (
                    isChat?.map((vehicle, index) => (
                      <div
                        key={index}
                        onClick={() => onChatSelection(vehicle)}
                        className="flex items-start space-x-3"
                      >
                        <Image
                          width={20}
                          height={20}
                          src={
                            `${Image_base}${vehicle?.messages?.imgUrl}` ||
                            image.avatar
                          }
                          alt="img"
                          className="w-[40px] h-[40px] rounded-full inline-block object-contain"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-customBlue ">
                            {vehicle?.participants[0]?.firstName}
                          </p>
                          <p className="text-sm text-customDarkGray">
                            {vehicle?.messages?.message}
                          </p>
                        </div>
                        <span className="text-xs text-customDarkGray relative right-0  block text-right mt-1">
                          {new Date(
                            vehicle?.messages?.createdAt
                          ).toLocaleString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
          {selectedUser && (
            <div className="md:w-3/4 flex flex-col overflow-y-auto h-[600px]">
              <div className="bg-white p-4 border-b border-b-customLightBorder flex">
                <Image
                  width={20}
                  height={20}
                  src={
                    `${Image_base}${
                      selectedUser?.messages?.imgUrl ??
                      selectedUser?.profilePicture
                    }` || image.avatar
                  }
                  alt="img"
                  className="w-[40px] h-[40px] rounded-full inline-block object-contain"
                />
                <h1 className="font-bold text-lg text-customBlue mx-3">
                  {selectedUser?.participants?.length
                    ? selectedUser?.participants[0]?.firstName
                    : selectedUser?.firstName}
                </h1>
              </div>
              <div className="flex-1 md:p-6 space-y-4 overflow-y-auto">
                <div className="text-center">
                  <p className="text-sm font-medium text-customDarkGray">
                    {new Date(
                      selectedUser?.messages?.createdAt ?? new Date()
                    ).toLocaleString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>
                {messages.map((message, index) => {
                  return (
                    <div
                      key={index}
                      className={`flex ${
                        message.sender !== user?._id
                          ? "justify-start items-end"
                          : "justify-end items-end"
                      }`}
                    >
                      <div
                        className={`max-w-xl p-4   ${
                          message.sender !== user?._id
                            ? "bg-customBlue text-white"
                            : "  bg-customCardBg text-customBlackDark"
                        } rounded-lg ml-3`}
                      >
                        <p>{message?.message}</p>
                        <span
                          className={`text-xs relative right-0 w-full block text-right mt-1 ${
                            message.sender !== user?._id
                              ? "text-white"
                              : "  text-customBlackDark"
                          }`}
                        >
                          {new Date(message?.createdAt).toLocaleString(
                            "en-GB",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}
                        </span>
                      </div>
                      {message.sender !== user?._id && (
                        <Image
                          width={20}
                          height={20}
                          src={`${Image_base}${message?.imgUrl}`}
                          alt="User Avatar"
                          className="rounded-full w-[40px] h-[40px] mx-3 object-contain inline-block "
                        />
                      )}
                      {message.sender === user?._id && (
                        <Image
                          width={20}
                          height={20}
                          src={`${Image_base}${message?.imgUrl}`}
                          alt="User Avatar"
                          className="rounded-full w-[40px] h-[40px] object-contain inline-block  ml-3"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="bg-white p-4 border-t-customLightBorder flex items-center">
                <div className="relative w-full">
                  <input
                    type="text"
                    className="w-full bg-transparent border-customLightBorder border p-3 rounded-[25px] outline-none placeholder:text-customSmallGray"
                    placeholder="Write a message..."
                    value={message}
                    onChange={(e) => setMessage(e?.target?.value)}
                  />
                  <span className="absolute right-3 top-3">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="imageInput"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="imageInput">
                      <Image
                        width={20}
                        height={20}
                        src={image.camera}
                        alt="img"
                        className="cursor-pointer w-[25px] h-[25px] object-contain inline-block align-top"
                      />
                    </label>
                  </span>
                </div>
                <Image
                  width={20}
                  height={20}
                  src={image.sender}
                  alt="img"
                  className="inline-block mx-2 w-[50px] h-[50px] object-contain cursor-pointer"
                  onClick={() => onSendMessage()}
                />
              </div>
            </div>
          )}
        </div>
        <ToastContainer position="top-right" />
      </div>
    </>
  );
};

export default Chats;
