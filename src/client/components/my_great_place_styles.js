const K_WIDTH = 40;
const K_HEIGHT = 40;

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,
  height: '100%',
  width: '100%',

  border: '5px solid #f44336',
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#3f51b5',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4
};

export {greatPlaceStyle};
