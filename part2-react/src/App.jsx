// src/App.jsx
import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MealCard from './components/MealCard';
// import './App.css'; // ลบบรรทัดนี้ออก

function App() {
  // ข้อ 2.2: สร้าง state สำหรับ meals, searchTerm, isLoading, error
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // ข้อ 2.2: สร้าง useEffect เพื่อ fetch ข้อมูลเมื่อ searchTerm เปลี่ยน
  useEffect(() => {
    // ไม่ต้อง fetch ถ้าไม่มีคำค้นหา
    if (!searchTerm) {
      setMeals([]); // ล้างค่า meals เดิมเมื่อช่องค้นหาว่าง
      return;
    }

    const fetchMeals = async () => {
      setIsLoading(true); // เริ่มโหลด
      setError(null);     // รีเซ็ต error
      setMeals([]);       // ล้างข้อมูลเก่าก่อนเริ่มค้นหาใหม่

      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        if (!response.ok) {
          throw new Error('Something went wrong! Please try again.');
        }
        const data = await response.json();
        setMeals(data.meals || []); // ถ้า data.meals เป็น null ให้ใช้ array ว่างแทน
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false); // สิ้นสุดการโหลด
      }
    };

    fetchMeals();
  }, [searchTerm]); // Dependency array: ให้ useEffect ทำงานใหม่ทุกครั้งที่ searchTerm เปลี่ยน

  // ข้อ 2.2: State Lifting
  const handleSearch = (term) => {
    setSearchTerm(term); // อัปเดต searchTerm state
  };

  const renderContent = () => {
    // ข้อ 2.3: Conditional Rendering
    if (isLoading) {
      return <p className="status-message">Loading...</p>;
    }
    if (error) {
      return <p className="status-message error">{error}</p>;
    }
    if (meals.length > 0) {
      return meals.map((meal) => (
        <MealCard key={meal.idMeal} meal={meal} />
      ));
    }
    // เงื่อนไขเพิ่มเติม: แสดงข้อความเมื่อมีคำค้นหาแต่ไม่เจอผลลัพธ์
    if (searchTerm && meals.length === 0) {
      return <p className="status-message">No recipes found for "{searchTerm}".</p>;
    }
    // สถานะเริ่มต้น ตอนยังไม่ได้ค้นหาอะไรเลย
    return <p className="status-message">Start by searching for a recipe!</p>;
  };

  return (
    <div className="container">
      <header>
        <h1>🍳 Recipe Finder (React)</h1>
        {/* Render SearchBar component และส่ง props onSearch */}
        <SearchBar onSearch={handleSearch} />
      </header>
      <main>
        <div className="results-grid">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;