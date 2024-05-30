import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

// ImageGallery component to display the fetched images
const ImageGallery = ({ imgs }) => {
    return (
        <Container className="container-custom">
            <Row className="justify-content-center row-custom">
                {imgs.map((img, i) => (
                    <Col xs={12} sm={6} md={4} lg={2} key={i} className="d-flex align-items-stretch">
                        <Card className="card-custom">
                            <Card.Img variant="top" src={img.urls.small} className="card-img-top" />
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ImageGallery;
