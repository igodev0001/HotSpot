import React, { Component } from "react";
import axios from "axios";
import Intro from "../Components/Intro/Intro";
import Map from "../Components/Map/Map";
import MyNightPlan from "../Components/MyNightPlan/MyNightPlan";
import Background from "../global-assets/background-parallex.png";
import Footer from "../Components/Footer/Footer";
import Nav from "../Components/NavBar/Nav";
import Menu from "../core/Menu";
import scrollToComponent from "react-scroll-to-component";
import { FaMapMarked } from "react-icons/fa";
import { API } from "../config";

var sectionStyle = {
  width: "100%",
  height: "100%",
  backgroundImage: `url(${Background})`,
  backgroundAttachment: "fixed",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  WebkitBackgroundSize: "cover",
  MozBackgroundSize: "cover",
  OBackgroundSize: "cover",
  BackgroundSize: "cover"
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Click the button to load data!",
      showMyNightPlan: false,
      hour: this.getCurrentHour(),
      day: this.getCurrentDay(),
    };
    this.showMyNight = this.showMyNight.bind(this);
    this.filterPlaces = this.filterPlaces.bind(this);
    this.setDay = this.setDay.bind(this);
    this.setHour = this.setHour.bind(this);
  }

  getCurrentDay() {
    let day = new Date(Date.now()).getDay();
    if (day === 0) {
      return day += 7
    }
    return day
  }

  getCurrentHour() {
    let hour = new Date(Date.now()).getHours();
    let minute = new Date(Date.now()).getMinutes();

    if (minute < 30)
      hour += 1
    else {
      hour += 2
    }
    if (hour === 25) {
      hour = 1
    }
    return hour
  }

  setDay(num) {
    this.setState({ day: num })
  }

  setHour(newTime) {
    let toPass = newTime.hour24;
    toPass++
    if (toPass === 25) {
      toPass = 1
    }
    this.setState({ hour: toPass })
  }

  showMyNight(selectionList) {
    selectionList.forEach(place => {
      axios.get(`${API}/popular/${place.yelp_id}`).then(response => {
        place.hotScores = response.data.hot_scores;
        this.setState(
          {
            showMyNightPlan: true,
            nightList: selectionList
          },
          () => {
            scrollToComponent(this.MyNightPlan, {
              offset: 0,
              align: "top",
              duration: 1500
            });
          }
        );
      });
    });
  }

  filterPlaces(type) {
    if (type === "reset") {
      this.setState({
        places: this.places
      });
      return;
    }
    this.setState({
      places: this.places.filter(place => place.types.includes(type))
    });
  }

  componentDidMount() {
    scrollToComponent(this.Map, {
      offset: 0,
      align: "top",
      duration: 1500,
      ease: "outSine"
    });
    axios.get(`${API}/popular/neighbourhoods`)
      .then(response => {
        const neighbourhoods = response.data.neighbourhoods_data;
        const places = response.data.places_data;
        this.setState({
          neighbourhoods: neighbourhoods,
          places: places
        });
      });

  }

  componentDidUpdate(oldProps, oldStates) {
    if (oldStates.day !== this.state.day || oldStates.hour !== this.state.hour) {
      axios
        .get(`${API}/popular/day/${this.state.day}/hour/${this.state.hour}`)
        .then(response => {
          console.log(this.state.day);
          console.log('hour', this.state.hour);
          console.log('response', response)
          let places = [...this.state.places]
          places.sort((a, b) => { return a.id - b.id })

          for (let i = 0; i < places.length; i++) {
            places[i].current_hot_score = response.data.hot_scores[i].hot_score
          }

          this.places = places;
          this.setState({
            places: places
          })
        });
    }
  }

  processDataNeighbourhoods(neighbourhoodData) {
    return neighbourhoodData.map(element => {
      return {
        id: element.id,
        name: element.name,
        center: {
          lat: element.centerlat,
          lng: element.centerlong
        },
        borderPoints: element.border_points
      };
    });
  }

  render() {
    return (
      <div className='App' style={sectionStyle}>
        <Menu />
        <Nav />
        <Intro
          places={this.state.places}
          neighbourhoods={this.state.neighbourhoods}
        />
        <div id='NightOutBuilder'>
          <div className='container-fluid'>
            <div className='d-flex justify-content-center'>
              <div className='night-out-prompt-div'>
                <button
                  className='btn btn-outline-light build-night-button'
                  onClick={() =>
                    scrollToComponent(this.Map, {
                      offset: 0,
                      align: "top",
                      duration: 1500,
                      ease: "inOutCirc"
                    })
                  }>
                  <FaMapMarked className='map-icon' />
                  See HotSpots Map
                </button>
              </div>
            </div>
          </div>
        </div>
        <Map
          showMyNight={this.showMyNight}
          places={this.state.places}
          neighbourhoods={this.state.neighbourhoods}
          ref={section => {
            this.Map = section;
          }}
          filterPlaces={this.filterPlaces}
          day={this.state.day}
          hour={this.state.hour}
          setDay={this.setDay}
          setHour={this.setHour}
        />
        {this.state.showMyNightPlan && (
          <MyNightPlan
            nightList={this.state.nightList}
            ref={section => {
              this.MyNightPlan = section;
            }}
          />
        )}

        <Footer />
      </div>
    );
  }
}

export default Main;
