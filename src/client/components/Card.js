import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const CardExampleWithAvatar = () => (
  <Card className="my-card">
    <CardHeader
      title="URL Avatar"
      subtitle="Subtitle"
      avatar="https://s3-media1.fl.yelpcdn.com/photo/cwpyLagQ9fTyOZEHeu0lKQ/ms.jpg"
    />
    <CardMedia
      overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
    >
      <img src="https://s3-media3.fl.yelpcdn.com/bphoto/RxAkSvr26EzLp0-Zee7ZwA/ms.jpg" />
    </CardMedia>
    <CardTitle title="Card title" subtitle="Card subtitle" />
    <CardText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
    </CardText>
    <CardActions>
      <FlatButton label="Action1" />
      <FlatButton label="Action2" />
    </CardActions>
  </Card>
);

export default CardExampleWithAvatar;
