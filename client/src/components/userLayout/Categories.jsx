import React, { useRef, useEffect, useState } from "react";
import {
  Row,
  Alert,
  Form,
  Col,
  Table,
  Button,
  Container,
} from "react-bootstrap";
import axios from "axios";
import { MdEdit, MdDelete } from "react-icons/md";
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryData, setCategoryData] = useState({
    categoryName: "",
    description: "",
  });
  const [categoryErrors, setCategoryErrors] = useState({});
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [validated, setValidated] = useState(false);
  const formRef = useRef(null);
  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8000/category");
      if (response.status === 200) {
        const sortedCategories = response.data.categories.sort((a, b) =>
          a.categoryName.localeCompare(b.categoryName)
        );
        setCategories(sortedCategories);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.log("Error in fetching categories:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    console.log(form);
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity() === true) {
      try {
        let response;
        if (isEditMode) {
          response = await axios.put(
            `http://localhost:8000/category/${categoryId}`,
            categoryData
          );
        } else {
          response = await axios.post(
            "http://localhost:8000/category",
            categoryData
          );
        }
        if (response.status === 201 || response.status === 200) {
          if (isEditMode) {
            setShowUpdateAlert(true);
            setShowSuccessAlert(false);
          } else {
            setShowUpdateAlert(false);
            setShowSuccessAlert(true);
          }
          setCategoryData({ categoryName: "", description: "" });
          setCategoryId(null);
          fetchCategories();
          setIsEditMode(false);
        } else {
          setShowErrorAlert(true);
          setCategoryErrors({ server: response.data.message });
        }
      } catch (error) {
        setShowErrorAlert(true);
        setCategoryErrors({ server: error.response?.data?.message });
      }
    }
  };
  const handleEdit = (category) => {
    setCategoryData({
      categoryName: category.categoryName,
      description: category.description,
    });
    setIsEditMode(true);
    setCategoryId(category._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleDelete = async (category) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/category/${category._id}`
      );
      if (response.status === 200) {
        alert("Category deleted successfully");
        fetchCategories();
      } else {
        console.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error Deleting category:", error);
    }
  };
  const filteredCategories = categories.filter((category) =>
    category.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div>
      <Container
        className="border border-4 mt-5 mb-5"
        style={{ borderRadius: "15px" }}
        ref={formRef}
      >
        <div className="pt-3 mb-3">
          <h2 className="text-center mb-4">
            {isEditMode ? "Edit category" : "Add category"}
          </h2>
          {showSuccessAlert && (
            <Alert
              variant="success"
              onclose={() => setShowSuccessAlert(false)}
              dismissible
            >
              Category Added successfully!
            </Alert>
          )}
          {showUpdateAlert && (
            <Alert
              variant="success"
              onclose={() => setShowUpdateAlert(false)}
              dismissible
            >
              successfully {isEditMode ? "update" : "add"} category.
              {categoryErrors.server}
            </Alert>
          )}
          {showErrorAlert && (
            <Alert
              variant="danger"
              onclose={() => setShowErrorAlert(false)}
              dismissible
            >
              Failed to {isEditMode ? "update" : "add"} category.
              {categoryErrors.server}
            </Alert>
          )}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col xs={12} sm={6}>
                <Form.Group controlId="categoryName" className="pb-4">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    className="large-input text-center"
                    type="text"
                    name="categoryName"
                    onChange={handleChange}
                    value={categoryData.categoryName}
                    minLength="3"
                    required
                    isInvalid={!!categoryErrors.categoryName}
                    placeholder="Category"
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please provide a category name (at least 3 charecters)
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={12} sm={6}>
                <Form.Group controlId="description" className="pb-4">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    className="large-input text-center"
                    type="text"
                    name="description"
                    value={categoryData.description}
                    onChange={handleChange}
                    required
                    isInvalid={!!categoryErrors.description}
                    placeholder="Description"
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please provide a description
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Col className="text-center">
              <Button
                variant="primary"
                type="submit"
                className="mt-2 signup-button"
              >
                {isEditMode ? "Update" : "Add"}
              </Button>
            </Col>
          </Form>
        </div>
      </Container>
      <Container className="container-1">
        <div className="list-container scrollable-list">
          <Row>
            <Col xs={12} sm={4}>
              <h2 className="mb-4">List of categories</h2>
            </Col>
            <Col xs={12} sm={4}>
              <Form.Group controlId="search">
                <Form.Control
                  type="text"
                  placeholder="Search by Category"
                  value={searchQuery}
                  onChange={handleSearchChange}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <div className="table-responsive">
            <Table striped bordered hover responsive>
              <thead className="table-header pb-2 pt-2 theader">
                <tr>
                  <th className="text-center">Sl.No.</th>
                  <th className="text-center">Category</th>
                  <th className="text-center">Description</th>
                  <th className="text-center" colSpan={2}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category, index) => (
                  <tr key={index} className="table-row">
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{category.categoryName}</td>
                    <td className="text-center">{category.description}</td>
                    <td className="text-center">
                      <Button
                        variant="primary"
                        className="mt-2 signup-button"
                        onClick={() => handleEdit(category)}
                      >
                        <MdEdit></MdEdit>
                      </Button>
                    </td>
                    <td className="text-center">
                      <Button
                        variant="danger"
                        className="mt-2 singup-button ml-2"
                        onClick={() => handleDelete(category)}
                      >
                        <MdDelete />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Categories;
