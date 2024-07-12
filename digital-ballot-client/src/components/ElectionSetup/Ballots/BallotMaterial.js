import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BallotMaterial = () => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/ballots/materials');
      setMaterials(response.data);
    } catch (error) {
      console.error('Error fetching materials:', error);
    }
  };

  const addMaterial = async (material) => {
    try {
      await axios.post('http://localhost:3001/api/ballots/materials', material);
      fetchMaterials();
    } catch (error) {
      console.error('Error adding material:', error);
    }
  };

  const editMaterial = async (id, updatedMaterial) => {
    try {
      await axios.put(`http://localhost:3001/api/ballots/materials/${id}`, updatedMaterial);
      fetchMaterials();
    } catch (error) {
      console.error('Error editing material:', error);
    }
  };

  const deleteMaterial = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/ballots/materials/${id}`);
      fetchMaterials();
    } catch (error) {
      console.error('Error deleting material:', error);
    }
  };

  return (
    <div>
      <h2>Ballot Materials</h2>
      {/* Table and form for managing ballot materials */}
      {/* This is a simplified example; add form and table rendering here */}
    </div>
  );
};

export default BallotMaterial;
