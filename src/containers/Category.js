import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row, Button, Modal, ModalBody, ModalFooter, ModalHeader, Input, Spinner } from 'reactstrap';
import { getAllCategories, addCategory, updateCategories, deleteCategories } from '../actions/index';
import Main from '../components/MainComponent';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { IoCheckbox, IoCheckboxOutline, IoChevronDownOutline, IoChevronForwardOutline } from "react-icons/io5";

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
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

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

  const updateCheckedAndExpandedCategories = () => {
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 && checked.forEach((categoryID, index) => {
      const category = categories.find((category, _index) => categoryID == category.value);
      category && checkedArray.push(category);
    })

    expanded.length > 0 && expanded.forEach((categoryID, index) => {
      const category = categories.find((category, _index) => categoryID == category.value);
      category && expandedArray.push(category);
    })

    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  };

  const toggleUpdateCategory = () => {
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(!updateCategoryModal);
  }

  const handleCategoryInput = (key, value, index, type) => {
    if (type == 'checked') {
      const updatedCheckedArray = checkedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item);
      setCheckedArray(updatedCheckedArray);
    }
    else if (type == 'expanded') {
      const updatedExpandedArray = expandedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item);
      setExpandedArray(updatedExpandedArray);
    }
  };

  const renderCategories = (categories) => {
    let returnVal = [];
    for (let category of categories) {
      returnVal.push(
        {
          label: category.name,
          value: category._id,
          children: category.children.length > 0 && renderCategories(category.children)
        }
      );
    }

    return returnVal;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ 
        value: category._id, 
        name: category.name, 
        parentID: category.parentID,
        type: category.type,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  }

  const renderAddCategoryModal = () => {
    return (
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

          <Input type='file' name='categoryImage' onChange={handleCategoryImage} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleForm}>Submit</Button>{' '}
        </ModalFooter>
      </Modal>
    );
  };

  const updateCategoriesForm = () => {
    const form = new FormData();

    expandedArray.forEach((item, index) => {
      form.append('_id', item.value);
      form.append('name', item.name);
      form.append('parentID', item.parentID ? item.parentID : '');
      form.append('type', item.type);
    });
    checkedArray.forEach((item, index) => {
      form.append('_id', item.value);
      form.append('name', item.name);
      form.append('parentID', item.parentID ? item.parentID : '');
      form.append('type', item.type);
    });
    dispatch(updateCategories(form));
    toggleUpdateCategory();
  }

  const renderUpdateCategoriesModal = () => {
    return (
      < Modal isOpen={updateCategoryModal} toggle={toggleUpdateCategory} size='lg' >
        <ModalHeader toggle={toggleUpdateCategory}>Update Category</ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <h6>Expanded</h6>
            </Col>
          </Row>

          {
            expandedArray.length > 0 && expandedArray.map((item, index) => {
              return (
                <Row key={index}>
                  <Col>
                    <Input
                      value={item.name}
                      placeholder={`Category Name`}
                      onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                    />
                  </Col>
                  <Col>
                    <select className='form-control'
                      value={item.parentID}
                      onChange={(e) => handleCategoryInput('parentID', e.target.value, index, 'expanded')}
                    >
                      <option>select category</option>
                      {
                        createCategoryList(category.categories).map(option => <option value={option.value} key={option.name}>{option.name}</option>)
                      }
                    </select>
                  </Col>
                  <Col>
                    <select className='form-control' 
                      value={item.type}
                      onChange={(e) => handleCategoryInput('type', e.target.value, index, 'expanded')}
                    >
                      <option value=''>select type</option>
                      <option value='page'>Page</option>
                      <option value='store'>Store</option>
                      <option value='product'>Product</option>
                    </select>
                  </Col>
                </Row>
              );
            })
          }

          <Row>
            <Col>
              <h6 style={{ marginTop: '5px' }}>Checked</h6>
            </Col>
          </Row>

          {
            checkedArray.length > 0 && checkedArray.map((item, index) => {
              return (
                <Row key={index}>
                  <Col>
                    <Input
                      value={item.name}
                      placeholder={`Category Name`}
                      onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                    />
                  </Col>
                  <Col>
                    <select className='form-control'
                      value={item.parentID}
                      onChange={(e) => handleCategoryInput('parentID', e.target.value, index, 'checked')}
                    >
                      <option>select category</option>
                      {
                        createCategoryList(category.categories).map(option => <option value={option.value} key={option.name}>{option.name}</option>)
                      }
                    </select>
                  </Col>
                  <Col>
                    <select className='form-control'
                      value={item.type}
                      onChange={(e) => handleCategoryInput('type', e.target.value, index, 'checked')}
                    >
                      <option value=''>select type</option>
                      <option value='page'>Page</option>
                      <option value='store'>Store</option>
                      <option value='product'>Product</option>
                    </select>
                  </Col>
                </Row>
              );
            })
          }
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={updateCategoriesForm}>Submit</Button>{' '}
        </ModalFooter>
      </Modal >
    );
  }

  const toggleDeleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(!deleteCategoryModal);
  }

  const deleteCategoryForm = () => {
    const expandedIDArray = expandedArray.map((item, index) => ({ _id: item.value }));
    const checkedIDArray = checkedArray.map((item, index) => ({ _id: item.value }));
    const finalIDArray = checkedIDArray.concat(expandedIDArray);

    if (checkedIDArray.length > 0) {
      dispatch(deleteCategories(checkedIDArray));
    }

    setDeleteCategoryModal(false);
  }

  const renderDeleteCategoryModal = () => {
    return (
      <Modal isOpen={deleteCategoryModal} toggle={toggleDeleteCategory}>
        <ModalHeader toggle={toggleDeleteCategory}>Confirm</ModalHeader>
        <ModalBody>
          <h5>Expanded</h5>
          {expandedArray.map((item, index) => <span key={index}>{item.name}</span>)}

          <h5>Checked</h5>
          {checkedArray.map((item, index) => <span key={index}>{item.name}</span>)}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={deleteCategoryForm}>Yes</Button>{' '}
          <Button color="primary" onClick={toggleDeleteCategory}>No</Button>{' '}
        </ModalFooter>
      </Modal>
    );
  }

  return (
    <Main sidebar>
      <Container>
        <Row>
          <Col className='mt-2'>
            <Button color="primary" onClick={toggle} style={{ display: 'inline-block', marginRight: '5px' }}>Add</Button>
            <Button color="secondary" onClick={toggleUpdateCategory} style={{ display: 'inline-block', marginRight: '5px' }}>Update</Button>
            <Button color="danger" onClick={toggleDeleteCategory} style={{ display: 'inline-block', marginRight: '5px' }}>Delete</Button>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={checked => setChecked(checked)}
              onExpand={expanded => setExpanded(expanded)}
              icons={{
                check: <IoCheckbox />,
                uncheck: <IoCheckboxOutline />,
                halfCheck: <IoCheckboxOutline />,
                expandClose: <IoChevronDownOutline />,
                expandOpen: <IoChevronForwardOutline />
              }}
            />
          </Col>
        </Row>
      </Container>

      {renderAddCategoryModal()}
      {renderUpdateCategoriesModal()}
      {renderDeleteCategoryModal()}
    </Main>
  )

}