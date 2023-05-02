import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import Modal from "react-modal";
import useMediaQuery from "../hooks/useMediaQuery";

Modal.setAppElement("#modal");

export default function ImageModal({
  openModal,
  closeModal,
  isModalOpen,
  prompt,
  openai,
}) {
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const clearImage = useCallback(() => {
    setImage();
  }, []);

  const generation = useCallback(
    async function () {
      openModal();
      try {
        setLoading(true);
        const response = await openai.createImage({
          prompt,
          size: "512x512",
        });
        setImage(response.data.data[0].url);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [openModal, openai, prompt]
  );
  useEffect(() => {
    if (!isModalOpen) {
      clearImage();
    } else {
      generation();
    }
  }, [isModalOpen, generation, clearImage]);

  const { isXs } = useMediaQuery();
  return (
    <AnimatePresence>
      <Modal
        initial={{ opacity: 0 }}
        exit={{ opacity: 1 }}
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onAfterClose={clearImage}
        style={{
          content: {
            width: isXs ? "100%" : "512px",
            height: "512px",
            borderRadius: "1rem",
            left: "50%",
            top: "50%",
            transform: "translateX(-50%) translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
          },
        }}
      >
        {!image && (
          <div className="inline-block h-24 w-24 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        )}
        {image && (
          <div
            className="tooltip tooltip-bottom before:top-8"
            data-tip={`${prompt} - Click to generate another image`}
          >
            {!error && (
              <motion.img
                initial={{ scale: 1 }}
                whileTap={{ scale: 0.9 }}
                onTap={() => {
                  clearImage();
                  generation();
                }}
                style={{
                  borderRadius: "1rem",
                  cursor: "pointer",
                }}
                src={image}
                alt="Generated Image"
              />
            )}
            {error && (
              <div className="flex flex-col items-center space-y-4 text-red-600">
                <h1 className="text-2xl text-center">Error</h1>
                <p className="text-center">{error.message}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </AnimatePresence>
  );
}
