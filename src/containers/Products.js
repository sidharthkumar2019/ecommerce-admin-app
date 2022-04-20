import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Main from '../components/MainComponent'
import { Col, Container, Row, Button, Modal, ModalBody, ModalFooter, ModalHeader, Input, Spinner, Label, FormGroup, Form, Table } from 'reactstrap';
import { addProduct } from '../actions/product';

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
  
  const toggleStatus=false;
  
  const toggle = () => {
    setModal(!modal);
  };
  
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
            <th>Description</th>
            <th>Product Pictures</th>
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
                <td>{ele.description}</td>
                <td>---</td>
                <td>{ele.category}</td>
              </tr>
            ) :
            null
          }
        </tbody>
      </Table>
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
    </Main>
   )

 }