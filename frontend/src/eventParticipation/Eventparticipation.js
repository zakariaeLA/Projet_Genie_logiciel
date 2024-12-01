import React from 'react';
import './ParticipationEvent.css';

export default function EventParticipation() {
    return (
        <div className="participation-body">
            <header>
                <h1>Event Calendar</h1>
            </header>
            <main>
                <section id="calendrier">
                    <div className="calendar-header">
                        <button>&lt;</button>
                        <span>Novembre</span>
                        <button>&gt;</button>
                    </div>
                    <div className="days">
                        <div>DIM</div>
                        <div>LUN</div>
                        <div>MAR</div>
                        <div>MER</div>
                        <div>JEU</div>
                        <div>VEN</div>
                        <div>SAM</div>
                    </div>
                    <div className="dates">
                        <div>27</div>
                        <div>28</div>
                        <div>29</div>
                        <div>30</div>
                        <div>31</div>
                        <div>1</div>
                        <div className="event-day">
                            2<span className="star gray"></span>
                        </div>
                        <div>3</div>
                        <div>4</div>
                        <div>5</div>
                        <div>6</div>
                        <div>7</div>
                        <div>8</div>
                        <div>9</div>
                        <div>10</div>
                        <div>11</div>
                        <div>12</div>
                        <div>13</div>
                        <div>14</div>
                        <div>15</div>
                        <div>16</div>
                        <div>17</div>
                        <div>18</div>
                        <div>19</div>
                        <div className="event-day">
                            20<span className="star yellow"></span>
                        </div>
                        <div>21</div>
                        <div>22</div>
                        <div>23</div>
                        <div>24</div>
                        <div>25</div>
                        <div>26</div>
                        <div>27</div>
                        <div>28</div>
                        <div>29</div>
                        <div className="event-day">
                            30<span className="star yellow"></span>
                        </div>
                    </div>
                </section>

                <section id="details-evenement">
                    <div className="upper-section">
                        <img src="./images/cosmoNightt.jpeg" alt="image de l'événement" />
                        <div className="event-info">
                            <h2>COSMONIGHT</h2>
                            <p>02/11/2024</p>
                            <p>À L'ENIM</p>
                        </div>
                    </div>
                    <p className="description">
                        Cosmonight organisé par le club Astronomie vise à rassembler les
                        passionnés d'astronomie autour de diverses activités liées à
                        l'observation des étoiles, aux conférences et aux ateliers pratiques.
                    </p>
                    <div className="button-wrapper">
                        <button onClick={() => console.log("participé")}>Je participe</button>
                    </div>
                </section>
            </main>
        </div>
    );
}