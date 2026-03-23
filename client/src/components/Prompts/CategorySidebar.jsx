import React, { useState, useEffect } from 'react';
import { Layers } from 'lucide-react';
import api from '../../api';

const CategorySidebar = ({ filter, setFilter, user }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get('/categories').then(res => setCategories(res.data));
  }, []);

  return (
    <div className="category-sidebar" style={{ 
      padding: '15px', 
      borderRadius: '24px',
      background: 'rgba(20, 20, 20, 0.95)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      minWidth: '240px',
      boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
    }}>
      <h3 style={{ 
        fontSize: '1.1rem', 
        fontWeight: 700, 
        color: 'white', 
        marginBottom: '20px',
        letterSpacing: '0.5px'
      }}>
        Filter by Category
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button 
          onClick={() => setFilter('all')}
          style={{
            background: filter === 'all' ? 'var(--accent-main)' : 'rgba(255, 255, 255, 0.02)',
            border: filter === 'all' ? '1px solid var(--accent-main)' : '1px solid rgba(255, 255, 255, 0.05)',
            color: filter === 'all' ? 'white' : 'rgba(255, 255, 255, 0.6)',
            padding: '10px 18px', 
            borderRadius: '12px', 
            fontSize: '0.85rem', 
            fontWeight: 600, 
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            width: '100%',
            textAlign: 'left'
          }}
        >
          <Layers size={16} />
          All Categories
        </button>

        {categories.map((cat) => (
          <button 
            key={cat.id}
            onClick={() => setFilter(filter === cat.name.toLowerCase() ? 'all' : cat.name.toLowerCase())}
            style={{
              background: filter === cat.name.toLowerCase() ? 'var(--accent-main)' : 'rgba(255, 255, 255, 0.02)',
              border: filter === cat.name.toLowerCase() ? '1px solid var(--accent-main)' : '1px solid rgba(255, 255, 255, 0.05)',
              color: filter === cat.name.toLowerCase() ? 'white' : 'rgba(255, 255, 255, 0.6)',
              padding: '10px 18px', 
              borderRadius: '12px', 
              fontSize: '0.85rem', 
              fontWeight: 600, 
              cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              textAlign: 'left'
            }}
          >
            <Layers size={16} />
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySidebar;
