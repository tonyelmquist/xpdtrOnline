import React from 'react';
import PropTypes from 'prop-types';
import {
  Segment, Header, Button, Icon,
} from "semantic-ui-react";


const Header = props => (
    <div>
        {props.currencies.filter(
        currency => currencyCodes[currency.baseCurrency] && currency.selected === props.returnSelected
      ).map(currency => (
       <SelectedButton key={currency.baseCurrency} returnSelected={props.returnSelected} currency={currency} handleClick={props.handleClick} />
      ))}
    </div>
);

Header.defaultProps = {
};


Header.propTypes = {

};

export default Header;
