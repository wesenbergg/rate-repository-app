const thousandsToK = value => {
  if(value == undefined || isNaN(value) )
    return -1;
  
  if ( value > 1000000) {
    return Math.round(value / 1000000 * 10) / 10 + "M";
  }else if ( value > 100000 ) {
    return Math.round(value / 1000) / 10 + "K";
  } else if( value > 1000 ) {
    return Math.round(value / 1000 * 10) / 10 + "K";
  }else{
    return value;
  }
};

export default thousandsToK;