import { useState, useRef, useEffect } from "react";
import MessageBox from "../../components/MessageBox/MessageBox";
import ConversationMenuProfileComponent from "../../components/ConversationProfile/ConversationMenuProfileComponent";
import ConversationMenuComponent from "../../components/ConversationPage/ConversationMenuComponent";
import useConversationPage from "./ConversationPageController";
import MessageInput from "../../components/MessageInput/MessageInput";
import { FaUserCircle } from "react-icons/fa";

const ConversationPage = () => {
  const {
    messages,
    loggedId,
    conversationId,
    showProfile,
    setShowProfile,
    messageContainerRef,
    updateMessageArray,
  } = useConversationPage({
    conversation: { name: "", picture: "" },
    messages: [],
  });

  return (
    <div className="flex flex-col h-screen">
      <ConversationMenuComponent
        loggedId={loggedId}
        conversationId={conversationId}
        showProfile={showProfile}
        setShowProfile={setShowProfile}
        searchTerm={searchTerm}
        loopSearch={loopSearch}
        noResults={noResults}
        error={error}
      />
      <div className="bg-gray-100 flex flex-col justify-center mt-16"> {/* Adicionado mt-16 para compensar a navbar fixa */}
        <div className={`duration-300 ${showProfile ? "mr-[400px]" : ""}`}>
          <div className="px-[30px] py-[80px] justify-center scrollbar-hide">
            {searchedMessages.length > 0 ? (
              searchedMessages.map((message, index) => (
                <div
                  key={index}
                  className="conversation-item bg-gray-200 p-4 mb-4 rounded flex justify-between"
                  data-cy="searched-message"
                >
                  <div className="flex items-center">
                    <FaUserCircle className="text-gray-500 mr-4 text-4xl" />
                    <div>
                      <div className="text-xl font-bold mb-2 text-black-600">
                        {message.conversationName}
                      </div>
                      <p>{message.content}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <h2 className="text-sm font-semibold">{message.senderName}</h2>
                    <p className="text-sm text-gray-500">{new Date(message.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              ))
            ) : (
              messages?.length > 0
                ? messages.map((msg, index) => (
                    <MessageBox
                      key={index}
                      message={msg.message}
                      senderInfo={msg.senderInfo}
                      isOwnMessage={
                        loggedId?.toString() === msg.message.senderId?.toString()
                      } // Ajuste esta linha conforme necessário
                    />
                  ))
                : null
            )}
          </div>
          <div
            className={
              "fixed flex flex-col top-[69px] h-[calc(100%-127px)] w-[400px] bg-white z-10 duration-300" +
              (showProfile
                ? " right-0 border border-gray-300"
                : " right-[-100%]")
            }
          >
            <ConversationMenuProfileComponent
              loggedId={loggedId}
              conversationId={conversationId}
              setShowProfile={setShowProfile}
            />
          </div>
        </div>
      </div>
      <MessageInput
        onMessageSent={() => {
          updateMessageArray();
        }}
        loggedId={loggedId?.toString() || ""}
        conversationId={conversationId?.toString() || ""}
      />
    </div>
  );
};

export default ConversationPage;
