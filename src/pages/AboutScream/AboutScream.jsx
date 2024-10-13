import React from "react";
import { Title } from "../../components/Title/Title";
import { Tokenomics } from "../Tokenomics/Tokenomics";

const AboutScream = () => {
  return (
    <div>
      <Title />
      <div>
        {/* description of the meme */}
        On July 14th, 2015, Instagram user @lonegoatsoap uploaded a video of a
        marmot making a loud squeaking noise while standing upright at Blackcomb
        Mountain in Whistler, British Columbia.
      </div>
      <Tokenomics/>
      {/* insert Meme Gallery */}
    </div>
  );
};

export default AboutScream;
