import './App.css';
import {useState} from 'react';
import { Form, FormControl, Button, Container, Row, Col, FormLabel, FormGroup } from 'react-bootstrap';
import Api from "./components/api/api";

function App() {
  const [formData, setFormData] = useState({
    purchasePrice: '',
    downPayment: '',
    interestRate: '',
    term: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Api.post('form-submit.php', formData)
        .then(res => {
          console.log(res);
          console.log(res.data);
        });
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <FormLabel>Purchase Price</FormLabel>
                <FormControl
                    type="number"
                    name="purchasePrice"
                    value={formData.purchasePrice}
                    onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Down Payment</FormLabel>
                <FormControl
                    type="number"
                    name="downPayment"
                    value={formData.downPayment}
                    onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Interest Rate</FormLabel>
                <FormControl
                    type="number"
                    name="interestRate"
                    value={formData.interestRate}
                    onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Term</FormLabel>
                <FormControl as="select" name="term" value={formData.term} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="30">30 Years</option>
                  <option value="25">25 Years</option>
                  <option value="20">20 Years</option>
                  <option value="15">15 Years</option>
                  <option value="10">10 Years</option>
                  <option value="5">5 Years</option>
                </FormControl>
              </FormGroup>
              <Button type="submit" variant="primary">Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
