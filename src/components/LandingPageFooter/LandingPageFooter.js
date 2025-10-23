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
  const dreTweet = (
    <FontAwesomeIcon
      icon={faXTwitter}
      className="dreTweet"
      size="2x"
      color="lightblue"
    />
  );
  const dreGit = (
    <FontAwesomeIcon
      className="dreGit"
      icon={faGithub}
      hover="red"
      size="2x"
      color="yellow"
    />
  );
  const dreYoutube = <FontAwesomeIcon icon={faYoutube} size="2x" color="red" />;
  const dreLinkedin = (
    <FontAwesomeIcon icon={faLinkedin} size="2x" color="gray" />
  );
  const dreMedium = (
    <FontAwesomeIcon className="dreMed" icon={faMedium} size="2x" />
  );
  return (
    <div className={styles.contactIcons}>
      <a
        className="linkedIn"
        href="https://www.linkedin.com/in/andre-wilkinson/"
        target="blank"
      >
        {dreLinkedin}
      </a>
      <a
        className="youtube"
        href="https://www.youtube.com/watch?v=6Us5s49NBwY"
        target="blank"
      >
        {dreYoutube}
      </a>
      <a
        className="github"
        href="https://github.com/dredamonsta1"
        target="blank"
      >
        {dreGit}
      </a>
      <a
        className="twitter"
        href="https://x.com/Andrefullstacks"
        target="blank"
      >
        {dreTweet}
      </a>
      <a
        className="medium"
        href="https://medium.com/@andrefullstack"
        target="blank"
      >
        {dreMedium}
      </a>
    </div>
  );
}
export default LandingPageFooter;
