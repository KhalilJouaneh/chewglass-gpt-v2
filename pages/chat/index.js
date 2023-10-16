import Navbar from "@/components/Navbar";
import { FaGooglePlay, FaArrowRight } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { GiElfHelmet } from "react-icons/gi";
import { IoIosPerson } from "react-icons/io";

export default function Chat() {
  const [input, setInput] = useState("");
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false); // state to handle loading

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
      <div className="bg-color h-screen flex justify-center pt-10">
        {/* <Navbar /> */}
        <div className="chat-container">
          <div className="chat-history">
            {chats.map((chat, index) => (
              <>
                <div key={index} className={`flex items-center text-[#F8F7F7]`}>
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
                  <span>{chat.text}</span>
                </div>
                {index < chats.length - 1 ? (
                  <div className="separator"></div>
                ) : null}
              </>
            ))}
            {loading && <div className="loading">...</div>}
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
        </div>
      </div>
    </>
  );
}

{
  /* <iframe
  ref={iframeRef}
  style={{ width: "80vw", height: "90vh" }}
  src="https://docsbot.ai/iframe/AQlopPkXnxW7eKsGqeSe/lnPRMgAXQgaYl0JG0uXj"
  frameBorder="0"
  allowTransparency="true"
></iframe> */
}
