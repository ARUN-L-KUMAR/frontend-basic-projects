import React from 'react';

const categories = [
  { key: 'all', label: 'All Products' },
  { key: 'clothing', label: 'Clothing' },
  { key: 'shoes', label: 'Shoes' },
  { key: 'accessories', label: 'Accessories' },
];

const FilterSection = ({ filter, setFilter, view, setView }) => (
  <section className="py-4 bg-gray-50 border-b">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4">
      <div className="flex space-x-2 mb-2 md:mb-0">
        {categories.map(cat => (
          <button
            key={cat.key}
            className={`filter-btn px-4 py-2 rounded-full font-semibold shadow ${filter === cat.key ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border'}`}
            onClick={() => setFilter(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="flex space-x-2">
        <button
          className={`view-btn px-3 py-2 rounded-full ${view === 'grid' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border'}`}
          onClick={() => setView('grid')}
        >
          <i className="fas fa-th"></i>
        </button>
        <button
          className={`view-btn px-3 py-2 rounded-full ${view === 'list' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border'}`}
          onClick={() => setView('list')}
        >
          <i className="fas fa-list"></i>
        </button>
      </div>
    </div>
  </section>
);

export default FilterSection; 