import React, { FC, useCallback, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ProductModel } from "../../models/Product.model";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { selectCartState } from "../../redux/features/cartSlice";
import { addCartItem } from "../../redux/thunks/cart-items-thunks";
import "./AddToCartModal.css";

interface Props {
  product: ProductModel;
}

const AddToCartModal: FC<Props> = ({ product }) => {
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState("");

  const dispatch = useAppDispatch();
  const { value: cart } = useAppSelector(selectCartState);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = useCallback(() => {
    if (cart) {
      const addCartItemBody = {
        cartId: cart._id,
        product: product._id,
        quantity: Number(quantity),
      };

      dispatch(addCartItem(addCartItemBody));
      setQuantity("");
      handleClose();
    }
  }, [cart, dispatch, product._id, quantity]);

  return (
    <>
      <Button
        className="add-to-cart-btn"
        variant="primary"
        onClick={handleShow}
      >
        Add To Cart
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{product.productName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Quantity:</Form.Label>
              <Form.Control
                type="number"
                placeholder="how many?"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddToCartModal;
