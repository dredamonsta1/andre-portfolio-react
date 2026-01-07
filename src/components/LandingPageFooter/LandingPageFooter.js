// import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faXTwitter,
//   faYoutube,
//   faGithub,
//   faLinkedin,
//   faMedium,
// } from "@fortawesome/free-brands-svg-icons";
// import styles from "./LandingPageFooter.module.css";

// function LandingPageFooter() {
//   const dreTweet = (
//     <FontAwesomeIcon
//       icon={faXTwitter}
//       className="dreTweet"
//       size="2x"
//       color="lightblue"
//     />
//   );
//   const dreGit = (
//     <FontAwesomeIcon
//       className="dreGit"
//       icon={faGithub}
//       hover="red"
//       size="2x"
//       color="yellow"
//     />
//   );
//   const dreYoutube = <FontAwesomeIcon icon={faYoutube} size="2x" color="red" />;
//   const dreLinkedin = (
//     <FontAwesomeIcon icon={faLinkedin} size="2x" color="gray" />
//   );
//   const dreMedium = (
//     <FontAwesomeIcon className="dreMed" icon={faMedium} size="2x" />
//   );
//   return (
//     <div className={styles.contactIcons}>
//       <a
//         className="linkedIn"
//         href="https://www.linkedin.com/in/andre-wilkinson/"
//         target="_blank"
//       >
//         {dreLinkedin}
//       </a>
//       <a
//         className="youtube"
//         href="https://www.youtube.com/watch?v=6Us5s49NBwY"
//         target="_blank"
//       >
//         {dreYoutube}
//       </a>
//       <a
//         className="github"
//         href="https://github.com/dredamonsta1"
//         target="_blank"
//       >
//         {dreGit}
//       </a>
//       <a
//         className="twitter"
//         href="https://x.com/Andrefullstacks"
//         target="_blank"
//       >
//         {dreTweet}
//       </a>
//       <a
//         className="medium"
//         href="https://medium.com/@andrefullstack"
//         target="_blank"
//       >
//         {dreMedium}
//       </a>
//     </div>
//   );
// }
// export default LandingPageFooter;

// ****************************************

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faYoutube,
  faGithub,
  faLinkedin,
  faMedium,
} from "@fortawesome/free-brands-svg-icons";
import styles from "./LandingPageFooter.module.css";

function LandingPageFooter() {
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: faLinkedin,
      url: "https://www.linkedin.com/in/andre-wilkinson/",
      color: "#0077b5",
      className: "linkedIn",
    },
    {
      name: "YouTube",
      icon: faYoutube,
      url: "https://www.youtube.com/watch?v=6Us5s49NBwY",
      color: "#ff0000",
      className: "youtube",
    },
    {
      name: "GitHub",
      icon: faGithub,
      url: "https://github.com/dredamonsta1",
      color: "#ffd700",
      className: "github",
    },
    {
      name: "Twitter",
      icon: faXTwitter,
      url: "https://x.com/Andrefullstacks",
      color: "#87ceeb",
      className: "twitter",
    },
    {
      name: "Medium",
      icon: faMedium,
      url: "https://medium.com/@andrefullstack",
      color: "#000000",
      className: "medium",
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.socialSection}>
          <h3 className={styles.connectTitle}>Let's Connect</h3>
          <div className={styles.contactIcons}>
            {socialLinks.map((social) => (
              <a
                key={social.name}
                className={social.className}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                <FontAwesomeIcon
                  icon={social.icon}
                  size="2x"
                  color={social.color}
                />
              </a>
            ))}
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Andre Wilkinson. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default LandingPageFooter;
