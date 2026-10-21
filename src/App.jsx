import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { useFetch } from './hooks/useFetch';
import { StudentForm } from './components/StudentForm';
import { StudentList } from './components/StudentList';

const INITIAL_STUDENTS = [];

function MainContent() {
  const { theme, toggleTheme } = useTheme();
  const { data: students, setData: setStudents, loading } = useFetch(
    'https://650000000000000000000000.mockapi.io/students',
    INITIAL_STUDENTS
  );
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddStudent = (newStudent) => {
    setStudents(prev => [newStudent, ...prev]);
  };

  const handleDeleteStudent = (id, name) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sinh viên "${name}"?`)) {
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div>
            <h1 className="text-2xl font-extrabold text-red-600 dark:text-red-500">Quản Lý Sinh Viên</h1>
          </div>

          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:opacity-80 transition"
          >
            {theme === 'light' ? '🌙 Chế độ Tối' : '☀️ Chế độ Sáng'}
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-2">
            <StudentForm onAddStudent={handleAddStudent} />
          </div>

          <div className="md:col-span-3 space-y-4">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
              <input
                type="text"
                placeholder="🔍 Tìm kiếm sinh viên theo tên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {loading ? (
              <p className="text-center py-8 text-slate-500">Đang tải dữ liệu...</p>
            ) : (
              <StudentList
                students={filteredStudents}
                onDeleteStudent={handleDeleteStudent}
              />
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
}