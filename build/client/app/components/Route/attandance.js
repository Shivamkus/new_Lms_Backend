"use strict";
// // import React, { useState } from 'react';
// // const Attendance = () => {
// //   const [isPresent, setIsPresent] = useState(false);
// //   const handleCheckboxChange = () => {
// //     setIsPresent(!isPresent);
// //   };
// //   const handleSubmit = (e: { preventDefault: () => void; }) => {
// //     e.preventDefault();
// //     if (isPresent) {
// //       // Additional logic before submitting the form
// //       alert('Attendance successfully submitted');
// //       // You can submit the form here if needed
// //     } else {
// //       alert('Failed: Please check the checkbox');
// //     }
// //   };
// //   return (
// //     <div className="form-container box">
// //       <form action="/markAttendance" method="post" onSubmit={handleSubmit}>
// //         <p style={{ fontSize: '20px', color: '#fff' }}>
// //           Date: <span style={{ color: 'red' }}>*</span>
// //         </p>
// //         {/* Set today's date as the default value */}
// //         <input type="date" id="date" name="date" className="search-form" required readOnly />
// //         <p style={{ fontSize: '20px', color: '#fff', marginTop: '10px' }}>
// //           Present:
// //           <input type="checkbox" id="present" name="present" value="true" onChange={handleCheckboxChange} />
// //         </p>
// //         <button type="submit" className="inline-btn">
// //           Mark Attendance
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };
// // export default Attendance;
// import React, { useState, useEffect } from 'react';
// const Attendance = () => {
//   const [attendanceData, setAttendanceData] = useState({});
//   const [isPresent, setIsPresent] = useState(false);
//   const [selectedDate, setSelectedDate] = useState('');
//   const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//   const handleCheckboxChange = () => {
//     setIsPresent(!isPresent);
//   };
//   const handleDateChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
//     setSelectedDate(e.target.value);
//   };
//   const handleSubmit = (e: { preventDefault: () => void; }) => {
//     e.preventDefault();
//     if (selectedDate) {
//       const today = new Date().toLocaleDateString('en-US');
//       if (selectedDate === today || new Date(selectedDate) > new Date(today)) {
//         // Save attendance data for the selected date
//         setAttendanceData((prevData) => ({
//           ...prevData,
//           [selectedDate]: isPresent,
//         }));
//         alert('Attendance successfully submitted');
//       } else {
//         alert('Cannot mark attendance for past dates');
//       }
//     } else {
//       alert('Please select a date');
//     }
//   };
//   useEffect(() => {
//     // Fetch attendance data for the week (you may replace this with your API call)
//     // For demonstration purposes, using localStorage to simulate data storage
//     const storedAttendanceData = JSON.parse(localStorage.getItem('attendanceData')) || {};
//     setAttendanceData(storedAttendanceData);
//   }, []);
//   useEffect(() => {
//     // Save attendance data to localStorage whenever it changes
//     localStorage.setItem('attendanceData', JSON.stringify(attendanceData));
//   }, [attendanceData]);
//   return (
//     <div className="form-container box">
//       <form onSubmit={handleSubmit}>
//         <label>
//           Select Date:{' '}
//           <input type="date" value={selectedDate} onChange={handleDateChange} />
//         </label>
//         <div style={{ marginTop: '10px' }}>
//           {daysOfWeek.map((day) => (
//             <label key={day} className="circular-checkbox-label">
//               <input
//                 type="checkbox"
//                 checked={attendanceData[selectedDate] || false}
//                 onChange={handleCheckboxChange}
//                 disabled={
//                   day !== new Date().toLocaleDateString('en-US', { weekday: 'short' }) ||
//                   selectedDate < new Date().toLocaleDateString('en-US')
//                 }
//               />
//               <span className="circular-checkbox-text">{day}</span>
//             </label>
//           ))}
//         </div>
//         <button type="submit" className="inline-btn">
//           Mark Attendance
//         </button>
//       </form>
//       <div style={{ marginTop: '20px' }}>
//         <h3>Attendance History for the Week:</h3>
//         <ul>
//           {Object.entries(attendanceData).map(([date, isPresent]) => (
//             <li key={date}>
//               {date}: {isPresent ? 'Present' : 'Absent'}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };
// export default Attendance;
