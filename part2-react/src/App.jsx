import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MealCard from './components/MealCard';
import './App.css';

function App() {
  // TODO: สร้าง state สำหรับ meals, searchTerm, isLoading, error

  // TODO: สร้าง useEffect เพื่อ fetch ข้อมูลเมื่อ searchTerm เปลี่ยน

  const handleSearch = (term) => {
    // TODO: อัปเดต searchTerm state
  };

  return (
    <div className="container">
      <header>
        <h1>🍳 Recipe Finder (React)</h1>
        {/* TODO: Render SearchBar component และส่ง props ที่จำเป็น */}
      </header>
      <main>
        <div className="results-grid">
          {/* TODO: ใช้ Conditional Rendering เพื่อแสดง Loading, Error, หรือ Meal Cards */}
        </div>
      </main>
    </div>
  );
}

export default App;