import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Main from '../components/MainComponent'
import { Col, Container, Row, Button, Modal, ModalBody, ModalFooter, ModalHeader, Input, Spinner, Label, FormGroup, Form, Table } from 'reactstrap';
import { addProduct, deleteProductByID } from '../actions/product';
import './style.css';
import { generatePublicUrl } from '../urlConfig';

/**
* @author
* @function Products
**/


export const Products = (props) => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [productPictures, setProductPictures] = useState([]);
  const category = useSelector(state => state.category);
  const dispatch = useDispatch();
  const product = useSelector(state => state.product);
  const [productDetailsModal, setProductDetailsModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);

  
  const toggle = () => {
    setModal(!modal);
  };

  const toggleProductDetailsModal = () => {
    setProductDetailsModal(!productDetailsModal);
  }

  const showProductDetailsModal = (product) => {
    setProductDetails(product);
    toggleProductDetailsModal();
  }
  
  const handleForm = () => {
    const form = new FormData();
    
    form.append('name', name);
    form.append('quantity', quantity);
    form.append('price', price);
    form.append('description', description);
    form.append('category', categoryId);
    
    for (let picture of productPictures) {
      form.append('productPicture', picture);
    }

    dispatch(addProduct(form));
    toggle();
  };
  
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({value: category._id, name: category.name});
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  const handleProductPictures = (e) => {
    setProductPictures([
      ...productPictures,
      e.target.files[0]
    ])
  }
  
  const renderProducts = () => {
    return (
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {
            product.products.length > 0 ? 
            product.products.map((ele, index) =>
              <tr key={ele._id}>
                <th scope="row">{index+1}</th>
                <td>{ele.name}</td>
                <td>{ele.price}</td>
                <td>{ele.quantity}</td>
                <td>{ele.category.name}</td>
                <td>
                  <Button color='secondary' onClick={() => showProductDetailsModal(ele)}>
                    info
                  </Button>
                  <Button color='danger' onClick={() => {
                    const payload = {
                      productID: ele._id
                    };
                    dispatch(deleteProductByID(payload));
                  }}>
                    delete
                  </Button>
                </td>
              </tr>
            ) :
            null
          }
        </tbody>
      </Table>
    );
  };

  const renderAddProductModal = () => {
    return (
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add new category</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for='Name'>Name</Label>
              <Input 
                label= 'Name'
                value={name}
                placeholder={'Product Name'}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for='Quantity'>Quantity</Label>
              <Input 
                label= 'Quantity'
                value={quantity}
                placeholder={'10/100/1000...'}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for='Price'>Price</Label>
              <Input 
                label= 'Price'
                value={price}
                placeholder={'in INR (Indian National Ruppees)'}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for='Name'>Description</Label>
              <Input 
                label= 'Description'
                value={description}
                placeholder={'A few words best describing the product.'}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for='Category'>Category</Label>  
              <select className='form-control' 
                value={categoryId} 
                onChange={(e) => setCategoryId(e.target.value)} 
              >
                <option>select category</option>
                {
                  createCategoryList(category.categories).map(option => <option value={option.value} key={option.name}>{option.name}</option>)
                }
              </select>
            </FormGroup>

            <FormGroup>
              {
                productPictures.length > 0 ? 
                productPictures.map((picture, index) => <div key={index}>{picture.name}</div>) :
                null
              }

              <input type='file' name='productPicture' onChange={handleProductPictures}></input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleForm}>Submit</Button>{' '}
        </ModalFooter>
      </Modal>
    );
  }

  const renderProductDetailsModal = () => {
    if (!productDetails) return null;

    return (
      <Modal
        isOpen={productDetailsModal}
        toggle={toggleProductDetailsModal}
        size="lg"
      >
        <ModalHeader toggle={toggleProductDetailsModal}>Product Details</ModalHeader>
        <ModalBody>
          <Row>
            <Col md={6}>
              <label><h5>Name: </h5></label>
              <p>{productDetails.name}</p>
            </Col>
            <Col md={6}>
              <label><h5>Price: </h5></label>
              <p>{productDetails.price} INR</p>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <label><h5>Quantity: </h5></label>
              <p>{productDetails.quantity}</p>
            </Col>
            <Col md={6}>
              <label><h5>Category: </h5></label>
              <p>{productDetails.category.name}</p>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <label><h5>Description: </h5></label>
              <p>{productDetails.description}</p>
            </Col>
          </Row>

          <Row>
            <label><h5>Product Pictures: </h5></label>
            <Col style={{display: 'flex'}}>
              {productDetails.productPictures.map(pic => 
                <div className='productPictureContainer'>
                  <img src={generatePublicUrl(pic.img)} height={100} width={100}/>
                </div>
              )}
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    );
  };

  return(
    <Main sidebar>
        <Container>
          <Row>
            <Col md={12}>
              <h2 style={{display: 'inline-block'}}>Product</h2>
              <Button color="primary" onClick={toggle} style={{display: 'inline-block', marginLeft: '50rem'}}>Add</Button>
            </Col>
          </Row>

          <Row>
            <Col>
              {renderProducts()}
            </Col>
          </Row>
        </Container>

        {renderAddProductModal()}
        {renderProductDetailsModal()}
    </Main>
   )

 }