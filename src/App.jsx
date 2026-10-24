import { Component } from 'react';
import StudentForm from './assets/components/StudentForm';
import StudentList from './assets/components/StudentList';
import './App.css';

const API = '/api/student';

export default class App extends Component {
  state = {
    students: [],
    editingStudent: null,
    loading: true,
    error: '',
  };

  componentDidMount() {
    this.loadStudents();
  }

  loadStudents = async () => {
    try {
      this.setState({ error: '' });

      const res = await fetch(API);

      if (!res.ok) {
        throw new Error('Could not load students. Is the server running on port 3004?');
      }

      const students = await res.json();
      this.setState({ students });
    } catch (err) {
      this.setState({ error: err.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  // saves a new student to MySQL, then reloads the list
  addStudent = async (student) => {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    });

    await this.checkResponse(res, 'Failed to add student');
    await this.loadStudents();
  };

  // updates the student in MySQL, then reloads the list
  updateStudent = async (id, student) => {
    const res = await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    });

    await this.checkResponse(res, 'Failed to update student');

    this.setState({ editingStudent: null });
    await this.loadStudents();
  };

  // deletes the student from MySQL, then reloads the list
  deleteStudent = async (id) => {
    const res = await fetch(`${API}/${id}`, { method: 'DELETE' });

    await this.checkResponse(res, 'Failed to delete student');

    // if the student being edited was just deleted, close the edit mode
    if (this.state.editingStudent && this.state.editingStudent.id === id) {
      this.setState({ editingStudent: null });
    }

    await this.loadStudents();
  };

  startEdit = (student) => {
    this.setState({ editingStudent: student });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  cancelEdit = () => {
    this.setState({ editingStudent: null });
  };

  // if the server says no, show its message
  checkResponse = async (res, fallbackMessage) => {
    if (res.ok) return;

    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || fallbackMessage);
  };

  render() {
    const { students, editingStudent, loading, error } = this.state;

    return (
      <div className="container">
        <header className="page-header">
          <h1>Student Management</h1>
        </header>

        <section className="card">
          <h2>{editingStudent ? 'Edit Student' : 'Add a Student'}</h2>

          <StudentForm
            key={editingStudent ? editingStudent.id : 'new'}
            editingStudent={editingStudent}
            addStudent={this.addStudent}
            updateStudent={this.updateStudent}
            cancelEdit={this.cancelEdit}
          />
        </section>

        <section className="card">
          <h2>Student List</h2>

          {error && (
            <div className="error-banner">
              <span>{error}</span>
              <button onClick={this.loadStudents}>Try again</button>
            </div>
          )}

          {loading ? (
            <p className="muted">Loading students...</p>
          ) : (
            <StudentList
              students={students}
              editingId={editingStudent ? editingStudent.id : null}
              startEdit={this.startEdit}
              deleteStudent={this.deleteStudent}
            />
          )}
        </section>
      </div>
    );
  }
}