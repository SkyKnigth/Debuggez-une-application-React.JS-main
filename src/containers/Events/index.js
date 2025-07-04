import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  if (error) {
    return <div>An error occured</div>;
  }
  
  if (!data || !data.events) {
    return <div>loading</div>;
  }

  const allEvents = type
    ? data.events.filter((event) => event.type === type)
    : data.events;

  const paginatedEvents = allEvents.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };

  const pageNumber = Math.ceil(allEvents.length / PER_PAGE);
  const typeList = new Set(data.events.map((event) => event.type));

  return (
    <>
      <h3 className="SelectTitle">Catégories</h3>
      <Select
        selection={Array.from(typeList)}
        onChange={(value) => (value ? changeType(value) : changeType(null))}
      />
      <div id="events" className="ListContainer">
        {paginatedEvents.map((event) => (
          <Modal key={event.id} Content={<ModalEvent event={event} />}>
            {({ setIsOpened }) => (
              <EventCard
                onClick={() => setIsOpened(true)}
                imageSrc={event.cover}
                title={event.title}
                date={new Date(event.date)}
                label={event.type}
              />
            )}
          </Modal>
        ))}
      </div>
      <div className="Pagination">
        {[...Array(pageNumber)].map((_, n) => (
          // eslint-disable-next-line react/no-array-index-key
          <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
            {n + 1}
          </a>
        ))}
      </div>
    </>
  );
};

export default EventList;
