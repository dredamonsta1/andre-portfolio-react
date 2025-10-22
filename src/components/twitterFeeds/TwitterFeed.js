import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import styles from "./TwitterFeed.module.css";

const TwitterFeed = () => {
  return (
    <div className={styles.twitterContainer}>
      <h3 className={styles.feedHeader}>Latest Tweets</h3>
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="andre_fullstack" // IMPORTANT: Replace with your Twitter screen name
        options={{ height: 400, width: "100%" }}
        theme="dark"
        noHeader
        noFooter
        noBorders
        noScrollbar
        lang="en"
      />
    </div>
  );
};

export default TwitterFeed;
