// import React, { useState } from "react";
// // import styles from "../LandingPageModal/LandingPageModal.module.css";
// import styles from "../ModalIntro/ModalIntro.module.css"
// import Modal from "../Modal/Modal";

// const ModalIntro = ()  => {
//     const[modal, setModal] = useState(false);
//     const toggle = () => setModal(!modal);
//     return (
//         <>
//             <button className={styles.intro} onClick={() => toggle()}>INTRO</button>
//             <Modal className={styles.introModal} show={modal} close={toggle} title="INTRO">
//                 <p>
//                     Welcome to my Coding journey, where i test my progress.
//                 (modal paragraph styles to be updated)
//                 </p>
//             </Modal>
//         </>
//     )
// }

// export default ModalIntro;

// ************************New Code************************

import React, { useState } from "react";
import styles from "./ModalIntro.module.css";
import Modal from "../Modal/Modal";
// import TwitterFeed from "../TwitterFeed/TwitterFeed";

const ModalIntro = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <>
      <button className={styles.intro} onClick={toggle}>
        INTRO
      </button>
      <Modal show={modal} close={toggle} title="A Little About Me & My Journey">
        <div className={styles.introContent}>
          <p>
            Welcome to my coding journey! This portfolio is a living project
            where I experiment, learn, and showcase my progress as a developer.
          </p>
          <p>Below are some of my recent thoughts and updates from Twitter.</p>
        </div>
      </Modal>
    </>
  );
};

export default ModalIntro;
