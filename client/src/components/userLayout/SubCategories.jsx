import React, { useEffect, useState } from "react";
import {
  Alert,
  Col,
  Container,
  Form,
  Row,
  Button,
  Table,
} from "react-bootstrap";
import axios from "axios";
import { MdEdit, MdDelete } from "react-icons/md";

const SubCategories = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState({
    categoryId: "",
    subCategoryName: "",
    description: "",
  });

  const [subCategoryErrors, setSubCategoryErrors] = useState({});
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editSubcategoryId, setEditSubcategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8000/category");
      if (response.status === 200) {
        const data = response.data.categories;
        if (Array.isArray(data)) {
          setCategories(
            data.sort((a, b) => a.categoryName.localeCompare(b.categoryName))
          );
        } else {
          setCategories([]);
        }
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch subcategories from backend
  const fetchSubcategories = async () => {
    try {
      const response = await axios.get("http://localhost:8000/subCategory");
      if (response.status === 200) {
        setSubCategories(response.data.subCategories || []);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubCategoryData({ ...subCategoryData, [name]: value });
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Validate input fields
  const validateSubCategory = () => {
    const errors = {};
    if (!subCategoryData.categoryId) errors.categoryId = "Category is required";
    if (!subCategoryData.subCategoryName)
      errors.subCategoryName = "Subcategory name is required";
    if (!subCategoryData.description)
      errors.description = "Description is required";
    return errors;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateSubCategory();
    if (Object.keys(errors).length > 0) {
      setSubCategoryErrors(errors);
      return;
    }
    setSubCategoryErrors({});

    try {
      let response;
      if (isEditMode) {
        response = await axios.put(
          `http://localhost:8000/subCategory/${editSubcategoryId}`,
          subCategoryData
        );
      } else {
        response = await axios.post(
          "http://localhost:8000/subCategory",
          subCategoryData
        );
      }

      if (response.status === 200 || response.status === 201) {
        setShowSuccessAlert(!isEditMode);
        setShowUpdateAlert(isEditMode);
        setSubCategoryData({
          categoryId: "",
          subCategoryName: "",
          description: "",
        });
        setEditSubcategoryId(null);
        setIsEditMode(false);
        fetchSubcategories();
      } else {
        console.error("Error:", response.data);
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error("Error submitting subcategory:", error);
      setShowErrorAlert(true);
    }
  };

  // Handle edit subcategory
  const handleEdit = (subcategory) => {
    setSubCategoryData({
      categoryId: subcategory.categoryId,
      subCategoryName: subcategory.subCategoryName,
      description: subcategory.description,
    });
    setEditSubcategoryId(subcategory._id);
    setIsEditMode(true);
  };

  // Handle delete subcategory
  const handleDelete = async (subcategory) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      try {
        const response = await axios.delete(
          `http://localhost:8000/subCategory/${subcategory._id}`
        );
        if (response.status === 200) {
          alert("Subcategory deleted successfully");
          fetchSubcategories();
        } else {
          console.error("Failed to delete subcategory");
        }
      } catch (error) {
        console.error("Error deleting subcategory:", error);
      }
    }
  };

  // Filter subcategories based on search query
  const filteredSubcategories = subCategories.filter((subcategory) =>
    subcategory.subCategoryName
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Container className="border border-4 mt-5 mb-5">
        <h2 className="text-center mb-4">
          {isEditMode ? "Edit Subcategory" : "Add Subcategory"}
        </h2>

        {showSuccessAlert && (
          <Alert
            variant="success"
            onClose={() => setShowSuccessAlert(false)}
            dismissible
          >
            Subcategory added successfully!
          </Alert>
        )}
        {showUpdateAlert && (
          <Alert
            variant="success"
            onClose={() => setShowUpdateAlert(false)}
            dismissible
          >
            Subcategory updated successfully!
          </Alert>
        )}
        {showErrorAlert && (
          <Alert
            variant="danger"
            onClose={() => setShowErrorAlert(false)}
            dismissible
          >
            Failed to save subcategory.
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col sm={6}>
              <Form.Group controlId="categoryId">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="categoryId"
                  value={subCategoryData.categoryId}
                  onChange={handleChange}
                  isInvalid={!!subCategoryErrors.categoryId}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.categoryName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group controlId="subCategoryName">
                <Form.Label>Subcategory Name</Form.Label>
                <Form.Control
                  type="text"
                  name="subCategoryName"
                  value={subCategoryData.subCategoryName}
                  onChange={handleChange}
                  isInvalid={!!subCategoryErrors.subCategoryName}
                  placeholder="Subcategory Name"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={subCategoryData.description}
              onChange={handleChange}
              isInvalid={!!subCategoryErrors.description}
              placeholder="Description"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            {isEditMode ? "Update SubCategory" : "Add SubCategory"}
          </Button>
        </Form>
      </Container>

      <Container>
        <h2 className="mb-4">List of SubCategories</h2>
        <Form.Control
          type="text"
          placeholder="Search by Name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="mb-4 w-50 mx-auto"
        />

        <Table striped bordered hover className="text-center">
          <thead>
            <tr>
              <th>Sl. No</th>
              <th>Name</th>
              <th>Description</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubcategories.map((subcategory, index) => (
              <tr key={subcategory._id}>
                <td>{index + 1}</td>
                <td>{subcategory.subCategoryName}</td>
                <td>{subcategory.description}</td>
           
                  <td className="textcenter">
                    <Button
                      onClick={() => handleEdit(subcategory)}
                      className="text-center"
                    >
                      <MdEdit />
                    </Button>
                  </td>
                  <td className="textcenter">
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(subcategory)}
                      className="text-center"
                    >
                      <MdDelete />
                    </Button>
                  </td>
               
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default SubCategories;
