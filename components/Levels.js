import React from "react";
import { Button } from "semantic-ui-react";

const Levels = ({ levels }) => {
  return (
    <div>
      {levels &&
        levels.map(level => (
          <Button primary key={level.level}>
            {level.experience}
          </Button>
        ))}
    </div>
  );
};

export default Levels;
