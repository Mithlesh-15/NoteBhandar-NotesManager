import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8">
        
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          About NoteBhandar
        </h1>

        <p className="text-gray-600 mb-4">
          NoteBhandar is a platform built for students to easily find and share
          study resources like notes, previous year questions, assignments, and
          important materials — all in one place.
        </p>

        <p className="text-gray-600 mb-4">
          We understand how difficult it can be to find the right study material
          when everything is scattered across different platforms. NoteBhandar
          solves this problem by organizing resources based on college, course,
          subject, and more.
        </p>

        <p className="text-gray-600 mb-4">
          Students can also contribute by uploading useful resources, helping
          others learn better and faster.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">
          Our Goal
        </h2>

        <p className="text-gray-600 mb-4">
          Our goal is to make study resources accessible to every student and
          create a community where knowledge is shared freely.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">
          Contact
        </h2>

        <p className="text-gray-600">
          If you have any questions, feedback, or suggestions, feel free to
          contact us at:
        </p>

        <p className="text-blue-600 font-medium mt-2">
          xozor003@gmail.com
        </p>

      </div>
    </div>
  );
}

export default About;