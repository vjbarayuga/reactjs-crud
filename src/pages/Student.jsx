// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Loading from '../components/Loading';

// function Student() {
//   const [loading, setLoading] = useState([true]);
//   const [students, setStudents] = useState([]);

//   useEffect(() => {
//     axios.get(`http://127.0.0.1:8000/api/students`).then((res) => {
//       //console.log(res);
//       setStudents(res.data.students);
//       setLoading(false);
//     });
//   }, []);

//   if (loading) {
//     //return <div>Loading...</div>;
//     return <Loading />;
//   }

//   let studentDetails = '';
//   studentDetails = students.map((item, index) => {
//     return (
//       <tr key={index}>
//         <td>{item.id}</td>
//         <td>{item.name}</td>
//         <td>{item.course}</td>
//         <td>{item.email}</td>
//         <td>{item.phone}</td>
//         <td>
//           <Link to="/" className="btn btn-success custom">
//             Edit
//           </Link>
//         </td>
//         <td>
//           <Link to="/" className="btn btn-danger custom">
//             Delete
//           </Link>
//         </td>
//       </tr>
//     );
//   });

//   return (
//     <div className="container mt-5">
//       <div className="row">
//         <div className="col-md-12">
//           <div className="card">
//             <div className="card-header">
//               <h4>
//                 Student List
//                 <Link
//                   to="/students/create"
//                   className="btn btn-primary float-end"
//                 >
//                   Add Student
//                 </Link>
//               </h4>
//             </div>
//             <div className="card-body">
//               <table className="table table-striped">
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>Name</th>
//                     <th>Course</th>
//                     <th>Email</th>
//                     <th>Phone</th>
//                     <th>Edit</th>
//                     <th>Delete</th>
//                   </tr>
//                 </thead>
//                 <tbody>{studentDetails}</tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Student;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';

function Student() {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/students`).then((res) => {
      setStudents(res.data.students);
      setLoading(false);
    });
  }, []);

  const deleteStudent = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = 'Deleting...';

    axios
      .delete(`http://127.0.0.1:8000/api/students/${id}/delete`)
      .then((res) => {
        alert(res.data.message);
        thisClicked.closest('tr').remove();
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 404) {
            alert(error.response.data.message);
            thisClicked.innerText = 'Deleted...';
          }
          if (error.response.status === 500) {
            alert(error.response.data);
          }
        }
      });
  };

  if (loading) {
    return <Loading />;
  }

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentStudents = students.slice(indexOfFirstRecord, indexOfLastRecord);

  const studentDetails = currentStudents.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.course}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td>
          <Link
            to={`/students/${item.id}/edit`}
            className="btn btn-success custom"
          >
            Edit
          </Link>
        </td>
        <td>
          <button
            type="button"
            onClick={(e) => deleteStudent(e, item.id)}
            className="btn btn-danger custom"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  const totalPages = Math.ceil(students.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>
                Student List
                <Link
                  to="/students/create"
                  className="btn btn-primary float-end"
                >
                  Add Student
                </Link>
              </h4>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Course</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>{studentDetails}</tbody>
              </table>

              <nav>
                <ul className="pagination">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <li
                      key={index}
                      className={`page-item ${
                        currentPage === index + 1 ? 'active' : ''
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student;
