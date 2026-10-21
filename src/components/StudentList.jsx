import React from 'react';

export function StudentList({ students, onDeleteStudent }) {
  if (!students || students.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 text-center text-slate-500 dark:text-slate-400">
        Chưa có sinh viên nào trong danh sách.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {students.map((sv) => (
        <div
          key={sv.id}
          className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between shadow-sm hover:shadow transition"
        >
          <div>
            <h3 className="font-bold text-slate-800 dark:text-white text-base">{sv.name}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{sv.email}</p>
            <div className="flex gap-2 mt-2">
              <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                {sv.major}
              </span>
              <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                GPA: {sv.gpa}
              </span>
            </div>
          </div>

          <button
            onClick={() => onDeleteStudent(sv.id, sv.name)}
            className="bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 px-3 py-1.5 rounded-xl text-xs font-semibold transition"
          >
            Xóa
          </button>
        </div>
      ))}
    </div>
  );
}