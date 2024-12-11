import React, { useState, useEffect } from 'react';
import './ParticipationEvent.css';
import axios from 'axios';
import imagevent from './images/cosmoNightt.jpeg';
export default function EventParticipation() {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [events, setEvents] = useState([]);
    const [participation, setParticipation] = useState({});
    const [selectedEvent, setSelectedEvent] = useState(null);
    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/events');
            console.log('Events:', response.data);
            
            const processedEvents = response.data.map(event => ({
                ...event,
                date: new Date(event.date), 
              }));
          
              setEvents(processedEvents);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }

    
    useEffect(() => {
        fetchEvents();
    }, []);

    const daysOfWeek = ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'];

    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
        setSelectedEvent(null);
    };

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
        setSelectedEvent(null);
    };

    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const daysInPrevMonth = getDaysInMonth(
        currentMonth === 0 ? 11 : currentMonth - 1,
        currentMonth === 0 ? currentYear - 1 : currentYear
    );

    const daysInMonth = getDaysInMonth(currentMonth, currentYear);

    
    const dates = [];

    
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
        dates.push({
            day: daysInPrevMonth - i,
            currentMonth: false,
        });
    }

    
    for (let i = 1; i <= daysInMonth; i++) {
        const dateObj = new Date(currentYear, currentMonth, i);
        const event = events.find(
            (e) =>{
                return e.date.getDate() === i &&
                e.date.getMonth() === currentMonth &&
                e.date.getFullYear() === currentYear
            }
        );
        dates.push({
            day: i,
            currentMonth: true,
            event: event || null,
        });
    }

    
    while (dates.length % 7 !== 0) {
        dates.push({
            day: dates.length - daysInMonth - firstDayOfMonth + 1,
            currentMonth: false,
        });
    }

    const handleEventClick = (event) => {
        setSelectedEvent(event);
    };

    const handleParticipationClick = (date) => {
        const dateKey = date.toDateString();
        setParticipation((prev) => ({
            ...prev,
            [dateKey]: !prev[dateKey],
        }));
    };

    return (
        <div className="participation-body">
            <header>
                <h1>CALENDRIER</h1>
            </header>
            <main>
                <section id="calendrier">
                    <div className="calendar-header">
                        <button onClick={prevMonth}>&lt;</button>
                        <span>
              {new Date(currentYear, currentMonth).toLocaleString('fr', { month: 'long' })}
            </span>
                        <button onClick={nextMonth}>&gt;</button>
                    </div>
                    <div className="days">
                        {daysOfWeek.map((day) => (
                            <div key={day}>{day}</div>
                        ))}
                    </div>
                    <div className="dates">
                        {dates.map((dateObj, index) => {
                            const { day, currentMonth: isCurrentMonth, event } = dateObj;
                            const date = new Date(
                                currentYear,
                                isCurrentMonth ? currentMonth : currentMonth + (day > 15 ? -1 : 1),
                                day
                            );
                            const dateKey = date.toDateString();
                            const isParticipated = participation[dateKey];

                            return (
                                <div
                                    key={index}
                                    className={`${event ? 'event-day' : ''} ${isCurrentMonth ? '' : 'other-month'}`}
                                    onClick={() => {
                                        if (event) {
                                            handleEventClick(event);
                                        }
                                    }}
                                >
                                    {day}
                                    {event && (
                                        <span
                                            className={`star ${isParticipated ? 'gray' : 'yellow'}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleParticipationClick(date);
                                            }}
                                        ></span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>

                {selectedEvent && (
                    <section id="details-evenement">
                        <div className="upper-section">
                            
                            <img src={selectedEvent.image} alt="image de l'événement" />
                            <div className="event-info">
                                <h2>{selectedEvent.titre}</h2>
                                <p>{selectedEvent.date.toLocaleDateString("fr")}</p>
                                <p>{selectedEvent.lieu}</p>
                            </div>
                        </div>
                        <p className="description">{selectedEvent.description}</p>
                        <div className="button-wrapper">
                            <button onClick={() => console.log('participé')}>Je participe</button>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}
