import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = [...(data?.focus || [])].sort((evtA, evtB) =>  // const byDateDesc = data?.focus.sort((evtA, evtB) => correction SW
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
    // Correction SW
    useEffect(() => {
      const interval = setInterval(() => {
        setIndex((prevIndex) =>
          prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
        );
      }, 5000); // Toutes les 5 secondes
    
      return () => clearInterval(interval);
    }, [byDateDesc.length]);

   return (
    <div className="SlideCardList">
      <div className="SlideCardWrapper">
        {byDateDesc?.map((event, idx) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={`slide-${idx}`}
            className={`SlideCard ${
              index === idx ? "SlideCard--display" : "SlideCard--hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
        ))}
      </div>


<div className="SlideCard__paginationContainer">
  <div className="SlideCard__pagination">
    {byDateDesc.map((_, radioIdx) => (
      <input
        // eslint-disable-next-line react/no-array-index-key
        key={`radio-${radioIdx}`}
        type="radio"
        name="radio-button"
        checked={index === radioIdx}
        readOnly
      />
    ))}
  </div>
</div>
    </div>
  );
};

export default Slider;
