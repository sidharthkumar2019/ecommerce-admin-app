import React, { useEffect, useState } from 'react'
import Main from '../components/MainComponent'
import linearCategories from '../helpers/linearCategories'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Input, Container, Row, Col } from 'reactstrap';
import { useSelector } from 'react-redux';

/**
* @author
* @function NewPage
**/

export const NewPage = (props) => {

    const [createModal, setCreateModal] = useState(false);
    const [title, setTitle] = useState('');
    const [categories, setCategories] = useState([]);
    const category = useSelector(state => state.category);
    const [categoryID, setCategoryID] = useState('');
    const [description, setDescription] = useState('');
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setCategories(linearCategories(category.categories));
    }, [category]);

    const toggleCreateModal = () => {
        setCreateModal(!createModal);
    }

    const handleCreateModal = () => {

        toggleCreateModal();
    }

    const handleBannerImages = (e) => {
        console.log(e);
    };

    const handleProductImages = (e) => {
        console.log(e);
    }

    const renderCreateModal = () => {
        return (
            <Modal isOpen={createModal} toggle={toggleCreateModal}>
                <ModalHeader toggle={toggleCreateModal}>Create New Pagex</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>
                            <Input
                                value={title}
                                placeholder={`Page Title`}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                        </Col>
                    </Row>

                    <Row>
                        <Col className='mt-2'>
                            <select className='form-control'
                                value={categoryID}
                                onChange={e => setCategoryID(e.target.value)}
                            >
                                <option>Select category</option>
                                {
                                    categories.map((ele, index) => {
                                        return (
                                            <option key={index} value={ele._id}>{ele.name}</option>
                                        );
                                    })
                                }
                            </select>
                        </Col>
                    </Row>


                    <Row>
                        <Col className='mt-2'>
                            <Input
                                value={description}
                                placeholder={`Page desciption`}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col className='mt-2'>
                            <input  
                                className='form-control form-control-sm'
                                type='file'
                                name='banners'
                                onChange={handleBannerImages}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col className='mt-2'>
                            <input  
                                className='form-control form-control-sm'
                                type='file'
                                name='products'
                                onChange={handleProductImages}
                            />
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleCreateModal}>Submit</Button>{' '}
                </ModalFooter>
            </Modal>
        );
    }

    return (
        <Main sidebar>
            <Container>
                <Row>
                    <Col className='mt-2'>
                        <Button color="primary" onClick={toggleCreateModal} style={{ display: 'inline-block', marginRight: '5px' }}>Create</Button>
                    </Col>
                </Row>

                {renderCreateModal()}

            </Container>
        </Main>
    )

}