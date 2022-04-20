import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row, Button, Modal, ModalBody, ModalFooter, ModalHeader, Input, Spinner } from 'reactstrap';
import { getAllCategories, addCategory } from '../actions/index';
import Main from '../components/MainComponent';

/**
* @author
* @function Category
**/

export const Category = (props) => {
  const [modal, setModal] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const dispatch = useDispatch();
  const category = useSelector(state => state.category);
  const accessToken = useSelector(state => state.auth.token);

  const toggleStatus=false;

  const toggle = () => {
    setModal(!modal);
  };

  const handleForm = () => {
    const form = new FormData();

    form.append('name', categoryName);
    form.append('parentID', parentCategoryId);
    form.append('categoryImage', categoryImage);
    form.append('accessToken', accessToken);

    dispatch(addCategory(form));
    toggle();
  };

  const renderCategories = (categories) => {
    let returnVal = [];
    for (let category of categories) {
      returnVal.push(
        <li key={category.name}>
          {category.name}
          {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
        </li>
      );
    }

    return returnVal;
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

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  }

  return(
    <Main sidebar>
        <Container>
          <Row>
            <Col md={12}>
              <h2 style={{display: 'inline-block'}}>Category</h2>
              <Button color="primary" onClick={toggle} style={{display: 'inline-block', marginLeft: '50rem'}}>Add</Button>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <ul>
                {renderCategories(category.categories)}
              </ul>
            </Col>
          </Row>
        </Container>

        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Add new category</ModalHeader>
          <ModalBody>
            <Input 
              value={categoryName}
              placeholder={`Category Name`}
              onChange={(e) => setCategoryName(e.target.value)}
            />

            <select className='form-control' 
              value={parentCategoryId} 
              onChange={(e) => setParentCategoryId(e.target.value)} 
            >
              <option>select category</option>
              {
                createCategoryList(category.categories).map(option => <option value={option.value} key={option.name}>{option.name}</option>)
              }
            </select>

            <Input type='file' name='categoryImage' onChange={handleCategoryImage}/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleForm}>Submit</Button>{' '}
          </ModalFooter>
        </Modal>

    </Main>
   )

 }