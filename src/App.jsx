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
    search: '',
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

  addStudent = async (student) => {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    });

    await this.checkResponse(res, 'Failed to add student');
    await this.loadStudents();
  };

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

  deleteStudent = async (id) => {
    const res = await fetch(`${API}/${id}`, { method: 'DELETE' });

    await this.checkResponse(res, 'Failed to delete student');

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

  handleSearch = (e) => {
    this.setState({ search: e.target.value });
  };

  checkResponse = async (res, fallbackMessage) => {
    if (res.ok) return;

    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || fallbackMessage);
  };

  getVisibleStudents() {
    const { students, search } = this.state;
    const text = search.trim().toLowerCase();

    if (text === '') return students;

    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(text) ||
        student.course.toLowerCase().includes(text) ||
        String(student.id).includes(text)
    );
  }

  getStats() {
    const { students } = this.state;

    const courses = new Set(students.map((s) => s.course.trim().toLowerCase()));
    const totalAge = students.reduce((sum, s) => sum + Number(s.age), 0);
    const average = students.length ? (totalAge / students.length).toFixed(1) : '0';

    return {
      total: students.length,
      courses: courses.size,
      average,
    };
  }

  render() {
    const { editingStudent, loading, error, search } = this.state;
    const stats = this.getStats();

    return (
      <div className="container">
        <header className="page-header">
          <h1>Student Management</h1>
          <p className="subtitle">Add, update, and keep track of your students in one place.</p>
        </header>

        <section className="stats">
          <div className="stat-card">
            <div>
              <strong>{stats.total}</strong>
              <span>Total students</span>
            </div>
          </div>

          <div className="stat-card">
            <div>
              <strong>{stats.courses}</strong>
              <span>Courses</span>
            </div>
          </div>
          
        </section>

        <section className={editingStudent ? 'card editing-card' : 'card'}>
          <h2>{editingStudent ? ' Edit Student' : ' Add a Student'}</h2>

          <StudentForm
            key={editingStudent ? editingStudent.id : 'new'}
            editingStudent={editingStudent}
            addStudent={this.addStudent}
            updateStudent={this.updateStudent}
            cancelEdit={this.cancelEdit}
          />
        </section>

        <section className="card">
          <div className="list-header">

            <input
              className="search-input"
              type="search"
              placeholder=" Search name, course, or ID"
              value={search}
              onChange={this.handleSearch}
            />
          </div>

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
              students={this.getVisibleStudents()}
              searchText={search.trim()}
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