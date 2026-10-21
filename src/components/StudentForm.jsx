import React, { useState } from 'react';

export function StudentForm({ onAddStudent }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    major: 'CNTT',
    gpa: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 3) {
      errs.name = "Họ tên tối thiểu 3 ký tự";
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errs.email = "Email không hợp lệ (vd: an@ptit.edu.vn)";
    }
    const gpaNum = parseFloat(formData.gpa);
    if (formData.gpa === '' || isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4) {
      errs.gpa = "GPA trong khoảng 0.0 - 4.0";
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onAddStudent({
      id: Date.now().toString(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      major: formData.major,
      gpa: parseFloat(formData.gpa).toFixed(2)
    });
    setFormData({ name: '', email: '', major: 'CNTT', gpa: '' });
    setErrors({});
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700">
      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Thêm Sinh Viên Mới</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Họ và Tên *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nguyễn Văn An"
            className="w-full px-4 py-2 rounded-xl border dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Email *</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="an@ptit.edu.vn"
            className="w-full px-4 py-2 rounded-xl border dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Ngành Học</label>
            <select
              name="major"
              value={formData.major}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="CNTT">CNTT</option>
              <option value="ATTT">ATTT</option>
              <option value="DTVT">DTVT</option>
              <option value="HTTT">HTTT</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">GPA (0 - 4) *</label>
            <input
              type="number"
              step="0.1"
              name="gpa"
              value={formData.gpa}
              onChange={handleChange}
              placeholder="3.5"
              className="w-full px-4 py-2 rounded-xl border dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.gpa && <p className="text-xs text-red-500 mt-1">{errors.gpa}</p>}
          </div>
        </div>

        <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl font-semibold text-sm transition">
          Thêm Sinh Viên
        </button>
      </form>
    </div>
  );
}