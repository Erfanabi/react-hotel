import { HiMinusSm, HiPlusSm } from "react-icons/hi";

function QuestOptionList({ option, handleOption }) {
  return (
    <div className="guestOptions">
      <QuestOptionItem
        type="adult"
        option={option}
        handleOption={handleOption}
        minLimit="1"
      />
      <QuestOptionItem
        type="children"
        option={option}
        handleOption={handleOption}
        minLimit="0"
      />
      <QuestOptionItem
        type="room"
        option={option}
        handleOption={handleOption}
        minLimit="1"
      />
    </div>
  );
}

export default QuestOptionList;

function QuestOptionItem({ type, option, handleOption, minLimit }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          className="optionCounterBtn"
          onClick={() => handleOption(type, "dec")}
          disabled={option[type] <= minLimit}
        >
          <HiMinusSm className="icon" />
        </button>
        <span className="optionCounterNumber">{option[type]}</span>
        <button
          className="optionCounterBtn"
          onClick={() => handleOption(type, "inc")}
        >
          <HiPlusSm className="icon" />
        </button>
      </div>
    </div>
  );
}
