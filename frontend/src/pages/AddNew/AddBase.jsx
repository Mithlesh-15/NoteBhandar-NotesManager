import { ArrowBigRightDash } from 'lucide-react'
import React, { useState } from 'react'

const selectorClass =
  'w-full rounded-2xl border border-[#c9b6e4] bg-white/95 px-4 py-3 text-gray-700 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-300'

const inputClass =
  'mt-3 w-full rounded-xl border border-purple-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200'

function AddBase() {
  const [college, setCollege] = useState('personal')
  const [course, setCourse] = useState('personal')
  const [subject, setSubject] = useState('personal')

  return (
    <div className="h-[calc(100vh-4rem)] overflow-y-auto bg-linear-to-b from-[#fff6e9] via-[#ffe9d2] to-[#f9ddbf] px-3 pb-36 pt-5 sm:px-4 sm:pt-8">
      <div className="mx-auto flex w-full max-w-xl flex-col gap-4 rounded-3xl border border-[#f1cfa6] bg-[#fff9f2]/90 p-4 shadow-[0_16px_40px_rgba(94,53,177,0.12)] sm:gap-5 sm:p-6">
        <h2 className="text-lg font-bold text-[#5d3f88] sm:text-xl">Add Your New Notes</h2>
        <p className="text-sm leading-6 text-[#7a6b61]">
          Choose the details below. If your option is missing, select Add New and type it.
        </p>

        <div>
          <p className="mb-2 text-sm font-semibold text-[#6b4f91]">Select College</p>
          <select className={selectorClass} value={college} onChange={(e) => setCollege(e.target.value)}>
            <option value="personal">Personal Notes</option>
            <option value="study">Study Notes</option>
            <option value="work">Work Notes</option>
            <option value="add_new">Add New</option>
          </select>
          {college === 'add_new' && (
            <input type="text" className={inputClass} placeholder="Enter new college name" />
          )}
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold text-[#6b4f91]">Select Course</p>
          <select className={selectorClass} value={course} onChange={(e) => setCourse(e.target.value)}>
            <option value="personal">Personal Notes</option>
            <option value="study">Study Notes</option>
            <option value="work">Work Notes</option>
            <option value="add_new">Add New</option>
          </select>
          {course === 'add_new' && (
            <input type="text" className={inputClass} placeholder="Enter new course name" />
          )}
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold text-[#6b4f91]">Select Subject</p>
          <select className={selectorClass} value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option value="personal">Personal Notes</option>
            <option value="study">Study Notes</option>
            <option value="work">Work Notes</option>
            <option value="add_new">Add New</option>
          </select>
          {subject === 'add_new' && (
            <input type="text" className={inputClass} placeholder="Enter new subject name" />
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4">
        <button
          type="button"
          className="mx-auto flex w-full max-w-xl cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-purple-600 bg-[#f6d7b8] px-6 py-3 font-semibold text-black shadow-md transition-all duration-150 hover:bg-[#f3cca2] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 focus:ring-offset-[#f9e4cb]"
        >
          <span className="tracking-wide">Next</span>
          <ArrowBigRightDash size={18} />
        </button>
      </div>
    </div>
  )
}

export default AddBase
