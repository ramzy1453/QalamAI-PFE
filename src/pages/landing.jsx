import { useState } from "react";
import ImageModal from "../components/ImageModal";
import { Configuration, OpenAIApi } from "openai";

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  })
);

export default function Landing() {
  console.log(process.env.REACT_APP_OPENAI_API_KEY);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prompt, setPrompt] = useState("");

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }
  const promptHandler = (e) => {
    setPrompt(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && document.activeElement === e.target) {
      prompt !== "" && openModal();
    }
  };

  return (
    <>
      {isModalOpen && (
        <ImageModal
          openModal={openModal}
          closeModal={closeModal}
          isModalOpen={isModalOpen}
          prompt={prompt}
          openai={openai}
        />
      )}
      <div className="flex flex-col h-screen px-12 lg:px-0">
        <div className="flex-[2]" />
        <div className="flex flex-[4] flex-col justify-evenly">
          <h1 className="text-5xl text-center my-8">
            Artistic Image Generation
          </h1>
          <div className="flex flex-col items-center space-y-6 lg:px-24">
            <input
              type="text"
              placeholder="Write your guess..."
              className="input input-lg input-bordered w-full"
              value={prompt}
              onChange={promptHandler}
              onKeyDown={handleKeyDown}
            />
            <button
              className="btn btn-outline w-block px-12"
              onClick={() => prompt !== "" && openModal()}
            >
              Generate !
            </button>
          </div>
        </div>
        <div className="flex-[2]" />
      </div>
    </>
  );
}
