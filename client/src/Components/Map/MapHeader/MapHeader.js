import React from "react";
import { ButtonToolbar, ButtonGroup, Button } from "reactstrap";
import MapDayFilter from "./DropdownDays";
import MapHourFilter from "../DropdownHours";
import MapHoodFilter from "./DropdownHood";
import { FaGlassCheers, FaPizzaSlice, FaMusic } from "react-icons/fa";


function MapHeader(props)  {
    return (
      <div className='d-inline-flex p-2 justify-content-center map-header'>
      <div className='col hood-header-box'>
          <h4 className='selected-hood'>
            {props.currentNeighbourhood
              ? props.currentNeighbourhood.name
              : "Austin"}
          </h4>
        </div>

        <div className='col filter-box-div'> 
          <MapHoodFilter
            className='dropdown-buttons'
            neighbourhoods={props.neighbourhoods}
            clickNeighbourhood={props.clickNeighbourhood}
            resetNeighbourhood={props.resetNeighbourhood}
            currentNeighbourhood={props.currentNeighbourhood}
            changeShowOneHood={props.changeShowOneHood}
            removeMapCenterPlace={props.removeMapCenterPlace}
          />
          <p className='filter-prompt'>on a</p>
          <MapDayFilter
            className='dropdown-buttons'
            day={props.day}
            setDay={props.setDay}
          />
          <p className='filter-prompt'>around</p>
          <MapHourFilter
            className='dropdown-buttons'
            hour={props.hour}
            setHour={props.setHour}
          />
        </div>
  
        <div className='col button-row'>
          <ButtonToolbar
            className='button-toolbar'
            aria-label='Toolbar with button groups'>
       
            <ButtonGroup
              className='mr-2 filter-toolbar'
              aria-label='First group'>
              <Button
                className='filter-buttons restaurant-filter-button'
                onClick={() => {
                  props.filterPlaces("restaurant");
                }}>
                <FaPizzaSlice className='filter-icons' />
                Restaurants
              </Button>

              <Button
                className='filter-buttons bar-filter-button'
                onClick={() => {
                  props.filterPlaces("night_club");
                }}>
                <FaMusic className='filter-icons' />
                Night Clubs
              </Button>

              <Button
                className='filter-buttons club-filter-button'
                onClick={() => {
                  props.filterPlaces("bar");
                }}>
                <FaGlassCheers className='filter-icons' />
                Bars
              </Button>
              <Button
                className='filter-buttons club-filter-button'
                onClick={() => {
                  props.filterPlaces("reset");
                }}>
                Reset filter
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </div>
      </div>
    );
  }

export default MapHeader;
