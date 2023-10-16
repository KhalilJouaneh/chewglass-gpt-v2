import Navbar from "@/components/Navbar";
import { FaGooglePlay, FaArrowRight } from "react-icons/fa";
import React, { useState, useRef, useEffect } from "react";
import { GiElfHelmet } from "react-icons/gi";
import { IoIosPerson } from "react-icons/io";
// import ReactMarkdown from "react-markdown";
import Markdown from "@/utils/Markdown";
import styles from "../../styles/Home.module.css";
import { Scrollbar } from "react-scrollbars-custom";
import ReactLoading from "react-loading";

export default function Chat() {
  const [input, setInput] = useState("");
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const divRef = useRef(null);

  const [showStarters, setShowStarters] = useState(true);

  const handleStarterSelect = (question) => {
    setInput(question);
    setShowStarters(false);
  };

  const StarterOptions = ({ onSelect }) => {
    const options = [
      {
        title: "Underdog API",
        subtitle: "What can I build using Underdog API?",
      },
      { title: "UXD", subtitle: "Why should I mint UXD?" },
      { title: "Helius", subtitle: "Write code to query NFTs using Helius." },
      { title: "Jupiter", subtitle: "Use the Jupiter API to create a swap transaction." },
    ];

    return (
      <div className="starter-options-container fixed bottom-[20%] left-1/2 transform -translate-x-1/2 pb-4">
        <div className="grid grid-cols-2 gap-7">
          {options.map((option, index) => (
            <div
              key={index}
              className="starter-option cursor-pointer text-center border border-[#a1a1aa] rounded shadow"
              onClick={() => onSelect(option.subtitle)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="option-title font-semibold text-left pb-1 pt-1">
                    {option.title}
                  </div>
                  <div className="option-subtitle font-normal text-sm pb-1">
                    {option.subtitle}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const LoadingAnimation = ({ type, color }) => (
    <ReactLoading type={type} color={color} height={25} width={40} />
  );

  async function postChat(question) {
    setLoading(true); // set loading to true when starting the API call
    try {
      chats.forEach((chat, index) => {
        if (!chat.hasOwnProperty("text")) {
          console.error(
            `Chat item at index ${index} does not have a 'text' property`,
            chat
          );
        }
      });

      const history = chats
        .filter((chat) => chat.text !== undefined && chat.text !== null) // filter chats first
        .map((chat) => [chat.text]); // then map to the expected structure

      console.log("Sending history:", history);

      const requestBody = { question, history };

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await res.json();
      console.log("Received response:", data);

      setChats((prevChats) => [
        ...prevChats,
        { text: data.answer, type: "answer" },
      ]); // using functional update
    } catch (error) {
      console.error("Error posting chat", error);
    } finally {
      setLoading(false); // set loading to false after API call is finished
    }
  }

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!input.trim()) return;

    setChats((prevChats) => [...prevChats, { text: input, type: "question" }]);

    await postChat(input); // post the chat without the history parameter here

    setInput("");
  };

  return (
    <>
      <div className="bg-color h-[100%]">
        <Navbar />
        <div className=" flex justify-center pt-10">
          <div className="chat-container">
            {/* <Scrollbar
          maximalThumbSize={100}
          trackYProps={{
            style: { backgroundColor: "transparent", right: "-5px" },
          }}
          thumbYProps={{
            style: { backgroundColor: "#014F52", width: "5px" },
          }}
        > */}

            <div className="chat-history">
              {chats.map((chat, index) => (
                <React.Fragment key={index}>
                  <div
                    className={`flex ${
                      chat.type === "answer" ? "items-start" : "items-center"
                    } text-[#F8F7F7] w-[100%] ${
                      index < chats.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <div
                      style={{
                        flexShrink: 0,
                        flexGrow: 0,
                        width: "55px",
                        padding: "20px 0",
                      }}
                    >
                      <div
                        className={`icon-container ${
                          chat.type === "answer" ? "bg-black" : "bg-white"
                        }`}
                      >
                        {chat.type === "answer" ? (
                          <GiElfHelmet size={23} />
                        ) : (
                          <IoIosPerson size={30} color="black" />
                        )}
                      </div>
                    </div>
                    {chat.type === "answer" ? (
                      <div className={`${styles.markdownanswer} mt-5`}>
                        <Markdown markdown={chat.text} />
                      </div>
                    ) : (
                      <span>{chat.text}</span>
                    )}
                  </div>
                  {index < chats.length - 1 ? (
                    <div className="separator"></div>
                  ) : null}
                </React.Fragment>
              ))}
              {loading && (
                <div className="loading">
                  {LoadingAnimation("balls", "#ffffff")}
                </div>
              )}
              {showStarters && (
                <StarterOptions onSelect={handleStarterSelect} />
              )}
            </div>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={input}
                onChange={handleInput}
                placeholder="Type your question"
              />
              <button type="submit" className="send-button">
                Send
              </button>
            </form>
            {/* </Scrollbar> */}
          </div>
        </div>
      </div>
    </>
  );
}
