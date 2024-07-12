import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BallotSpecs = () => {
  const [specs, setSpecs] = useState([]);

  useEffect(() => {
    fetchSpecs();
  }, []);

  const fetchSpecs = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/ballots/specs');
      setSpecs(response.data);
    } catch (error) {
      console.error('Error fetching specs:', error);
    }
  };

  const addSpec = async (spec) => {
    try {
      await axios.post('http://localhost:3001/api/ballots/specs', spec);
      fetchSpecs();
    } catch (error) {
      console.error('Error adding spec:', error);
    }
  };

  const editSpec = async (id, updatedSpec) => {
    try {
      await axios.put(`http://localhost:3001/api/ballots/specs/${id}`, updatedSpec);
      fetchSpecs();
    } catch (error) {
      console.error('Error editing spec:', error);
    }
  };

  const deleteSpec = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/ballots/specs/${id}`);
      fetchSpecs();
    } catch (error) {
      console.error('Error deleting spec:', error);
    }
  };

  return (
    <div>
      <h2>Ballot Specs</h2>
      {/* Table and form for managing ballot specs */}
      {/* This is a simplified example; add form and table rendering here */}
    </div>
  );
};

export default BallotSpecs;
