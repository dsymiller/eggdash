import React from 'react';

import { Grid, Image, Heading } from '@chakra-ui/react';

const FarmsHero = (props) => {
  return (
    <div className="farmsHero">
      <Grid>
        <div className="farmsHeroDetails">
          <Heading as="h1">Welcome to Egg Dash</Heading>
          <p className="mt">
            It was all a dream, I used to read Word Up! magazine Salt-n-Pepa and
            Heavy D up in the limousine Hangin' pictures on my wall Every
            Saturday Rap Attack, Mr. Magic, Marley Marl I let my tape rock 'til
            my tape popped Smokin' weed in Bambu, sippin' on Private Stock Way
            back, when I had the red and black lumberjack With the hat to match
            Remember Rappin' Duke? Duh-ha, duh-ha You never thought that hip-hop
            would take it this far Now I'm in the limelight 'cause I rhyme tight
            Time to get paid, blow up like the World Trade Born sinner, the
            opposite of a winner Remember when I used to eat sardines for dinner
            Peace to Ron G, Brucie B, Kid Capri Funkmaster Flex, Lovebug Starski
            I'm blowin' up like you thought I would Call the crib, same number,
            same hood It's all good (It's all good)
          </p>
        </div>
      </Grid>
    </div>
  );
};

export default FarmsHero;
