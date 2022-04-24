import React, { useEffect, useState } from 'react'
import Main from '../components/MainComponent'
import linearCategories from '../helpers/linearCategories'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Input, Container, Row, Col, Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createPage } from '../actions';

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
    const [type, setType] = useState('');
    const dispatch = useDispatch();
    const page = useSelector(state => state.page);

    useEffect(() => {
        // console.log(page);
        if (!page.loading) {
            setTitle('');
            setType('');
            setCategoryID('');
            setDescription('');
            setBanners([]);
            setProducts([]);
        }
    }, [page])

    useEffect(() => {
        setCategories(linearCategories(category.categories));
    }, [category]);

    const onCategoryChange = (e) => {
        const category = categories.find(category => category.value == e.target.value);
        setCategoryID(e.target.value);
        setType(category.type);
    }

    const toggleCreateModal = () => {
        setCreateModal(!createModal);
    }

    const handleBannerImages = (e) => {
        setBanners([...banners, e.target.files[0]]);
    };

    const handleProductImages = (e) => {
        setProducts([...products, e.target.files[0]]);
    }

    const submitPageForm = (e) => {
        if (title == '') {
            alert('Title is required');
            setCreateModal(false);
            return;
        }

        const form = new FormData();
        form.append('title', title);
        form.append('description', description);
        form.append('category', categoryID);
        form.append('type', type);
        banners.forEach((banner, index) => {
            form.append('banners', banner);
        });
        products.forEach((product, index) => {
            form.append('products', product);
        });

        dispatch(createPage(form));

        toggleCreateModal();
    }

    const renderCreateModal = () => {
        return (
            <Modal isOpen={createModal} toggle={toggleCreateModal}>
                <ModalHeader toggle={toggleCreateModal}>Create New Page</ModalHeader>
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
                                onChange={onCategoryChange}
                            >
                                <option>Select category</option>
                                {
                                    categories.map((ele, index) => {
                                        return (
                                            <option key={index} value={ele.value}>{ele.name}</option>
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

                    {
                        banners.length > 0 ?
                            banners.map((banner, index) => {
                                return (
                                    <Row key={index}>
                                        <Col>{banner.name}</Col>
                                    </Row>
                                );
                            })
                            : null
                    }
                    <Row>
                        <Col>
                            <Input
                                className="form-control"
                                type="file"
                                name='banners'
                                onChange={handleBannerImages}
                            />
                        </Col>
                    </Row>

                    {
                        products.length > 0 ?
                            products.map((product, index) => {
                                return (
                                    <Row key={index}>
                                        <Col>{product.name}</Col>
                                    </Row>
                                );
                            })
                            : null
                    }
                    <Row>
                        <Col>
                            <Input
                                className="form-control"
                                type="file"
                                name='products'
                                onChange={handleProductImages}
                            />
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={submitPageForm}>Submit</Button>{' '}
                </ModalFooter>
            </Modal>
        );
    }

    return (
        <Main sidebar>
            <Container>
                {
                    page.loading ?
                        <>
                            <Spinner />
                        </> :
                        <>
                            <Row>
                                <Col className='mt-2'>
                                    <Button color="primary" onClick={toggleCreateModal} style={{ display: 'inline-block', marginRight: '5px' }}>Create</Button>
                                </Col>
                            </Row>
                            {renderCreateModal()}
                        </>
                }

            </Container>
        </Main>
    )

}