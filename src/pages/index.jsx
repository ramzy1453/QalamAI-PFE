import GIF from "../assets/8351224.webp";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Index() {
  return (
    <AnimatePresence>
      <motion.div
        className="text-white flex flex-col px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        exit={{ opacity: 0 }}
        style={{
          backgroundImage: `url(${GIF})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "calc(100vh - 64px)",
        }}
      >
        <div className="absolute top-[64px] left-0 bottom-0 right-0 bg-black opacity-50" />
        <div className="flex-[2]" />
        <div className="flex flex-col justify-evenly items-center flex-[4] space-y-4">
          <motion.h1
            className="text-7xl relative text-center"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            exit={{ y: 50, opacity: 0 }}
          >
            Qalam AI
          </motion.h1>
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-4xl relative text-center"
          >
            Turn your imagination into reality !
          </motion.h1>
          <Link to="/landing" className="btn-push red">
            <div className="btn-push-text uppercase">Press Start</div>
          </Link>
        </div>
        <div className="flex-[4]" />
      </motion.div>
    </AnimatePresence>
  );
}
