import React, { useState, useEffect } from 'react';
import Stars from '../../Stars';
import { useHistory } from 'react-router-dom';
// import { Button, Icon, Modal } from 'semantic-ui-react';
import axios from 'axios';

const ProdCard = ({ product, style, prodInfo, type }) => {
  let history = useHistory();
  const defaultIMG = 'https://img.moglimg.com/p/I/P/N/d/MINIPN3LI0NZS.jpg';

  const [avg, setavg] = useState(0);
  const [modalOpen, setmodalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`http://3.134.102.30/reviews/${product.id}/meta`)
      .then(({ data }) => {
        let totalQuantity = 0;
        let ratingSum = 0;

        for (let rating in data.ratings) {
          totalQuantity += data.ratings[rating];
          ratingSum += rating * data.ratings[rating];
        }

        let ratingAvg = ratingSum / totalQuantity;

        setavg(ratingAvg);
      });
  }, []);

  let currPrice;
  if (style) {
    currPrice =
      style.sale_price === '0' ? (
        <p>${style.original_price}</p>
      ) : (
        <div className="prices">
          <p className="sale-price">${style.sale_price}</p>
          <p className="original-price">${style.original_price}</p>{' '}
        </div>
      );
  }
  console.log(prodInfo.features, product.features);

  const handleClose = () => {
    setmodalOpen(false);
  };

  const handleOpen = () => {
    setmodalOpen(true);
  };
  return (
    <>
      <div
        className="product-card"
        onClick={() => {
          history.push(`${product.id}`);
        }}
      >
        {type === 'related' ? (
          <i className="far fa-star card-icon" onClick={handleOpen}></i>
        ) : (
          <i className="far fa-times-circle card-icon"></i>
        )}
        <img
          className="card-image"
          src={
            style
              ? style.photos[0].thumbnail_url
                ? style.photos[0].thumbnail_url
                : defaultIMG
              : ''
          }
          alt="Avatar"
          style={{ width: '100%' }}
        />
        <div className="card-container">
          <p>{product.category}</p>
          <p>
            <b>{product.name}</b>
          </p>
          <div>{currPrice}</div>
          <Stars avg={avg} />
        </div>
      </div>

      <Modal open={modalOpen} onClose={handleClose} basic size="small">
        <Modal.Content>
          <h3>This website uses cookies to ensure the best user experience.</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.handleClose} inverted>
            <Icon name="checkmark" /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default ProdCard;
