import { Component } from 'react';

export default class StudentList extends Component {
  handleDelete = (id) => {
    if (window.confirm('Delete this student?')) {
      this.props.deleteStudent(id);
    }
  };

  getInitial(name) {
    return name ? name.trim().charAt(0).toUpperCase() : '?';
  }

  render() {
    const { students, editingId, startEdit } = this.props;

    if (students.length === 0) {
      return (
        <div className="empty-state">
          <p>No students yet.</p>
          <span>Students you add will show up here.</span>
        </div>
      );
    }

    return (
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student</th>
              <th>Course</th>
              <th>Age</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr
                key={student.id}
                className={student.id === editingId ? 'editing-row' : ''}
              >
                <td className="id-cell">#{student.id}</td>
                <td>
                  <div className="student-cell">
                    <span className="avatar">{this.getInitial(student.name)}</span>
                    {student.name}
                  </div>
                </td>
                <td>
                  <span className="course-badge">{student.course}</span>
                </td>
                <td>{student.age}</td>
                <td className="action-cell">
                  <div className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => startEdit(student)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => this.handleDelete(student.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}