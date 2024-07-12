import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/ballots/categories'

const BallotCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(BASE_URL);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const addCategory = async (category) => {
    try {
      await axios.post(BASE_URL, category);
      fetchCategories();
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const editCategory = async (id, updatedCategory) => {
    try {
      await axios.put(`${BASE_URL}/${id}`, updatedCategory);
      fetchCategories();
    } catch (error) {
      console.error('Error editing category:', error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div>
      <h2>Ballot Categories</h2>
      {/* Table and form for managing ballot categories */}
      {/* This is a simplified example; add form and table rendering here */}
    </div>
  )
}

export default BallotCategory;
